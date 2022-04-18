import React from 'react';
import {useState} from 'react';
import {
  Button,
  Headline,
  List,
  Switch,
  TextInput,
  Title,
  TouchableRipple,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import * as Animatable from 'react-native-animatable';
import {BottomNavigation, Text, useTheme, Appbar} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {View, ScrollView, Image, StyleSheet} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';
import ImagePicker, {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

const CreateProduct = ({navigation}) => {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [city, setCity] = useState(null);
  const [price, setPrice] = useState(null);
  const [street, setStreet] = useState(null);
  const [zip_code, setZip_code] = useState(null);
  const [district, setDistrict] = useState(null);
  const [category, setCategory] = useState(null);

  const [enable_button_price, setEnable_Button_Price] = useState(true);
  const [enable_button_zip, setEnable_Button_Zip] = useState(true);

  const {colors} = useTheme();
  const [pickerResponse, setPickerResponse] = React.useState(null);
  const useImageCallback = React.useCallback(response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log(response.errorMessage);
    } else {
      setPickerResponse(response);
    }
  }, []);

  const handleImage = () => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
      },
      useImageCallback,
    );
    console.log(pickerResponse?.assets[0]);
  };

  const handleCreate = () => {
    let formData = new FormData();
    formData.append(
      'json',
      JSON.stringify({
        name: name,
        price: price,
        district: district,
        description: description,
        city: city,
        category: category,
        street: street,
        zip_code: zip_code,
      }),
    );
    if (pickerResponse?.assets[0]) {
      formData.append('file', {
        uri: pickerResponse?.assets[0].uri,
        type: pickerResponse?.assets[0].type,
        name: pickerResponse?.assets[0].fileName,
      });
    }

    fetch('http://192.168.1.12:8000/create_new_ad/', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(value => {
        console.log(value);
        navigation.navigate('Domov');
      })
      .catch(error => {
        console.log('error');
        console.log(error);
      });
  };

  const [categories, setCategories] = useState([]);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch('http://192.168.1.12:8000/get_districts/')
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err));
  }, []);

  React.useEffect(() => {
    fetch('http://192.168.1.12:8000/get_categories/')
      .then(res => res.json())
      .then(res => setCategories(res))
      .catch(err => console.log(err));
  }, []);

  function validate_numbers_only(par) {
    const regexp = /^\d+$/;
    return regexp.test(par);
  }

  const CheckPrice = val => {
    var isvalid = validate_numbers_only(val);
    var value = val;

    if (isvalid !== true || value < 0) {
      setEnable_Button_Price(false);
    }

    if (isvalid === true && value >= 0) {
      setEnable_Button_Price(true);
    }
  };

  const CheckZip = val => {
    var isvalid = validate_numbers_only(val);
    var value = val;

    if (isvalid !== true || value.length !== 5) {
      setEnable_Button_Zip(false);
    }

    if (isvalid === true && value.length === 5) {
      setEnable_Button_Zip(true);
    }

    if (value === '') {
      setEnable_Button_Zip(true);
      setZip_code(null);
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Bazoš" />
        <Appbar.Action
          icon="magnify"
          onPress={() => navigation.navigate('Search')}
        />
      </Appbar.Header>
      <ScrollView>
        <View
          style={{
            width: '80%',
            alignSelf: 'center',
          }}>
          {!pickerResponse?.assets[0] ? (
            <Button
              style={{marginVertical: '10%'}}
              mode="outlined"
              onPress={handleImage}>
              Pridaj obrázok
            </Button>
          ) : (
            <TouchableRipple onPress={handleImage}>
              <Image
                source={{
                  uri: pickerResponse?.assets && pickerResponse?.assets[0].uri,
                }}
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: 300,
                  marginTop: '5%',
                  alignSelf: 'center',
                }}
              />
            </TouchableRipple>
          )}
          <InputStyled
            label={'Názov inzerátu'}
            mode="outlined"
            outlineColor={colors.tertiary}
            onChangeText={val => setName(val)}
            value={name}
          />
          {name ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errormsg}>Nazov inzerátu je povinný</Text>
            </Animatable.View>
          )}
          <InputStyled
            multiline
            label={'Popis'}
            mode="outlined"
            outlineColor={colors.tertiary}
            onChangeText={val => setDescription(val)}
            value={description}
          />
          {description ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errormsg}>Popis inzerátu je povinný</Text>
            </Animatable.View>
          )}
          <InputStyled
            label={'Cena'}
            mode="outlined"
            outlineColor={colors.tertiary}
            keyboardType="numeric"
            onChangeText={val => setPrice(val)}
            onEndEditing={e => CheckPrice(e.nativeEvent.text)}
            value={price}
          />
          {price ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errormsg}>Cena je povinná</Text>
            </Animatable.View>
          )}
          {enable_button_price ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errormsg}>
                Cena musí byť nezáporné celé číslo
              </Text>
            </Animatable.View>
          )}
          <View style={styles.pickerview}>
            <Picker
              dropdownIconColor="black"
              style={styles.picker}
              selectedValue={category}
              onValueChange={(itemValue2, itemIndex2) =>
                setCategory(itemValue2)
              }>
              {categories.map(item2 => (
                <Picker.Item
                  label={item2.name}
                  value={item2.name}
                  key={item2.id}
                />
              ))}
            </Picker>
          </View>
          <InputStyled
            label={'Ulica a číslo domu'}
            mode="outlined"
            outlineColor={colors.tertiary}
            onChangeText={val => setStreet(val)}
            value={street}
          />
          <View>
            <InputStyled
              label={'PSČ'}
              mode="outlined"
              outlineColor={colors.tertiary}
              keyboardType="numeric"
              onChangeText={val => setZip_code(val)}
              value={zip_code}
              onEndEditing={e => CheckZip(e.nativeEvent.text)}
            />
            {enable_button_zip ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errormsg}>
                  PSČ musí byť vo formáte 90000
                </Text>
              </Animatable.View>
            )}
            <View style={styles.pickerview}>
              <Picker
                dropdownIconColor="black"
                style={styles.picker}
                selectedValue={district}
                onValueChange={(itemValue, itemIndex) =>
                  setDistrict(itemValue)
                }>
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
          <InputStyled
            label={'Mesto'}
            mode="outlined"
            outlineColor={colors.tertiary}
            onChangeText={val => setCity(val)}
            value={city}
          />
          {city ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errormsg}>Mesto je povinný údaj</Text>
            </Animatable.View>
          )}
          <Button
            disabled={
              !(
                name &&
                description &&
                enable_button_zip &&
                price &&
                enable_button_price &&
                city &&
                enable_button_zip
              )
            }
            style={{marginVertical: '10%'}}
            mode="contained"
            onPress={handleCreate}>
            Vytvoriť
          </Button>
        </View>
      </ScrollView>
    </>
  );
};
export default CreateProduct;

const InputStyled = styled(TextInput)`
  margin-top: 2%;
`;
const ItemsStyled = styled(View)``;

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
