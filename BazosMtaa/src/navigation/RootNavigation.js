import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {BottomNavigation, Text, useTheme} from 'react-native-paper';
import HomeScreen from '../screens/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from '../screens/Login';

const Navigation = () => {
  const Tab = createMaterialBottomTabNavigator();
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      activeColor={colors.secondary}
      barStyle={{backgroundColor: colors.primary}}
      shifting={false}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;
          if (route.name === 'Domov') {
            iconName = focused ? 'md-home' : 'md-home-outline';
          } else if (route.name === 'Pridať') {
            iconName = focused ? 'md-add-circle' : 'md-add-circle-outline';
          } else if (route.name === 'Obľúbené') {
            iconName = focused ? 'md-star' : 'md-star-outline';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}>
      <Tab.Screen name="Domov" component={HomeScreen} />
      <Tab.Screen name="Pridať" component={HomeScreen} />
      <Tab.Screen name="Obľúbené" component={HomeScreen} />
      <Tab.Screen name="Profil" component={Login} />
    </Tab.Navigator>
  );
};
export default Navigation;
