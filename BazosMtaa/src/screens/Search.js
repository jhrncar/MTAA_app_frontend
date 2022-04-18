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
import {Picker} from '@react-native-picker/picker';
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
  TextInput,
  Button,
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
  const [categories, setCategories] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [district, setDistrict] = React.useState(null);
  const [category_, setCategory_] = React.useState(null);
  const [minPrice, setMinPrice] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState('');
  React.useEffect(() => {
    console.log(category_);
    if (
      (query != '' ||
        district != null ||
        category_ != null ||
        minPrice != '' ||
        maxPrice != '') &&
      !category
    ) {
      let finalQuery = 'http://192.168.1.12:8000/ads/?page=' + page;
      if (query != '') {
        finalQuery += '&name=' + query;
      }
      if (category_) {
        finalQuery += '&category=' + category_;
      }
      if (district) {
        finalQuery += '&district=' + district;
      }
      if (minPrice != '') {
        finalQuery += '&min_prize=' + minPrice;
      }
      if (maxPrice != '') {
        finalQuery += '&max_prize=' + maxPrice;
      }
      setLoading(true);
      fetch(finalQuery)
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
  }, [query, page, category, category_, district, minPrice, maxPrice]);
  const handleReset = () => {
    setQuery('');
    setCategory_(null);
    setDistrict(null);
    setMinPrice('');
    setMaxPrice('');
    setPage(1);
  };

  React.useEffect(() => {
    fetch('http://192.168.1.12:8000/get_districts/')
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err));
  }, []);

  React.useEffect(() => {
    fetch('http://192.168.1.12:8000/get_categories/')
      .then(res => res.json())
      .then(res => setCategories(res))
      .catch(err => console.log(err));
  }, []);

  const handlePopulate = response => {
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
          <TextInput
            placeholder="Titulok inzerátu"
            onChangeText={val => setQuery(val)}
            value={query}
          />
          <View style={styles.pickerview}>
            <Picker
              dropdownIconColor="black"
              style={styles.picker}
              selectedValue={category_}
              onValueChange={(itemValue2, itemIndex2) =>
                setCategory_(itemValue2)
              }>
              {categories.map(item2 => (
                <Picker.Item
                  label={item2.name}
                  value={item2.name}
                  key={item2.id}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerview}>
            <Picker
              dropdownIconColor="black"
              style={styles.picker}
              selectedValue={district}
              onValueChange={(itemValue, itemIndex) => setDistrict(itemValue)}>
              {data.map(item => (
                <Picker.Item
                  label={item.name}
                  value={item.name}
                  key={item.id}
                />
              ))}
            </Picker>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '5%',
            }}>
            <TextInput
              placeholder="Minimálna cena"
              keyboardType="numeric"
              onChangeText={val => setMinPrice(val)}
              value={minPrice}
            />
            <TextInput
              placeholder="Maximálna cena"
              keyboardType="numeric"
              onChangeText={val => setMaxPrice(val)}
              value={maxPrice}
            />
          </View>
          <Button
            style={{marginVertical: '5%'}}
            mode="contained"
            onPress={handleReset}>
            Vymazať filtre
          </Button>
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
  padding-horizontal: 10%;
`;

export default Search;
const styles = StyleSheet.create({
  picker: {
    color: '#000',
    backgroundColor: 'white',
  },
  pickerview: {
    borderColor: '#A9A9A9',
    borderWidth: 1,
    marginTop: '5%',
  },
  errormsg: {
    color: 'red',
  },
});
