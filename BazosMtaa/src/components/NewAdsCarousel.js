import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  useWindowDimensions,
  FlatList,
  SectionList,
} from 'react-native';
import {
  Appbar,
  Caption,
  Colors,
  Divider,
  Headline,
  IconButton,
  Title,
  useTheme,
} from 'react-native-paper';
import AdCard from './AdCard';

const NewAdsCarousel = () => {
  const [data, setData] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    fetch('http://192.168.1.12:8000/latest_ads/')
      .then(res => res.json())
      .then(res => setData(res.items))
      .catch(err => console.log(err));
  }, []);
  const handleIncrement = () => {
    setIndex(index + 2);
    console.log(index);
  };
  const handleDecrement = () => {
    setIndex(index - 2);
    console.log(index);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <IconButton
        icon="arrow-left"
        onPress={handleDecrement}
        disabled={index === 0}
        style={{alignSelf: 'center'}}
      />

      {data.slice(index, index + 2).map(item => (
        <View
          key={item.id}
          style={{
            flex: 1,

            margin: 15,
            alignSelf: 'center',
          }}>
          <AdCard ad={item} />
        </View>
      ))}

      <IconButton
        icon="arrow-right"
        onPress={handleIncrement}
        disabled={index >= data.length - 2}
        style={{alignSelf: 'center'}}
      />
    </View>
  );
};
export default NewAdsCarousel;
