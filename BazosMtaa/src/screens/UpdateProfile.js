import React from 'react';
import {
  Button,
  Caption,
  Headline,
  List,
  TextInput,
  Title,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import styled from 'styled-components';
import {BottomNavigation, Text, useTheme, Switch} from 'react-native-paper';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import {AuthContext} from '../context/AuthContext';
import {useState} from 'react';
import {useValidation} from 'react-simple-form-validator';
import EncryptedStorage from 'react-native-encrypted-storage';

const UpdateProfile = ({navigation, route}) => {
  const profile = route.params.profile;
  const {colors} = useTheme();
  const [isRequired, setIsRequired] = React.useState(true);
  const handleRequired = () => setIsRequired(!isRequired);
  const [firstname, setFirstName] = useState(profile.first_name);
  const [lastname, setLastName] = useState(profile.last_name);
  const [name, setName] = useState(profile.user_name);
  const [street, setStreet] = useState(profile.street);
  const [zipcode, setZipcode] = useState(profile.zip_code);
  const [city, setCity] = useState(profile.city);
  const [district, setDistrict] = useState(profile.district);
  const [phone, setPhone] = useState(profile.phone);

  const [enable_button_zip, setEnable_Button_Zip] = useState(true);
  const [enable_button_phone, setEnable_Button_Phone] = useState(true);

  const [unique_user, setUnique_User] = useState(true);

  const [all_data, setAll_Data] = useState(true);

  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch('http://192.168.100.14:8000/get_districts/')
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err));
  }, []);

  function validate_numbers_only(par) {
    const regexp = /^\d+$/;
    return regexp.test(par);
  }

  const CheckPhone = val => {
    var isvalid = validate_numbers_only(val);
    var value = val;

    if (value !== '' && (isvalid !== true || value.length !== 10)) {
      setEnable_Button_Phone(false);
    }

    if (isvalid === true && value.length === 10) {
      setEnable_Button_Phone(true);
    }

    if (value === '') {
      setEnable_Button_Phone(true);
      setPhone(null);
    }
  };

  const CheckZip = val => {
    var isvalid = validate_numbers_only(val);
    var value = val;

    if (value !== '' && (isvalid !== true || value.length !== 5)) {
      setEnable_Button_Zip(false);
    }

    if (isvalid === true && value.length === 5) {
      setEnable_Button_Zip(true);
    }

    if (value === '') {
      setEnable_Button_Zip(true);
      setZipcode(null);
    }
  };

  const CheckUsername = async name => {
    return fetch(
      'http://192.168.100.14:8000/check_username/?username=' + name,
      {},
    )
      .then(response => {
        const statusCode = response.status;
        return {statusCode};
      })
      .then(res => {
        if (res.statusCode === 200) {
          setUnique_User(true);
        } else {
          setUnique_User(false);
        }
      })
      .catch(error => {
        console.error(error);
        return {name: 'network error', description: ''};
      });
  };

  const handleUpdate = () => {
    fetch('http://192.168.100.14:8000/update_profile/', {
      method: 'PUT',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstname,
        last_name: lastname,
        username: name,
        street: street,
        zip_code: zipcode,
        city: city,
        district: district,
        phone: phone,
      }),
    })
      .then(value => {
        EncryptedStorage.setItem(
          'username',
          JSON.stringify({
            username: name,
          }),
        );
        navigation.navigate('Domov');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: '20%',
        width: '80%',
        alignSelf: 'center',
        justifySelf: 'center',
      }}>
      <View
        style={{
          alignSelf: 'flex-end',
          flexDirection: 'row',
        }}>
        <Caption>Povinné údaje</Caption>
        <Switch value={isRequired} onValueChange={handleRequired} />
      </View>
      <View style={{alignItems: 'center'}}>
        <Headline>Upraviť profil</Headline>
      </View>
      {isRequired && (
        <View>
          <InputStyled
            label={'Meno'}
            mode="outlined"
            outlineColor={colors.tertiary}
            onChangeText={val => setFirstName(val)}
            value={firstname}
          />
          {firstname ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errormsg}>Meno je povinné</Text>
            </Animatable.View>
          )}

          <InputStyled
            label={'Priezvisko'}
            mode="outlined"
            outlineColor={colors.tertiary}
            onChangeText={val => setLastName(val)}
            value={lastname}
          />
          {lastname ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errormsg}>Priezvisko je povinné</Text>
            </Animatable.View>
          )}

          <InputStyled
            label={'Používateľské meno'}
            mode="outlined"
            outlineColor={colors.tertiary}
            onChangeText={val => setName(val)}
            onEndEditing={e => CheckUsername(e.nativeEvent.text)}
            value={name}
          />
          {name ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errormsg}>Používateľské meno je povinné</Text>
            </Animatable.View>
          )}
          {unique_user ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errormsg}>Toto meno sa už používa</Text>
            </Animatable.View>
          )}
        </View>
      )}
      {!isRequired && (
        <View>
          <InputStyled
            label={'Ulica a číslo domu'}
            mode="outlined"
            outlineColor={colors.tertiary}
            value={street}
            onChangeText={val => setStreet(val)}
          />

          <InputStyled
            label={'PSČ'}
            mode="outlined"
            outlineColor={colors.tertiary}
            keyboardType="numeric"
            value={zipcode}
            onChangeText={val => setZipcode(val)}
            onEndEditing={e => CheckZip(e.nativeEvent.text)}
          />
          {enable_button_zip ? (
            true
          ) : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errormsg}>PSČ musí byť vo formáte 90000</Text>
            </Animatable.View>
          )}
          <InputStyled
            label={'Mesto'}
            mode="outlined"
            outlineColor={colors.tertiary}
            value={city}
            onChangeText={val => setCity(val)}
          />
          <InputStyled
            label={'Telefón'}
            mode="outlined"
            keyboardType="numeric"
            outlineColor={colors.tertiary}
            value={phone}
            onChangeText={val => setPhone(val)}
            onEndEditing={e => CheckPhone(e.nativeEvent.text)}
          />
          {enable_button_phone ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errormsg}>
                Číslo musí byť vo formáte 0900000000
              </Text>
            </Animatable.View>
          )}

          <View style={styles.pickerview}>
            <Picker
              dropdownIconColor="black"
              style={styles.picker}
              selectedValue={district}
              onValueChange={itemValue => setDistrict(itemValue)}>
              {data.map(item => (
                <Picker.Item
                  label={item.name}
                  value={item.name}
                  key={item.id}
                />
              ))}
            </Picker>
          </View>
        </View>
      )}
      <ItemsStyled>
        <Button
          disabled={
            !(
              firstname &&
              lastname &&
              name &&
              unique_user &&
              enable_button_phone &&
              enable_button_zip
            )
          }
          mode="contained"
          onPress={handleUpdate}>
          Upraviť profil
        </Button>
      </ItemsStyled>
    </ScrollView>
  );
};
export default UpdateProfile;

const InputStyled = styled(TextInput)`
  margin-vertical: 2%;
`;
const ItemsStyled = styled(View)`
  margin-vertical: 15%;
`;

const LinkStyled = styled(Link)`
  color: #000;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-color: #000;
`;

const styles = StyleSheet.create({
  picker: {
    color: '#000',
    width: 300,
    height: 50,
  },
  pickerview: {
    borderColor: '#A9A9A9',
    borderWidth: 1,
    marginTop: 15,
  },
  errormsg: {
    color: 'red',
  },
});
