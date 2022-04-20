import React from 'react';
import {Button, Headline, TextInput, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import {BottomNavigation, Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Navigate} from '../navigation/RootNavigation';
import {AuthContext} from '../context/AuthContext';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import {Appbar, Divider} from 'react-native-paper';
import CategoryCard from '../components/CategoryCard';
import NewAdsCarousel from '../components/NewAdsCarousel';
import MyAdsCarousel from '../components/MyAdsCarousel';
import {useFocusEffect} from '@react-navigation/native';

const Profile = ({navigation}) => {
  const {colors} = useTheme();
  const {logout} = React.useContext(AuthContext);
  const [data, setData] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetch('http://147.175.160.9:8000/my_profile/')
        .then(res => res.json())
        .then(res => setData(res.items))
        .catch(err => console.log(err));

      return () => {
        setData([]);
      };
    }, []),
  );
  console.log(data);
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Bazoš" />
        <Appbar.Action
          icon="magnify"
          onPress={() => navigation.navigate('Search')}
        />
      </Appbar.Header>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <View
          style={{
            flex: 4,
            width: '80%',
            alignSelf: 'center',
            flexDirection: 'column',
          }}>
          <ScrollView>
            <View style={{flex: 1, marginTop: '5%'}}>
              <ItemStyled>
                <Title style={{color: 'black'}}>Používateľské meno:</Title>
                <Title style={{color: 'black'}}>{data.user_name}</Title>
              </ItemStyled>
              <ItemStyled>
                <Title style={{color: 'black'}}>Meno:</Title>
                <Title style={{color: 'black'}}>{data.first_name}</Title>
              </ItemStyled>
              <ItemStyled>
                <Title style={{color: 'black'}}>Priezvisko:</Title>
                <Title style={{color: 'black'}}>{data.last_name}</Title>
              </ItemStyled>
              <ItemStyled>
                <Title style={{color: 'black'}}>E-mail:</Title>
                <Title style={{color: 'black'}}>{data.email}</Title>
              </ItemStyled>
              {data.district !== undefined && (
                <ItemStyled>
                  <Title style={{color: 'black'}}>Okres:</Title>
                  <Title style={{color: 'black'}}>{data.district}</Title>
                </ItemStyled>
              )}
              {data.city !== undefined && (
                <ItemStyled>
                  <Title style={{color: 'black'}}>Mesto:</Title>
                  <Title style={{color: 'black'}}>{data.city}</Title>
                </ItemStyled>
              )}
              {data.zip_code !== undefined && (
                <ItemStyled>
                  <Title style={{color: 'black'}}>PSČ:</Title>
                  <Title style={{color: 'black'}}>{data.zip_code}</Title>
                </ItemStyled>
              )}
              {data.street !== undefined && (
                <ItemStyled>
                  <Title style={{color: 'black'}}>Ulica a číslo domu:</Title>
                  <Title style={{color: 'black'}}>{data.street}</Title>
                </ItemStyled>
              )}
              {data.phone !== undefined && (
                <ItemStyled>
                  <Title style={{color: 'black'}}>Tel. číslo:</Title>
                  <Title style={{color: 'black'}}>{data.phone}</Title>
                </ItemStyled>
              )}
            </View>
            <ItemStyled>
              <Button
                mode="contained"
                onPress={() =>
                  navigation.navigate('UpdateProfile', {profile: data})
                }>
                Upraviť profil
              </Button>
              <Button mode="contained" onPress={logout}>
                Odhlásiť sa
              </Button>
            </ItemStyled>
          </ScrollView>
        </View>
        <View
          style={{
            flex: 3,
            borderStyle: 'solid',
            borderColor: colors.tertiary,
            borderTopWidth: 3,
          }}>
          <Title style={{marginLeft: 10}}>Moje inzeráty</Title>
          <MyAdsCarousel navigation={navigation} />
        </View>
      </View>
    </>
  );
};
export default Profile;

const InputStyled = styled(TextInput)`
  margin-vertical: 10px;
`;
const ItemStyled = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const LinkStyled = styled(Link)`
  color: #000;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-color: #000;
`;
