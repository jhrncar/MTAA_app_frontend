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
} from 'react-native-paper';
import AdCard from '../components/AdCard';
import CategoryCard from '../components/CategoryCard';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Image} from 'react-native';
import {AuthContext} from '../context/AuthContext';
const AdScreen = ({route, navigation}) => {
  const ad = route.params.ad;
  const [owner, setOwner] = React.useState();

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
  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;
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
                ? 'http://192.168.1.12:8000/get_image/' + ad.picture
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
              <Title>
                {ad.district}, {ad.city}, {ad.zip_code}
              </Title>
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
        {isLogged && owner === ad.owner && route.name === 'Ad' && (
          <Portal>
            <FAB.Group
              open={open}
              icon={open ? 'check' : 'keyboard-settings'}
              color={open ? 'green' : 'black'}
              fabStyle={{backgroundColor: 'white'}}
              actions={[
                {
                  icon: 'delete',
                  label: 'Vymazať',
                  onPress: () => console.log('Pressed star'),
                  style: {backgroundColor: 'red'},
                  labelTextColor: 'red',
                },
                {
                  icon: 'pencil',
                  label: 'Upraviť',
                  onPress: () => navigation.navigate('UpdateAd', {ad: ad}),
                },
              ]}
              onStateChange={onStateChange}
              onPress={() => {
                if (open) {
                  // do something if the speed dial is open
                }
              }}
            />
          </Portal>
        )}
      </View>
    </>
  );
};
export default AdScreen;
