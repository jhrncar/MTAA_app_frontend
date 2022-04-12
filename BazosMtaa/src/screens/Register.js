import React from 'react';
import {Button, Headline, TextInput, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import {BottomNavigation, Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';

const Register = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <RegisterScreenStyled>
      <View style={{alignItems: 'center'}}>
        <Headline>Registrácia</Headline>
      </View>
      <InputStyled
        label={'E-mail'}
        mode="outlined"
        outlineColor={colors.tertiary}
      />
      <InputStyled
        label={'Heslo'}
        mode="outlined"
        outlineColor={colors.tertiary}
      />
      <ItemsStyled>
        <LinkStyled to={{screen: 'Login'}}>
          Chceš sa prihlásiť? Klikni sem
        </LinkStyled>
        <Button mode="contained" onPress={() => navigation.navigate('App')}>
          Registrovať sa
        </Button>
        <LinkStyled to={{screen: 'App'}}>Pokračovať bez registrácie</LinkStyled>
      </ItemsStyled>
    </RegisterScreenStyled>
  );
};
export default Register;

const RegisterScreenStyled = styled(View)`
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
