import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../Screens/Search';
import TodaysWeather from '../Screens/Home';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StackNavigation from './StackNavigation';


const Tab = createBottomTabNavigator();

export default function BottomNavBar() {

    return (
        <Tab.Navigator 
            screenOptions={({ route }) => ({
                headerShown: false,  // Hide the default header to avoid overlap
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'TodaysWeather') {
                        iconName = 'home';
                    } else if (route.name === 'Search') {
                        iconName = 'magnify';
                    }

                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#1c6feb',
                tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen
                name="TodaysWeather"
                component={TodaysWeather}/>
            <Tab.Screen
                name="Search"
                component={StackNavigation}/>
        </Tab.Navigator>

    );
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
    },
});