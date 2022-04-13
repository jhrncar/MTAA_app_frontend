import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import styled from 'styled-components';
import {
  HeaderSearchBar,
  HeaderClassicSearchBar,
} from 'react-native-header-search-bar';
import {Appbar, Modal, Portal, Searchbar} from 'react-native-paper';
import {useTheme} from 'styled-components';
const Search = () => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <SafeAreaView>
      <Portal>
        <ModalStyled visible={visible} onDismiss={hideModal}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </ModalStyled>
      </Portal>
      <HeaderClassicSearchBar
        backgroundColor="#FF8F00"
        onChangeText={text => console.log(text)}
        onPress={showModal}
      />

      <ScrollView></ScrollView>
    </SafeAreaView>
  );
};

const ModalStyled = styled(Modal)`
  background-color: #000000;
  padding: 20px;
`;

export default Search;
