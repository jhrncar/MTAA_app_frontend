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
} from 'react-native-paper';
import AdCard from '../components/AdCard';
import CategoryCard from '../components/CategoryCard';

import {Image} from 'react-native';
const AdScreen = ({route, navigation}) => {
  const ad = route.params.ad;
  const owner = route.params.owner;
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
              <Title>{ad.district}</Title>
              <Ionicons name="md-location" size={24} color="black" />
            </View>
            <IconButton
              icon="star-outline"
              color={'#FF8F00'}
              size={24}
              onPress={() => console.log('Pressed')}
            />
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
        {!owner && (
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
      </View>
    </>
  );
};
export default AdScreen;
