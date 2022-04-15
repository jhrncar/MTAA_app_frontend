import React from 'react';
import {View, Image} from 'react-native';
import {
  Card,
  IconButton,
  Text,
  Title,
  TouchableRipple,
} from 'react-native-paper';
const AdCard = ({navigation, ad}) => {
  return (
    <Card
      mode="elevated"
      elevation={5}
      onPress={() => console.log('card')}
      style={{flex: 1}}>
      {false && (
        <Card.Cover
          resizeMode="contain"
          style={{flex: 1}}
          source={require('../../pictures/dom.png')}
        />
      )}
      <Card.Content
        style={{
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}>
        <Title>{ad.name}</Title>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text>700 €</Text>
          <IconButton
            icon="star-outline"
            color={'#FF8F00'}
            size={16}
            onPress={() => console.log('Pressed')}
          />
        </View>
      </Card.Content>
    </Card>
  );
};
export default AdCard;
