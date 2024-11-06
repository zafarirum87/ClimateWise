import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Menu from '../Screens/Menu';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function BottomNavBar() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Menu" component={Menu} />
            
            </Tab.Navigator>
        </NavigationContainer>
    );
}