import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../Screens/Search';
import SearchSuggestions from '../Screens/SearchSuggestions';
import WeatherDetails from '../Screens/WeatherDetails';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
    return (
            <Stack.Navigator initialRouteName="Search">
                
                <Stack.Screen name="SearchSuggestions" component={SearchSuggestions} />
                <Stack.Screen name="WeatherDetails" component={WeatherDetails} />
            </Stack.Navigator>
    );
}
