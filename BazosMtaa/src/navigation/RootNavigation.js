import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {BottomNavigation, Text, useTheme} from 'react-native-paper';
import HomeScreen from '../screens/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Search from '../screens/Search';
import CreateProduct from '../screens/CreateProduct';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const {colors} = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        title: 'Bazoš',
        headerStyle: {backgroundColor: colors.primary},
      }}>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen
        name="App"
        component={AppNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const AppNavigation = () => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      activeColor={colors.secondary}
      barStyle={{backgroundColor: colors.primary}}
      shifting={true}
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
      <Tab.Screen name="Pridať" component={CreateProduct} />
      <Tab.Screen name="Obľúbené" component={HomeScreen} />
      <Tab.Screen name="Profil" component={Register} />
    </Tab.Navigator>
  );
};

export default MainNavigation;
