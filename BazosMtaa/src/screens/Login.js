import React from 'react';
import {Button, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import {BottomNavigation, Text, useTheme} from 'react-native-paper';

const Login = () => {
  const {colors} = useTheme();
  return (
    <LoginScreenStyled>
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
      <Button mode="contained" onPress={() => console.log('Pressed')}>
        Prihlásiť sa
      </Button>
    </LoginScreenStyled>
  );
};
export default Login;

const LoginScreenStyled = styled(SafeAreaView)`
  flex: 1;
  width: 80%;
  align-self: center;
  justify-content: center;
`;
const InputStyled = styled(TextInput)`
  margin-vertical: 10px;
`;
