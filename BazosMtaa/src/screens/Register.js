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
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
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

  const [valid_email, setValid_Email] = useState(true);
  const [equal_pass, setEqual_Pass] = useState(true);
  const [unique_user, setUnique_User] = useState(true);
  const [unique_email, setUnique_Email] = useState(true);

  const [enable_button_email, setEnable_Button_Email] = useState(false);
  const [enable_button_unique_email, setEnable_Button_Unique_Email] = useState(false);
  const [enable_button_pass, setEnable_Button_Pass] = useState(false);
  const [enable_button_user, setEnable_Button_User] = useState(false);
  const [enable_button_phone, setEnable_Button_Phone] = useState(true);
  const [enable_button_zip, setEnable_Button_Zip] = useState(true);

  const [passwordVisible, setPasswordVisible] = useState(true);

  
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch('http://192.168.100.14:8000/get_districts/')
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err));
  }, []);

  function validateEmail (email) {
    const regexp =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regexp.test(email);
  }

  function validate_numbers_only (par) {
    const regexp = /^\d+$/;
    return regexp.test(par);
  }

  const CheckPhone = val => {
    var isvalid = validate_numbers_only(val);
    var value = val;

    if(isvalid !== true || value.length !== 10){
      setEnable_Button_Phone(false);
    }
    
    if(isvalid === true && value.length === 10){
      setEnable_Button_Phone(true);
    }
  };

  const CheckZip = val => {
    var isvalid = validate_numbers_only(val);
    var value = val;

    if(isvalid !== true || value.length !== 5){
      setEnable_Button_Zip(false);
    }
    
    if(isvalid === true && value.length === 5){
      setEnable_Button_Zip(true);
    }
  };



  const CheckEmail = val => {
    var isvalid = validateEmail(val);
    
    if(isvalid !== true){
      setValid_Email(false);
      setEnable_Button_Email(false);
    }
    
    if(isvalid === true){
      setValid_Email(true);
      setEnable_Button_Email(true);
    }
  };

  const CheckPasswords = (pass,conf) => {

    if(pass == conf){
      setEqual_Pass(true);
      setEnable_Button_Pass(true);
    }
    
    if(pass !== conf){
      setEqual_Pass(false);
      setEnable_Button_Pass(false);
    }
    
  };

  const CheckUsername = (name) => {
    
    return fetch('http://192.168.100.14:8000/check_username/?username=' + name, {
    })
    .then(response => {
      const statusCode = response.status;
      return { statusCode,};
    })
    .then(res => {
      if (res.statusCode === 200){
        setUnique_User(true);
        setEnable_Button_User(true);
      }
      else{
        setUnique_User(false);
        setEnable_Button_User(false);
      }
    
    }).catch(error => {
      console.error(error);
      return { name: "network error", description: "" };
    });

  };

  const CheckUniqueEmail = (email) => {
    
    CheckEmail(email)

    return fetch('http://192.168.100.14:8000/check_email/?email=' + email, {
    })
    .then(response => {
      const statusCode = response.status;
      return { statusCode,};
    })
    .then(res => {
      if (res.statusCode === 200){
        setUnique_Email(true);
        setEnable_Button_Unique_Email(true);
      }
      else{
        setUnique_Email(false)
        setEnable_Button_Unique_Email(true);
      }

    }).catch(error => {
      console.error(error);
      return { name: "network error", description: "" };
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
          {firstname ? null :
            <Animatable.View animation="fadeInLeft" duration ={500} >
            <Text style={styles.errormsg}>Meno je povinné</Text>
            </Animatable.View>
          }
          
          <InputStyled
            label={'Priezvisko'}
            mode="outlined"
            outlineColor={colors.tertiary}
            onChangeText={val => setLastName(val)}
            value={lastname}
          />
          {lastname ? null :
            <Animatable.View animation="fadeInLeft" duration ={500} >
            <Text style={styles.errormsg}>Priezvisko je povinné</Text>
            </Animatable.View>
          }

          <InputStyled
            label={'Používateľské meno'}
            mode="outlined"
            outlineColor={colors.tertiary}
            onChangeText={(val) => setName(val)}
            onEndEditing={(e) => CheckUsername(e.nativeEvent.text)}
            value={name}
          />
          {unique_user ? null :
            <Animatable.View animation="fadeInLeft" duration ={500} >
            <Text style={styles.errormsg}>Toto meno sa už používa</Text>
            </Animatable.View>
          }

          <InputStyled
            label={'E-mail'}
            mode="outlined"
            outlineColor={colors.tertiary}
            keyboardType="email-address"
            onChangeText={(val) => setEmail(val)}
            onEndEditing={(e) => CheckUniqueEmail(e.nativeEvent.text)}
            value={email}
          />
          {valid_email ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errormsg}>
                Nesprávny formát emailu (správny formát: example@example.sk)
              </Text>
            </Animatable.View>
          }

          {unique_email ? null :
            <Animatable.View animation="fadeInLeft" duration ={500} >
            <Text style={styles.errormsg}>Tento email sa už používa</Text>
            </Animatable.View>
          }

          <InputStyled
            secureTextEntry={passwordVisible}
            label={'Heslo'}
            right={<TextInput.Icon name={passwordVisible ? "eye" : "eye-off"}onPress={() => setPasswordVisible(!passwordVisible)} />}
            mode="outlined"
            outlineColor={colors.tertiary}
            onChangeText={(val) => setPassword(val)}
            onEndEditing={e => CheckPasswords(e.nativeEvent.text, confirmpassword)}
            value={password}
          />
          <InputStyled
            secureTextEntry={passwordVisible}
            label={'Zopakuj heslo'}
            right={<TextInput.Icon name={passwordVisible ? "eye" : "eye-off"}onPress={() => setPasswordVisible(!passwordVisible)} />}
            mode="outlined"
            outlineColor={colors.tertiary}
            onChangeText={val => setConfirmPassword(val)}
            onEndEditing={e => CheckPasswords(e.nativeEvent.text, password)}
            value={confirmpassword}
          />

          {equal_pass ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errormsg}>Heslá nie sú rovnaké</Text>
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
          {enable_button_zip ? null :
            <Animatable.View animation="fadeInLeft" duration ={500} >
            <Text style={styles.errormsg}>PSČ musí byť vo formáte 90000</Text>
            </Animatable.View>
          }

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

          {enable_button_phone ? null :
            <Animatable.View animation="fadeInLeft" duration ={500} >
            <Text style={styles.errormsg}>Číslo musí byť vo formáte 0900000000</Text>
            </Animatable.View>
          }

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
        <Button disabled={!(enable_button_email &&firstname && lastname && 
        enable_button_pass && enable_button_unique_email && enable_button_user && enable_button_phone && enable_button_zip)}
        mode="contained"  onPress={()=>register(firstname, lastname,name, email, password,city,street,zipcode,phone,district)}>
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
  pass_hyde:{
    color: 'black',
  },
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
