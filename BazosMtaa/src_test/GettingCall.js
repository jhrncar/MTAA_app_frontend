import React from 'react';
import {View, Text, Image} from 'react-native';
import Button from './Button';
export default function GettingCall({hangup, join}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundColor: 'white',
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          bottom: 30,
        }}>
        <Button iconName="phone" onPress={join} backgroudColor="green" />
        <Button iconName="phone" onPress={hangup} backgroudColor="red" />
      </View>
    </View>
  );
}
