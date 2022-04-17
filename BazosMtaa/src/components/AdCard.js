import React from 'react';
import {View, Image, ScrollView} from 'react-native';
import {
  Card,
  IconButton,
  Text,
  Title,
  TouchableRipple,
} from 'react-native-paper';
const AdCard = ({navigation, ad, owner}) => {
  return (
    <Card
      mode="elevated"
      elevation={5}
      onLongPress={() => navigation.navigate('Ad', {ad: ad, owner: owner})}
      style={{flex: 1}}>
      <Card.Cover
        resizeMode="stretch"
        source={{uri: 'http://192.168.1.12:8000/get_image/' + ad.picture}}
        style={{flex: 1}}
      />
      <Card.Content
        style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <View style={{flex: 4, marginTop: '5%', maxHeight: 100}}>
          <ScrollView>
            <Text>{ad.name}</Text>
          </ScrollView>
        </View>
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
