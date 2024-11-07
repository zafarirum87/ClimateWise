import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { Icon, TextInput, Button , Card, PaperProvider, Appbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSQLiteContext } from 'expo-sqlite';
import { useIsFocused } from '@react-navigation/native';

export default function Search(){
  // users input querry
const [savedLocations, setSavedLocations] = useState([]);
const isFocused = useIsFocused();
  const db = useSQLiteContext();


// load saved locations
const loadSavedLocations = async () => {
  try {
    const list = await db.getAllAsync('SELECT * from SavedLocationsList');
    setSavedLocations(list);
  } catch (error) {
    console.error('Could not get saved locations', error);
  }
useEffect(() => {
  if(isFocused){
    loadSavedLocations();
  }
}, [isFocused]);


  // Navigate to the search suggestions screen
  const goToSearchSuggestions = () => {
    navigation.navigate('SearchSuggestions');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToSearchSuggestions}>
        <TextInput
          placeholder="Search for a city"
          editable={false} // Disable editing
          style={{ padding: 10, borderBottomWidth: 1 }}
        />
      </TouchableOpacity>
      <FlatList
      data={savedLocations}
      keyExtractor={item=>item.id.toString()}
      renderItem={({item})=>(
        <Text>{item.name}</Text>
      )}/>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 140,
  },
});