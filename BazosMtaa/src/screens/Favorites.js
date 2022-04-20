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
} from 'react-native';
import {
  Appbar,
  Caption,
  Colors,
  Divider,
  Headline,
  Title,
  useTheme,
} from 'react-native-paper';
import AdCard from '../components/AdCard';
import CategoryCard from '../components/CategoryCard';

import {Image} from 'react-native';

const FavoriteScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Bazoš" />
        <Appbar.Action
          icon="magnify"
          onPress={() => navigation.navigate('Search')}
        />
      </Appbar.Header>
      <SafeAreaView style={{flex: 1}}>
        <SectionList
          contentContainerStyle={{paddingHorizontal: 10}}
          stickySectionHeadersEnabled={false}
          sections={SECTIONS}
          renderSectionHeader={({section}) => (
            <View style={{flex: 1}}>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              {true ? (
                <FlatList
                  horizontal
                  data={section.data}
                  renderItem={({item}) => <AdCard ad={item} />}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => (
                    <Divider style={{width: 40, opacity: 0}} />
                  )}
                />
              ) : null}
            </View>
          )}
          renderItem={() => {
            return null;
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const SECTIONS = [
  {
    title: 'Kategória: Auto',
    data: [
      {
        id: '1',
        prize: '100000',
        name: 'Item text 1',
        picture: 'fiit.png',
        district: 'Nitra',
        city: 'Nitra',
        zip_code: '94501',
        street: 'Krstná cesta',
      },
      {
        id: '2',
        prize: '100000',
        name: 'Item text 1',
        picture: 'fiit.png',
        district: 'Nitra',
        city: 'Nitra',
        zip_code: '94501',
        street: 'Krstná cesta',
      },

      {
        id: '3',
        prize: '100000',
        name: 'Item text 1',
        picture: 'fiit.png',
        district: 'Nitra',
        city: 'Nitra',
        zip_code: '94501',
        street: 'Krstná cesta',
      },
      {
        id: '4',
        prize: '100000',
        name: 'Item text 1',
        picture: 'fiit.png',
        district: 'Nitra',
        city: 'Nitra',
        zip_code: '94501',
        street: 'Krstná cesta',
      },
      {
        id: '5',
        prize: '100000',
        name: 'Item text 1',
        picture: 'fiit.png',
        district: 'Nitra',
        city: 'Nitra',
        zip_code: '94501',
        street: 'Krstná cesta',
      },
    ],
  },
  {
    title: 'Kategória: PC',
    data: [
      {
        id: '1',
        prize: '100000',
        name: 'Item text 1',
        picture: 'fiit.png',
        district: 'Nitra',
        city: 'Nitra',
        zip_code: '94501',
        street: 'Krstná cesta',
      },
      {
        id: '2',
        prize: '100000',
        name: 'Item text 1',
        picture: 'fiit.png',
        district: 'Nitra',
        city: 'Nitra',
        zip_code: '94501',
        street: 'Krstná cesta',
      },

      {
        id: '3',
        prize: '100000',
        name: 'Item text 1',
        picture: 'fiit.png',
        district: 'Nitra',
        city: 'Nitra',
        zip_code: '94501',
        street: 'Krstná cesta',
      },
      {
        id: '4',
        prize: '100000',
        name: 'Item text 1',
        picture: 'fiit.png',
        district: 'Nitra',
        city: 'Nitra',
        zip_code: '94501',
        street: 'Krstná cesta',
      },
      {
        id: '5',
        prize: '100000',
        name: 'Item text 1',
        picture: 'fiit.png',
        district: 'Nitra',
        city: 'Nitra',
        zip_code: '94501',
        street: 'Krstná cesta',
      },
    ],
  },
  {
    title: 'Kategória: Iné',
    data: [
      {
        id: '1',
        prize: '100000',
        name: 'Item text 1',
        picture: 'fiit.png',
        district: 'Nitra',
        city: 'Nitra',
        zip_code: '94501',
        street: 'Krstná cesta',
      },
      {
        id: '2',
        prize: '100000',
        name: 'Item text 1',
        picture: 'fiit.png',
        district: 'Nitra',
        city: 'Nitra',
        zip_code: '94501',
        street: 'Krstná cesta',
      },

      {
        id: '3',
        prize: '100000',
        name: 'Item text 1',
        picture: 'fiit.png',
        district: 'Nitra',
        city: 'Nitra',
        zip_code: '94501',
        street: 'Krstná cesta',
      },
      {
        id: '4',
        prize: '100000',
        name: 'Item text 1',
        picture: 'fiit.png',
        district: 'Nitra',
        city: 'Nitra',
        zip_code: '94501',
        street: 'Krstná cesta',
      },
      {
        id: '5',
        prize: '100000',
        name: 'Item text 1',
        picture: 'fiit.png',
        district: 'Nitra',
        city: 'Nitra',
        zip_code: '94501',
        street: 'Krstná cesta',
      },
    ],
  },
];

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: '#000000',
    marginTop: 20,
    marginBottom: 5,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
  },
});
