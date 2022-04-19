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

const UserProfile = ({route, navigation}) => {
  const {colors} = useTheme();
  const [data, setData] = React.useState([]);
  const owner = route.params.owner;

  useFocusEffect(
    React.useCallback(() => {
      fetch('http://192.168.1.12:8000/user_profile/' + owner)
        .then(res => res.json())
        .then(res => setData(res.items))
        .catch(err => console.log(err));

      return () => {
        setData([]);
      };
    }, [owner]),
  );
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
          </ScrollView>
        </View>
      </View>
    </>
  );
};
export default UserProfile;

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
