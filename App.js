import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavBar from './Source/Navigation/BottomTabNavigation';
import { SQLiteProvider } from 'expo-sqlite';

export default function App() {
  const initialize = async (db) => {
    db.execAsync(`
       CREATE TABLE IF NOT EXISTS SavedLocationsList (id INTEGER PRIMARY KEY NOT NULL, savedLocations TEXT);`);
  };
  return (
    <SQLiteProvider
      databaseName='coursedb.db'
      onInit={initialize}
      onError={error => console.error('Could not open database', error)}>
      <NavigationContainer>
        <BottomNavBar />
      </NavigationContainer>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
