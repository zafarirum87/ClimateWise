import { requestMeteoWeatherApi } from "../Services/api";
import { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Button, Text, View } from "react-native";


export default function WeatherDetails({ route }) {
    const [weather, setWeather] = useState(null);
    const { location } = route.params;
    const db = useSQLiteContext();


    // get latitude and lingitude of the location and give to api to get weather details
    const getWeatherDetails = (latitude, longitude) =>{
        requestMeteoWeatherApi(location.latitude, location.longitude)
            .then(data => {
                console.log(data);
                setWeather(data);
            }).catch(error => {
                console.log('error', error);
            });
    }


    // save location to database
    const saveLocation = async () => {
        try {
            await db.runAsync('INSERT INTO SavedLocationsList VALUES ( ?,?)', null, location);
            // display name of the location
            [location.display_name];
            navigation.goBack();
        }
        catch (error) {
            console.error('Could not add location', error);
        }
    };

    return (
        <View>
            <Text>Weather Details</Text>
            <Button title="Save Location" onPress={saveLocation} />
            <Button title="Cancel" onPress={() => navigation.goBack()} />
        </View>
    )
}