import React from 'react';
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
import AdCard from '../components/AdCard';
import CategoryCard from '../components/CategoryCard';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Image} from 'react-native';
import {AuthContext} from '../context/AuthContext';
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
    fetch('http://192.168.100.14:8000/delete_ad/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ad_id: parseInt(ad.id),
      }),
    })
      .then(res => {
        navigation.navigate('Home');
      })
      .catch(err => {
        console.log(err);
      });
  };
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
                ? 'http://192.168.100.14:8000/get_image/' + ad.picture
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
            <Button style={{marginVertical: '3%'}} mode="contained">
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
