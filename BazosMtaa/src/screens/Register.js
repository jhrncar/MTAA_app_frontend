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
import {View, ScrollView} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import {AuthContext} from '../context/AuthContext';

const Register = ({navigation}) => {
  const {colors} = useTheme(); //Bud nebude nepovinne pole a bude to vyzerat pekne, alebo tam bude, ale bude to vyzerat zle
  const [isRequired, setIsRequired] = React.useState(true);
  const handleRequired = () => setIsRequired(!isRequired);
  const {register} = React.useContext(AuthContext);
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
            label={'Používateľské meno'}
            mode="outlined"
            outlineColor={colors.tertiary}
          />
          <InputStyled
            label={'E-mail'}
            mode="outlined"
            outlineColor={colors.tertiary}
            keyboardType="email-address"
          />
          <InputStyled
            label={'Heslo'}
            mode="outlined"
            outlineColor={colors.tertiary}
          />
          <InputStyled
            label={'Zopakuj heslo'}
            mode="outlined"
            outlineColor={colors.tertiary}
          />
        </View>
      )}
      {!isRequired && (
        <View>
          <InputStyled
            label={'Ulica a číslo domu'}
            mode="outlined"
            outlineColor={colors.tertiary}
          />

          <InputStyled
            label={'PSČ'}
            mode="outlined"
            outlineColor={colors.tertiary}
            keyboardType="numeric"
          />
          <InputStyled
            label={'Mesto'}
            mode="outlined"
            outlineColor={colors.tertiary}
          />
          <InputStyled
            label={'Okres'}
            mode="outlined"
            outlineColor={colors.tertiary}
          />
        </View>
      )}
      <ItemsStyled>
        <LinkStyled to="/Login">Chceš sa prihlásiť? Klikni sem</LinkStyled>
        <Button mode="contained" onPress={register}>
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
