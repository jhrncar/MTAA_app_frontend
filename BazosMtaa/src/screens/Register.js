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
import {useState} from "react";
import { useValidation } from 'react-simple-form-validator';

const Register = ({navigation}) => {
  const {colors} = useTheme(); //Bud nebude nepovinne pole a bude to vyzerat pekne, alebo tam bude, ale bude to vyzerat zle
  const [isRequired, setIsRequired] = React.useState(true);
  const handleRequired = () => setIsRequired(!isRequired);
  const {register} = React.useContext(AuthContext);
  
  
  
  const [email, setEmail] = useState(null);
  const [valid_email, setValid_Email] = useState(true);
  const [firstname, setFirstName] = useState(null);
  const [lastname, setLastName] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setConfirmPassword] = useState(null);
  const [equal_pass, setEqual_Pass] = useState(true);
  const [street, setStreet] = useState(null);
  const [zipcode, setZipcode] = useState(null);
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [phone, setPhone] = useState(null);

  function validateEmail (email) {
    const regexp =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regexp.test(email);
  };

  const CheckEmail = (val) => {

    var isvalid = validateEmail(val)
    
    if(isvalid !== true)
      setValid_Email(false)
      if(isvalid === true)
      setValid_Email(true)
  };

  const CheckPasswords = (pass,conf) => {

    if(pass === conf)
      setEqual_Pass(true)
    if(pass !== conf)
      setEqual_Pass(false)
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
            onChangeText={(val) => setFirstName(val)}
            value={firstname}
          />
          <InputStyled
            label={'Priezvisko'}
            mode="outlined"
            outlineColor={colors.tertiary}
            onChangeText={(val) => setLastName(val)}
            value={lastname}
          />
          <InputStyled
            label={'Používateľské meno'}
            mode="outlined"
            outlineColor={colors.tertiary}
            onChangeText={(val) => setName(val)}
            value={name}
          />

          <InputStyled
            label={'E-mail'}
            mode="outlined"
            outlineColor={colors.tertiary}
            keyboardType="email-address"
            onChangeText={(val) => setEmail(val)}
            onEndEditing={(e) => CheckEmail(e.nativeEvent.text)}
            value={email}
          />
          {valid_email ? null :
            <Animatable.View animation="fadeInLeft" duration ={500} >
            <Text style={styles.errormsg}>Nesprávny formát emailu (správny formát: example@example.sk)</Text>
            </Animatable.View>
          }

          <InputStyled
            secureTextEntry={true}
            label={'Heslo'}
            mode="outlined"
            outlineColor={colors.tertiary}
            onChangeText={(val) => setPassword(val)}
            onEndEditing={(e) => CheckPasswords(e.nativeEvent.text, confirmpassword)}
            value={password}
          />
          <InputStyled
            secureTextEntry={true}
            label={'Zopakuj heslo'}
            mode="outlined"
            outlineColor={colors.tertiary}
            onChangeText={(val) => setConfirmPassword(val)}
            onEndEditing={(e) => CheckPasswords(e.nativeEvent.text, password)}
            value={confirmpassword}
          />

          {equal_pass ? null :
            <Animatable.View animation="fadeInLeft" duration ={500} >
            <Text style={styles.errormsg}>Heslá nie sú rovnaké</Text>
            </Animatable.View>
          }
          
        </View>
      )}
      {!isRequired && (
        <View>
          <InputStyled
            label={'Ulica a číslo domu'}
            mode="outlined"
            outlineColor={colors.tertiary}
            value={street}
            onChangeText={(val) => setStreet(val)}
          />

          <InputStyled
            label={'PSČ'}
            mode="outlined"
            outlineColor={colors.tertiary}
            keyboardType="numeric"
            value={zipcode}
            onChangeText={(val) => setZipcode(val)}
          />
          <InputStyled
            label={'Mesto'}
            mode="outlined"
            outlineColor={colors.tertiary}
            value={city}
            onChangeText={(val) => setCity(val)}
          />
          <InputStyled
            label={'Telefón'}
            mode="outlined"
            keyboardType="numeric"
            outlineColor={colors.tertiary}
            value={phone}
            onChangeText={(val) => setPhone(val)}
          />
          <View style={styles.pickerview}>
            <Picker
              dropdownIconColor= 'black'
              style={styles.picker}
              selectedValue={district}
              onValueChange={(itemValue, itemIndex) => setDistrict(itemValue)}
            >
              <Picker.Item label="Bánovce nad Bebravou" value="Bánovce nad Bebravou " />
              <Picker.Item label="Banská Bystrica" value="Banská Bystrica" />
              <Picker.Item label="Banská Štiavnica" value="Banská Štiavnica" />
              <Picker.Item label="Bardejov" value="Bardejov" />
              <Picker.Item label="Bratislava I" value="Bratislava I" />
              <Picker.Item label="Bratislava II" value="Bratislava II" />
              <Picker.Item label="Bratislava III" value="Bratislava III" />
              <Picker.Item label="Bratislava IV" value="Bratislava IV" />
              <Picker.Item label="Bratislava V" value="Bratislava V" />
              <Picker.Item label="Brezno" value="Brezno" />
              <Picker.Item label="Bytča" value="Bytča" />
              <Picker.Item label="Čadca" value="Čadca" />
              <Picker.Item label="Detva" value="Detva" />
              <Picker.Item label="Dolný Kubín" value="Dolný Kubín" />
              <Picker.Item label="Dunajská Streda" value="Dunajská Streda" />
              <Picker.Item label="Galanta" value="Galanta" />
              <Picker.Item label="Gelnica" value="Gelnica" />
              <Picker.Item label="Hlohovec" value="Hlohovec" />
              <Picker.Item label="Humenné" value="Humenné" />
              <Picker.Item label="Ilava" value="Ilava" />
              <Picker.Item label="Kežmarok" value="Kežmarok" />
              <Picker.Item label="Komárno" value="Komárno" />
              <Picker.Item label="Košice I" value="Košice I" />
              <Picker.Item label="Košice II" value="Košice II" />
              <Picker.Item label="Košice III" value="Košice III" />
              <Picker.Item label="Košice IV" value="Košice IV" />
              <Picker.Item label="Košice-okolie" value="Košice-okolie" />
              <Picker.Item label="Krupina" value="Krupina" />
              <Picker.Item label="Kysucké Nové Mesto" value="Kysucké Nové Mesto" />
              <Picker.Item label="Levice" value="Levice" />
              <Picker.Item label="Levoča" value="Levoča" />
              <Picker.Item label="Liptovský Mikuláš" value="Liptovský Mikuláš" />
              <Picker.Item label="Lučenec" value="Lučenec" />
              <Picker.Item label="Malacky" value="Malacky" />
              <Picker.Item label="Martin" value="Martin" />
              <Picker.Item label="Medzilaborce" value="jMedzilaborce" />
              <Picker.Item label="Michalovce" value="Michalovce" />
              <Picker.Item label="Myjava" value="Myjava" />
              <Picker.Item label="Námestovo" value="Námestovo" />
              <Picker.Item label="Nitra" value="Nitra" />
              <Picker.Item label="Nové Mesto nad Váhom" value="Nové Mesto nad Váhom" />
              <Picker.Item label="Nové Zámky" value="Nové Zámky" />
              <Picker.Item label="Partizánske" value="Partizánske" />
              <Picker.Item label="Pezinok" value="Pezinok" />
              <Picker.Item label="Piešťany" value="Piešťany" />
              <Picker.Item label="Poltár" value="Poltár" />
              <Picker.Item label="Poprad" value="Poprad" />
              <Picker.Item label="Považská Bystrica" value="Považská Bystrica" />
              <Picker.Item label="Prešov" value="Prešov" />
              <Picker.Item label="Prievidza" value="Prievidza" />
              <Picker.Item label="Púchov" value="Púchov" />
              <Picker.Item label="Revúca" value="Revúca" />
              <Picker.Item label="Rimavská Sobota" value="Rimavská Sobota" />
              <Picker.Item label="Rožňava" value="Rožňava" />
              <Picker.Item label="Ružomberok" value="Ružomberok" />
              <Picker.Item label="Sabinov" value="Sabinov" />
              <Picker.Item label="Senec" value="Senec" />
              <Picker.Item label="Senica" value="Senica" />
              <Picker.Item label="Skalica" value="Skalica" />
              <Picker.Item label="Snina" value="Snina" />
              <Picker.Item label="Sobrance" value="Sobrance" />
              <Picker.Item label="Spišská Nová Ves" value="Spišská Nová Ves" />
              <Picker.Item label="Stará Ľubovňa" value="Stará Ľubovňa" />
              <Picker.Item label="Stropkov" value="Stropkov" />
              <Picker.Item label="Svidník" value="Svidník" />
              <Picker.Item label="Šaľa" value="Šaľa" />
              <Picker.Item label="Topoľčany" value="Topoľčany" />
              <Picker.Item label="Trebišov" value="Trebišov" />
              <Picker.Item label="Trenčín" value="Trenčín" />
              <Picker.Item label="Trnava" value="Trnava" />
              <Picker.Item label="Turčianske Teplice" value="Turčianske Teplice" />
              <Picker.Item label="Tvrdošín" value="Tvrdošín" />
              <Picker.Item label="Veľký Krtíš" value="Veľký Krtíš" />
              <Picker.Item label="Vranov nad Topľou" value="Vranov nad Topľou" />
              <Picker.Item label="Zlaté Moravce" value="Zlaté Moravce" />
              <Picker.Item label="Zvolen" value="Zvolen" />
              <Picker.Item label="Žarnovica" value="Žarnovica" />
              <Picker.Item label="Žiar nad Hronom" value="Žiar nad Hronom" />
              <Picker.Item label="Žilina" value="Žilina" />
            </Picker>
          </View>
        </View>
      )}
      <ItemsStyled>
        <LinkStyled to="/Login">Chceš sa prihlásiť? Klikni sem</LinkStyled>
        <Button mode="contained"  onPress={()=>register(firstname, lastname,name, email, password,city,street,zipcode,phone,district)}>
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
  errormsg: {
    color: "red"
  }
}) 
