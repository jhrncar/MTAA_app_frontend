import React from 'react';
import {View, Image, ScrollView} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  Card,
  IconButton,
  Text,
  Title,
  TouchableRipple,
} from 'react-native-paper';
import {AuthContext} from '../context/AuthContext';
const AdCard = ({navigation, ad}) => {
  const {isLogged} = React.useContext(AuthContext);
  const [owner, setOwner] = React.useState();

  React.useEffect(() => {
    EncryptedStorage.getItem('username')
      .then(res => {
        console.log(JSON.parse(res).username);
        setOwner(JSON.parse(res).username);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <Card
      mode="elevated"
      elevation={5}
      onLongPress={() => navigation.navigate('Ad', {ad: ad})}
      style={{flex: 1}}>
      {ad.picture !== null && (
        <Card.Cover
          resizeMode="stretch"
          source={{uri: 'http://192.168.1.12:8000/get_image/' + ad.picture}}
          style={{flex: 1}}
        />
      )}
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
          <Text>{ad.prize} €</Text>
          {isLogged && owner != ad.owner && (
            <IconButton
              icon="star-outline"
              color={'#FF8F00'}
              size={16}
              onPress={() => console.log('Pressed')}
            />
          )}
        </View>
      </Card.Content>
    </Card>
  );
};
export default AdCard;
