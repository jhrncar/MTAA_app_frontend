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
import styled from 'styled-components';
import {BottomNavigation, Text, useTheme, Switch} from 'react-native-paper';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import {AuthContext} from '../context/AuthContext';
import {useState} from 'react';
import {useValidation} from 'react-simple-form-validator';

const Register = ({navigation}) => {
  const {colors} = useTheme(); //Bud nebude nepovinne pole a bude to vyzerat pekne, alebo tam bude, ale bude to vyzerat zle
  const [isRequired, setIsRequired] = React.useState(true);
  const handleRequired = () => setIsRequired(!isRequired);
  const {register} = React.useContext(AuthContext);

  const [email, setEmail] = useState(null);
  const [firstname, setFirstName] = useState(null);
  const [lastname, setLastName] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setConfirmPassword] = useState(null);
  const [street, setStreet] = useState(null);
  const [zipcode, setZipcode] = useState(null);
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [phone, setPhone] = useState(null);

  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch('http://192.168.1.12:8000/get_districts/')
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err));
  }, []);
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
        <Headline>Registrácia</Headline>
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
          <InputStyled
            label={'Priezvisko'}
            mode="outlined"
            outlineColor={colors.tertiary}
            onChangeText={val => setLastName(val)}
            value={lastname}
          />
          <InputStyled
            label={'Používateľské meno'}
            mode="outlined"
            outlineColor={colors.tertiary}
            onChangeText={val => setName(val)}
            value={name}
          />
          <InputStyled
            label={'E-mail'}
            mode="outlined"
            outlineColor={colors.tertiary}
            keyboardType="email-address"
            onChangeText={val => setEmail(val)}
            value={email}
          />
          <InputStyled
            secureTextEntry={true}
            label={'Heslo'}
            mode="outlined"
            outlineColor={colors.tertiary}
            onChangeText={val => setPassword(val)}
            value={password}
          />
          <InputStyled
            secureTextEntry={true}
            label={'Zopakuj heslo'}
            mode="outlined"
            outlineColor={colors.tertiary}
            onChangeText={val => setConfirmPassword(val)}
            value={confirmpassword}
          />

          <Text>
            {name} {email} {password} {confirmpassword}
          </Text>
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
          />
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
          />
          <View style={styles.pickerview}>
            <Picker
              dropdownIconColor="black"
              style={styles.picker}
              selectedValue={district}
              onValueChange={(itemValue, itemIndex) => setDistrict(itemValue)}>
              {data.map(item => (
                <Picker.Item label={item.name} value={item.id} key={item.id} />
              ))}
            </Picker>
          </View>
        </View>
      )}
      <ItemsStyled>
        <LinkStyled to="/Login">Chceš sa prihlásiť? Klikni sem</LinkStyled>
        <Button
          mode="contained"
          onPress={() =>
            register(
              firstname,
              lastname,
              name,
              email,
              password,
              city,
              street,
              zipcode,
              phone,
              district,
            )
          }>
          Registrovať sa
        </Button>
        <LinkStyled to="/NotLoggedApp/Domov">
          Pokračovať bez registrácie
        </LinkStyled>
      </ItemsStyled>
    </ScrollView>
  );
};
export default Register;

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
});
