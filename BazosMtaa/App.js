/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  MediaStream,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';
import {Provider, DefaultTheme} from 'react-native-paper';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {AuthProvider} from './src/context/AuthContext';
import MainNavigation from './src/navigation/RootNavigation';
import Button from './src_test/Button';
import Video from './src_test/Video';
import GettingCall from './src_test/GettingCall';
import Utils from './src_test/Utils';
import firestore from '@react-native-firebase/firestore';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF8F00',
    secondary: '#ffffff',
    tertiary: '#aaaaaa',
  },
};

const App = () => {
  return (
    <AuthProvider>
      <Provider theme={theme}>
        <MainNavigation />
      </Provider>
    </AuthProvider>
  );
};

export default App;
