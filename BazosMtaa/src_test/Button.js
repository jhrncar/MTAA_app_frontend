import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Button({onPress, iconName, backgroudColor}) {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: backgroudColor,
          width: 60,
          height: 60,
          padding: 10,
          elevation: 10,
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name={iconName} color="white" size={20} />
      </TouchableOpacity>
    </View>
  );
}
