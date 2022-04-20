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
} from 'react-native';
import {Appbar, Divider, Title, useTheme} from 'react-native-paper';
import CategoryCard from '../components/CategoryCard';
import NewAdsCarousel from '../components/NewAdsCarousel';

const HomeScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch('http://147.175.160.9:8000/get_categories/')
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err));
  }, []);
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
        <View style={{flex: 4}}>
          <FlatList
            columnWrapperStyle={{justifyContent: 'space-between'}}
            numColumns={2}
            data={data}
            renderItem={({item}) => (
              <View style={{flex: 0.5}}>
                <CategoryCard navigation={navigation} category={item} />
              </View>
            )}
          />
        </View>
        <View
          style={{
            flex: 3,
            borderStyle: 'solid',
            borderColor: colors.tertiary,
            borderTopWidth: 3,
          }}>
          <Title style={{marginLeft: 10}}>Najnovšie inzeráty</Title>
          <NewAdsCarousel navigation={navigation} />
        </View>
      </View>
    </>
  );
};

export default HomeScreen;
