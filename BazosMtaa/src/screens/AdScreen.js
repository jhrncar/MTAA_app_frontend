import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  useWindowDimensions,
  FlatList,
  SectionList,
  TouchableRipple,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ActivityIndicator,
  Appbar,
  Caption,
  Colors,
  Divider,
  Headline,
  Title,
  Button,
  useTheme,
  IconButton,
  FAB,
  Portal,
  Modal,
} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {
  MediaStream,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';
import AdCard from '../components/AdCard';
import CategoryCard from '../components/CategoryCard';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Image} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import Utils from '../../src_test/Utils';
import GettingCall from '../../src_test/GettingCall';
import Video from '../../src_test/Video';
const configuration = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]};
const AdScreen = ({route, navigation}) => {
  const ad = route.params.ad;
  const [owner, setOwner] = React.useState();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  React.useEffect(() => {
    EncryptedStorage.getItem('username')
      .then(res => {
        setOwner(JSON.parse(res).username);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const {isLogged} = React.useContext(AuthContext);

  const handleDelete = () => {
    fetch('http://147.175.160.9:8000/delete_ad/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ad_id: parseInt(ad.id),
      }),
    })
      .then(res => {
        navigation.navigate('Domov');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [gettingCall, setGettingCall] = useState(null);
  const pc = useRef(null);
  const connecting = useRef(false);

  React.useEffect(() => {
    const cRef = firestore().collection('meet').doc('chatId');
    const subscribe = cRef.onSnapshot(snapshot => {
      const data = snapshot.data();
      if (pc.current && !pc.current.remoteDescription && data && data.answer) {
        pc.current.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
      if (data && data.offer && !connecting.current) {
        setGettingCall(true);
      }
    });
    const subscribeDelete = cRef.collection('callee').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'removed') {
          hangup();
        }
      });
    });
    return () => {
      subscribe();
      subscribeDelete();
    };
  }, []);

  const setupWebRTC = async () => {
    pc.current = new RTCPeerConnection(configuration);

    const stream = await Utils.getStream();

    if (stream) {
      setLocalStream(stream);
      pc.current.addStream(stream);
    }
    pc.current.onaddstream = event => {
      setRemoteStream(event.stream);
    };
  };
  const create = async () => {
    console.log('Calling...');
    connecting.current = true;
    await setupWebRTC().catch(e => console.log(e));
    const cRef = firestore().collection('meet').doc('chatId');
    await collectIceCandidates(cRef, 'caller', 'callee').catch(e =>
      console.log(e),
    );
    if (pc.current) {
      const offer = await pc.current.createOffer();
      pc.current.setLocalDescription(offer);
      const cWithOffer = {
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
      };
      await cRef.set(cWithOffer).catch(e => console.log(e));
    }
  };
  const join = async () => {
    console.log('Joining...');
    connecting.current = true;
    setGettingCall(false);
    const cRef = firestore().collection('meet').doc('chatId');
    const offer = (await cRef.get().catch(e => console.log(e))).data()?.offer;
    if (offer) {
      await setupWebRTC().catch(e => console.log(e));
      await collectIceCandidates(cRef, 'callee', 'caller').catch(e =>
        console.log(e),
      );
      if (pc.current) {
        pc.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.current.createAnswer();
        pc.current.setLocalDescription(answer);
        const cWithAnswer = {
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        };
        cRef.update(cWithAnswer);
      }
    }
  };
  const hangup = async () => {
    setGettingCall(false);
    console.log('Hanging up...');
    connecting.current = false;
    await streamCleanUp().catch(e => console.log(e));
    await firestoreCleanUp().catch(e => console.log(e));
    if (pc.current) {
      pc.current.close();
    }
  };
  const streamCleanUp = async () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      localStream.release();
    }
    setLocalStream(null);
    setRemoteStream(null);
  };
  const firestoreCleanUp = async () => {
    const cRef = firestore().collection('meet').doc('chatId');
    if (cRef) {
      const caleeCandidate = await cRef
        .collection('callee')
        .get()
        .catch(e => console.log(e));
      caleeCandidate.forEach(async candidate => await candidate.ref.delete());
      const calerCandidate = await cRef
        .collection('caller')
        .get()
        .catch(e => console.log(e));
      calerCandidate.forEach(async candidate => await candidate.ref.delete());
      await cRef.delete().catch(e => console.log(e));
    }
  };
  const collectIceCandidates = async (cRef, localName, remoteName) => {
    const candidateCollection = cRef.collection(localName);
    if (pc.current) {
      pc.current.onicecandidate = event => {
        if (event.candidate) {
          candidateCollection.add(event.candidate);
        }
      };
    }
    cRef.collection(remoteName).onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          if (pc.current) {
            pc.current.addIceCandidate(new RTCIceCandidate(candidate));
            pc.current?.addIceCandidate(candidate);
          }
        }
      });
    });
  };

  if (gettingCall) {
    return <GettingCall hangup={hangup} join={join} />;
  }

  if (localStream) {
    return (
      <Video
        hangup={hangup}
        localStream={localStream}
        remoteStream={remoteStream}
      />
    );
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Bazoš" />
        <Appbar.Action
          icon="magnify"
          onPress={() => navigation.navigate('Search')}
        />
      </Appbar.Header>
      <ScrollView>
        <View
          style={{
            width: '80%',
            marginVertical: '5%',
            alignSelf: 'center',
          }}>
          <Headline>{ad.name}</Headline>
          <Image
            source={{
              uri: ad.picture
                ? 'http://147.175.160.9:8000/get_image/' + ad.picture
                : undefined,
            }}
            style={{
              width: '100%',
              height: 300,
              alignSelf: 'center',
              marginVertical: '5%',
              display: ad.picture ? 'flex' : 'none',
            }}
            resizeMode="contain"
          />
          <View
            style={{
              flexDirection: 'row',

              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Title>{ad.prize} €</Title>
            <View
              style={{
                flexDirection: 'row',

                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Title>{ad.district}</Title>
                <Title>{ad.city}</Title>
                <Title>{ad.zip_code}</Title>
                <Title>{ad.street}</Title>
              </View>
              <Ionicons name="md-location" size={24} color="black" />
            </View>

            {isLogged && owner != ad.owner && (
              <IconButton
                icon="star-outline"
                color={'#FF8F00'}
                size={24}
                onPress={() => console.log('Pressed')}
              />
            )}
          </View>
          <Text style={{color: 'black'}}>{ad.description}</Text>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'column',
          width: '80%',
          alignSelf: 'center',
          marginBottom: '5%',
        }}>
        {isLogged && owner != ad.owner && (
          <>
            <Button
              style={{marginVertical: '3%'}}
              mode="outlined"
              color="black"
              onPress={() =>
                navigation.navigate('UserProfile', {owner: ad.owner})
              }>
              Predajca: {ad.owner}
            </Button>
            <Button
              style={{marginVertical: '3%'}}
              mode="contained"
              onPress={create}>
              Kontaktovať
            </Button>
          </>
        )}
        {isLogged && owner === ad.owner && (
          <>
            <Button
              style={{marginVertical: '3%'}}
              mode="contained"
              onPress={() => navigation.navigate('UpdateAd', {ad: ad})}>
              Upraviť
            </Button>
            <Button
              style={{marginVertical: '3%', backgroundColor: 'red'}}
              mode="contained"
              onPress={showModal}>
              Vymazať
            </Button>
            <Portal>
              <Modal visible={visible} onDismiss={hideModal}>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: '80%',
                    alignSelf: 'center',
                    padding: '5%',
                  }}>
                  <Headline>Naozaj si praješ vymazať inzerát?</Headline>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Button
                      style={{marginVertical: '5%'}}
                      mode="contained"
                      onPress={hideModal}>
                      Vrátiť sa
                    </Button>
                    <Button
                      style={{marginVertical: '5%', backgroundColor: 'red'}}
                      mode="contained"
                      onPress={handleDelete}>
                      Áno, vymazať
                    </Button>
                  </View>
                </View>
              </Modal>
            </Portal>
          </>
        )}
      </View>
    </>
  );
};
export default AdScreen;
