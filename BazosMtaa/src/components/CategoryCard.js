import React from 'react';
import {View, Image} from 'react-native';
import {
  Card,
  IconButton,
  Text,
  Title,
  TouchableRipple,
} from 'react-native-paper';
const CategoryCard = ({navigation, ad}) => {
  return (
    <Card
      mode="elevated"
      elevation={5}
      onPress={() => console.log('card')}
      style={{margin: 10, flex: 1}}>
      <Card.Cover
        resizeMode="stretch"
        source={require('../../pictures/dom.png')}
      />
      <Card.Content>
        <Title style={{alignSelf: 'center'}}>Test</Title>
      </Card.Content>
    </Card>
  );
};
export default CategoryCard;
