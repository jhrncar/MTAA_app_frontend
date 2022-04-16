import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';
import styled from 'styled-components';
import {HeaderClassicSearchBar} from 'react-native-header-search-bar';
import {
  Appbar,
  Modal,
  Portal,
  Searchbar,
  Divider,
  Badge,
  IconButton,
  useTheme,
  Headline,
  Title,
} from 'react-native-paper';
import AdCard from '../components/AdCard';
const Search = ({route, navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [query, setQuery] = React.useState('');
  const [result, setResult] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState();
  const [isLoading, setLoading] = React.useState(false);
  const {colors} = useTheme();
  let category = null;
  try {
    category = route.params.category;
  } catch (error) {}

  React.useEffect(() => {
    if (query.length > 0 && !category) {
      setLoading(true);
      fetch('http://192.168.1.12:8000/ads/?page=' + page + '&name=' + query)
        .then(res => res.json())
        .then(res => handlePopulate(res))
        .catch(err => console.log(err));
    } else if (category) {
      setLoading(true);
      fetch(
        'http://192.168.1.12:8000/ads/?page=' +
          page +
          '&category=' +
          category.name,
      )
        .then(res => res.json())
        .then(res => handlePopulate(res))
        .catch(err => console.log(err));
    }
  }, [query, page, category]);

  const handlePopulate = response => {
    console.log(response.items);
    setResult(response.items);
    setPages(response.metadata.pages_total);
    setLoading(false);
  };

  const handleInput = input => {
    setQuery(input);
  };
  const handleIncrement = () => {
    setPage(page + 1);
  };
  const handleDecrement = () => {
    setPage(page - 1);
  };
  return (
    <>
      <Portal>
        <ModalStyled visible={visible} onDismiss={hideModal}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </ModalStyled>
      </Portal>

      {!category ? (
        <HeaderClassicSearchBar
          backgroundColor="#FF8F00"
          onChangeText={handleInput}
          onPress={showModal}
        />
      ) : (
        <View style={{width: '80%', alignSelf: 'center'}}>
          <Headline>Kategória: {category.name}</Headline>
        </View>
      )}
      <FlatList
        style={{width: '80%', alignSelf: 'center'}}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: 'space-evenly',
          marginVertical: 10,
        }}
        numColumns={2}
        data={result}
        ListEmptyComponent={() =>
          query.length > 0 && !isLoading ? (
            <Title style={{color: 'black'}}>Nič sa nenašlo :-(</Title>
          ) : null
        }
        renderItem={({item}) => (
          <View style={{flex: 1, maxWidth: '40%'}}>
            <AdCard ad={item} navigation={navigation} />
          </View>
        )}
      />
      {pages > 1 && (
        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            marginVertical: '5%',
          }}>
          <IconButton
            icon="arrow-left"
            onPress={handleDecrement}
            disabled={page === 1}
            style={{alignSelf: 'center'}}
          />
          <Badge style={{backgroundColor: colors.primary}} size={40}>
            {page}
          </Badge>
          <IconButton
            icon="arrow-right"
            onPress={handleIncrement}
            disabled={page >= pages}
            style={{alignSelf: 'center'}}
          />
        </View>
      )}
    </>
  );
};

const ModalStyled = styled(Modal)`
  background-color: #000000;
  padding: 20px;
`;

export default Search;
