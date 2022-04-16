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
} from 'react-native';
import {Appbar, Divider, Title, useTheme} from 'react-native-paper';
import CategoryCard from '../components/CategoryCard';
import NewAdsCarousel from '../components/NewAdsCarousel';

const HomeScreen = ({navigation}) => {
  const {colors} = useTheme();
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
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <CategoryCard />
              <CategoryCard />
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <CategoryCard />
              <CategoryCard />
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <CategoryCard />
              <CategoryCard />
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <CategoryCard />
              <CategoryCard />
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            flex: 1.5,
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
