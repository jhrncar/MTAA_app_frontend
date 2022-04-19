import React from 'react';
import {View, Text, Image} from 'react-native';
import Button from './Button';
import {MediaStream, RTCView} from 'react-native-webrtc';

function ButtonContainer({hangup}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        bottom: 30,
      }}>
      <Button iconName="phone" onPress={hangup} backgroudColor="red" />
    </View>
  );
}
export default function Video({hangup, localStream, remoteStream}) {
  if (localStream && !remoteStream) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <RTCView
          streamURL={localStream.toURL()}
          objectFit={'cover'}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
        />
        <ButtonContainer hangup={hangup} />
      </View>
    );
  }
  if (localStream && remoteStream) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <RTCView
          streamURL={remoteStream.toURL()}
          objectFit={'cover'}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
        />
        <RTCView
          streamURL={localStream.toURL()}
          objectFit={'cover'}
          style={{
            width: 100,
            height: 150,
            position: 'absolute',
            top: 0,
            left: 20,
            elevation: 10,
          }}
        />
        <ButtonContainer hangup={hangup} />
      </View>
    );
  }
  return <ButtonContainer hangup={hangup} />;
}
