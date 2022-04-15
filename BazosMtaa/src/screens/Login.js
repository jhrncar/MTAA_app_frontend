import React from 'react';
import {Button, Headline, TextInput, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import {BottomNavigation, Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {AuthContext} from '../context/AuthContext';

const Login = ({navigation}) => {
  const {colors} = useTheme();
  const {login} = React.useContext(AuthContext);

  return (
    <LoginScreenStyled>
      <View style={{alignItems: 'center'}}>
        <Headline>Login</Headline>
      </View>
      <InputStyled
        label={'Používateľské meno'}
        mode="outlined"
        outlineColor={colors.tertiary}
      />
      <InputStyled
        label={'Heslo'}
        mode="outlined"
        outlineColor={colors.tertiary}
      />
      <ItemsStyled>
        <LinkStyled to="/Register">Chceš sa registrovať? Klikni sem</LinkStyled>
        <Button mode="contained" onPress={login}>
          Prihlásiť sa
        </Button>
        <LinkStyled to="/NotLoggedApp/Domov">
          Pokračovať bez prihlásenia
        </LinkStyled>
      </ItemsStyled>
    </LoginScreenStyled>
  );
};
export default Login;

const LoginScreenStyled = styled(View)`
  flex: 1;
  flex-direction: column;
  width: 80%;
  align-self: center;
  justify-content: center;
`;
const InputStyled = styled(TextInput)`
  margin-vertical: 10px;
`;
const ItemsStyled = styled(View)`
  flex: 1;
  flex-direction: column;
  margin-top: 50px;
  max-height: 15%;
  justify-content: space-between;
`;

const LinkStyled = styled(Link)`
  color: #000;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-color: #000;
`;
