import React from 'react';
import {
  Button,
  Headline,
  List,
  Switch,
  TextInput,
  Title,
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

  const a = () => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
      },
      setPickerResponse,
    );
    console.log(pickerResponse?.assets[0]);
  };

  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.Content title="Bazoš" />
        <Appbar.Action
          icon="magnify"
          onPress={() => navigation.navigate('Search')}
        />
      </Appbar.Header>

      <View
        style={{
          width: '80%',
          alignSelf: 'center',
        }}>
        <Button style={{marginVertical: '10%'}} mode="contained" onPress={a}>
          Image
        </Button>
        <Image
          source={{
            uri: pickerResponse?.assets && pickerResponse?.assets[0].uri,
          }}
          resizeMode="center"
          style={{
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
          onPress={() => navigation.navigate('App', {screen: 'Domov'})}>
          Vytvoriť
        </Button>
      </View>
    </ScrollView>
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
