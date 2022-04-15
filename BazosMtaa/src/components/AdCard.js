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
    <Card mode="elevated" elevation={5} onPress={() => console.log('card')}>
      <Image
        resizeMode="contain"
        source={require('../../pictures/dom.png')}
        style={{}}
      />
      <Card.Content>
        <Title style={{alignSelf: 'center'}}>Test</Title>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{alignSelf: 'center'}}>700 €</Text>
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
