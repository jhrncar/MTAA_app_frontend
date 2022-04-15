import React from 'react';
import {Button, Headline, TextInput, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import {BottomNavigation, Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Navigate} from '../navigation/RootNavigation';
import {AuthContext} from '../context/AuthContext';

const Profile = ({navigation}) => {
  const {colors} = useTheme();
  const {logout} = React.useContext(AuthContext);
  return (
    <LoginScreenStyled>
      <Button mode="contained" onPress={logout}>
        Odhlásiť sa
      </Button>
    </LoginScreenStyled>
  );
};
export default Profile;

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
