import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { requestLocationApi } from '../Services/locationService';
import { debounce } from 'lodash';

export default function SearchSuggestions() {
    const navigation = useNavigation();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // Debounced function to handle input and fetch suggestions
    const fetchSuggestions = debounce( async (input) => {
        try {
            const data = await requestLocationApi(input);
            console.log('Suggestions:', data);
            setSuggestions(data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    }, 500); // Delay of 500ms after the user stops typing

    const handleLocationSelect = (location) => {
        navigation.navigate('WeatherDetails', { location });
        // Clear the suggestions
        setSuggestions([]);
    };
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Type location..."
                value={query}
                onChangeText={(text) => {
                    setQuery(text);
                    if (text.length > 2) fetchSuggestions(text);
                }}
                style={{ padding: 10, borderBottomWidth: 1 }}
            />
            <FlatList
                data={suggestions}
                keyExtractor={(item) => item.place_id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleLocationSelect(item)}>
                        <Text style={{ padding: 10 }}>{item.display_name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
