import React from 'react';
import {View, Image} from 'react-native';
import {
  Card,
  IconButton,
  Text,
  Title,
  TouchableRipple,
} from 'react-native-paper';
const CategoryCard = ({navigation, category}) => {
  return (
    <Card
      onLongPress={() => navigation.navigate('Search', {category: category})}
      mode="elevated"
      elevation={5}
      onPress={() => console.log('card')}
      style={{margin: 10, flex: 1}}>
      <Card.Cover
        resizeMode="stretch"
        source={{uri: 'http://192.168.100.14:8000/get_image/' + category.picture}}
      />
      <Card.Content>
        <Title style={{alignSelf: 'center'}}>{category.name}</Title>
      </Card.Content>
    </Card>
  );
};
export default CategoryCard;
