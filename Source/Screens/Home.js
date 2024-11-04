import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import requestMeteoWeatherApi from '../Services/meteoWeatherService';
import requestReverseGeoLocationApi from '../Services/locationService'
export default function TodaysWeather() {
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState(null);
    const [city, setCity] = useState(null);

// find current user location weather
    const findTodaysWeather =  (latitude, longitude) => {
        requestMeteoWeatherApi(latitude, longitude)
            .then(data => {
                if (data){
                    setWeather(data.current_weather);
                }
            })
            .catch.catch(error => console.log('error', error));
    };
// find city name
    const findCityName = (latitude, longitude) => {
        console.log(latitude, longitude);
        requestReverseGeoLocationApi(latitude, longitude)
        .then(data=>{
            if(data){
                console.log("Reverse geolocation data:", data);
                setCity(data);
                console.log(data);

            }
        }).catch.catch(error => console.log('error', error));
}

// get permisson to access user location
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('No permission to get location')
                return;
            }
            // get current location
            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            setLocation({ latitude, longitude });
            // Fetch weather for current location
            findTodaysWeather(latitude, longitude);
            // Get city name using reverse geocoding
            findCityName(latitude, longitude);
            console.log(latitude, longitude)
        })();
    }, []);

    return (
        <View>
            <Text>Today's Weather</Text>
            {weather ? (
                <View>
                    <Text Style={{ fontSize: 18, color: 'black' }}>City: {city}</Text>
                    <Text>Temperature: {weather.temperature} °C</Text>
                    <Text>Windspeed: {weather.windspeed} m/s</Text>
                    <Text>Wind direction: {weather.winddirection}°</Text>
                    <Text>Time: {weather.time}</Text>

                </View>
            ) : (
                <Text>Loading weather...</Text>
            )}
            <StatusBar style="auto" />
        </View>
    );
}