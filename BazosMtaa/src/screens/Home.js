import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Appbar} from 'react-native-paper';
const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.Content title="Bazoš" />
        <Appbar.Action
          icon="magnify"
          onPress={() => navigation.navigate('Search')}
        />
      </Appbar.Header>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
