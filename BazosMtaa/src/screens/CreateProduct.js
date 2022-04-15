import React from 'react';
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
import {BottomNavigation, Text, useTheme, Appbar} from 'react-native-paper';
import {View, ScrollView, Image} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';
import ImagePicker, {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

const CreateProduct = ({navigation}) => {
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
        maxHeight: 500,
        maxWidth: 500,
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
        name: 'ja',
        price: 69,
        district: 'Senec',
        description: 'test',
        city: 'nitra',
        category: 'Autá',
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
        alert('Ide');
        console.log(value);
      })
      .catch(error => {
        console.log('error');
        console.log(error);
      });
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
                resizeMode="center"
                style={{
                  marginTop: '5%',
                  width:
                    pickerResponse?.assets[0].width > 200
                      ? 200
                      : pickerResponse?.assets[0].width,
                  height:
                    pickerResponse?.assets[0].height > 200
                      ? 200
                      : pickerResponse?.assets[0].height,
                  alignSelf: 'center',
                }}
              />
            </TouchableRipple>
          )}
          <InputStyled
            label={'Názov inzerátu'}
            mode="outlined"
            outlineColor={colors.tertiary}
          />
          <InputStyled
            multiline
            label={'Popis'}
            mode="outlined"
            outlineColor={colors.tertiary}
          />
          <InputStyled
            label={'Cena'}
            mode="outlined"
            outlineColor={colors.tertiary}
            keyboardType="numeric"
          />
          <InputStyled
            label={'Kategória'} // dat na vyber kategorie
            mode="outlined"
            outlineColor={colors.tertiary}
          />
          <InputStyled
            label={'Ulica a číslo domu'}
            mode="outlined"
            outlineColor={colors.tertiary}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <InputStyled
              style={{width: '45%'}}
              label={'PSČ'}
              mode="outlined"
              outlineColor={colors.tertiary}
              keyboardType="numeric"
            />
            <InputStyled
              style={{width: '45%'}} // dat na vyber okresy
              label={'Okres'}
              mode="outlined"
              outlineColor={colors.tertiary}
            />
          </View>
          <InputStyled
            label={'Mesto'}
            mode="outlined"
            outlineColor={colors.tertiary}
          />
          <Button
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
