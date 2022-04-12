import React from 'react';
import {Button, Headline, List, TextInput, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import {BottomNavigation, Text, useTheme} from 'react-native-paper';
import {View, ScrollView} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';

const Register = ({navigation}) => {
  const {colors} = useTheme(); //Bud nebude nepovinne pole a bude to vyzerat pekne, alebo tam bude, ale bude to vyzerat zle
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
      }}>
      <View style={{alignItems: 'center'}}>
        <Headline>Registrácia</Headline>
      </View>
      <InputStyled
        label={'Meno a priezvisko'}
        mode="outlined"
        outlineColor={colors.tertiary}
      />
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
      <InputStyled
        label={'Zopakuj heslo'}
        mode="outlined"
        outlineColor={colors.tertiary}
      />
      <List.Accordion
        title="Nepovinné údaje"
        style={{backgroundColor: colors.secondary}}>
        <InputStyled
          label={'Ulica a číslo domu'}
          mode="outlined"
          outlineColor={colors.tertiary}
        />

        <InputStyled
          label={'PSČ'}
          mode="outlined"
          outlineColor={colors.tertiary}
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
      </List.Accordion>

      <ItemsStyled>
        <LinkStyled to={{screen: 'Login'}}>
          Chceš sa prihlásiť? Klikni sem
        </LinkStyled>
        <Button mode="contained" onPress={() => navigation.navigate('App')}>
          Registrovať sa
        </Button>
        <LinkStyled to={{screen: 'App'}}>Pokračovať bez registrácie</LinkStyled>
      </ItemsStyled>
    </ScrollView>
  );
};
export default Register;

const InputStyled = styled(TextInput)``;
const ItemsStyled = styled(View)``;

const LinkStyled = styled(Link)`
  color: #000;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-color: #000;
`;
