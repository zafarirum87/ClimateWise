import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { View, Alert, StyleSheet, FlatList, Image } from 'react-native';
import * as React from 'react';
import { Text, Card, } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { requestMeteoWeatherApi, requestHourlyForecast, requestSevenDayForecast } from '../Services/api';
import BottomNavBar from '../Navigation/BottomTabNavigation';

export default function TodaysWeather() {
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [sevenDayForcast, setSevenDayForcast] = useState([]);
    const weatherConditions = {
        0: { description: 'Clear sky', icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/CLEAR.png')} /> },
        1: { description: 'Mainly clear', icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/RAIN.png')} /> },
        2: { description: 'Partly cloudy', icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/PCLOUDY.png')} /> },
        3: { description: 'cloudy', icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/MCLOUDY.png')} /> },
        45: { description: 'Fog', icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/FOG.png')} /> },
        51: { description: 'Drizzle', icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/SHOWER.png')} /> },
        53: { description: 'Rain', icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/RAIN.png')} /> },
        61: { description: 'Showers', icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/SHOWER.png')} /> },
        80: { description: 'Thunderstorm', icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/TSTORM.png')} /> },
        // Snow and related weather conditions
        71: { description: 'Light Snow', icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/LSNOW.png')} /> },
        73: { description: 'Moderate Snow', icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/SNOW.png')} /> },
        75: { description: 'Heavy Snow', icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/SNOW.png')} /> },
        77: { description: 'Snow Grains', icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/SNOW.png')} /> },

        // Sleet and hail weather conditions
        85: { description: 'Light Sleet', icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/SLEET.png')} /> },
        86: { description: 'Heavy Sleet', icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/SLEET.png')} /> },

        // Light and heavy snow showers
        95: { description: 'Snow Shower (Light)', icon: <Image style={{ width: 50, height: 50 }} source={require('../../assets/icons/SLEET.png')} /> },
        96: { description: 'Snow Shower (Moderate)', icon: <Image style={{ width: 50, height: 50 }} source={require('../../assets/icons/SLEET.png')} /> },
        99: { description: 'Snow Shower (Heavy)', icon: <Image style={{ width: 50, height: 50 }} source={require('../../assets/icons/SLEET.png')} /> },
        //windy weather conditions
        100: { description: 'Light Wind', icon: <Image style={{ width: 50, height: 50 }} source={require('../../assets/icons/WINDY.png')} /> },
        101: { description: 'Moderate Wind', icon: <Image style={{ width: 50, height: 50 }} source={require('../../assets/icons/WINDY.png')} /> },
        102: { description: 'Strong Wind', icon: <Image style={{ width: 50, height: 50 }} source={require('../../assets/icons/WINDY.png')} /> },
        103: { description: 'Very Strong Wind', icon: <Image style={{ width: 50, height: 50 }} source={require('../../assets/icons/WINDY.png')} /> },
        //deafult weather condition icons
        "clear": { icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/CLEAR.png')} /> },
        "cloudy": { icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/MCLOUDY.png')} /> },
        "rainy": { icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/RAIN.png')} /> },
        "snowy": { icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/SNOW.png')} /> },
        "foggy": { icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/FOG.png')} /> },
        "wind": { icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/WINDY.png')} /> },
        "unknown": { icon: <Image style={{ width: 40, height: 40 }} source={require('../../assets/icons/UNKNOWN.png')} /> }

    };

    // find current user location weather
    const findTodaysWeather = (latitude, longitude) => {
        requestMeteoWeatherApi(latitude, longitude)
            .then(data => {
                if (data) {
                    setWeather(data);
                }
            })
            .catch(error => console.log('error', error));
    };
    // find hourly forecast
    const findHourlyForecast = (latitude, longitude) => {
        requestHourlyForecast(latitude, longitude)
            .then(data => {
                if (data && data.hourly) {
                    const currentHourIndex = new Date().getHours(); // Get the current hour in user's timezone
                    // Combine time and temperature into an array of objects
                    const combinedData = data.hourly.time.map((time, index) => ({
                        time: new Date(time).getHours(),
                        temperature_2m: data.hourly.temperature_2m[index],
                    }))
                        .filter((item, index) => index >= currentHourIndex && index < currentHourIndex + 24); // Filter to get the next 24 hours
                    setHourlyForecast(combinedData);
                }
            })
            .catch(error => console.log('error', error));
    };
    // find seven day forecast
    const findSevenDayForecast = (latitude, longitude) => {
        requestSevenDayForecast(latitude, longitude)
            .then(data => {
                if (data) {
                    const sevenDayTransformData = data.daily.time.map((time, item) => ({
                        time: new Date(time).toDateString().substring(0, 3),
                        weatherCode: data.daily.weather_code[item],
                        weatherDescription: weatherConditions[data.daily.weather_code[item]] ? weatherConditions[data.daily.weather_code[item]].description : 'Unknown',
                        // use the weather icon from the weatherConditions object, or use a default icon if not found
                        weatherIcon: weatherConditions[data.daily.weather_code[item]]?.icon ||
                            (data.daily.weather_code[item] <= 3 ? weatherConditions["clear"].icon :
                                data.daily.weather_code[item] >= 45 && data.daily.weather_code[item] <= 48 ? weatherConditions["foggy"].icon :
                                    data.daily.weather_code[item] >= 51 && data.daily.weather_code[item] <= 67 ? weatherConditions["rainy"].icon :
                                        data.daily.weather_code[item] >= 71 && data.daily.weather_code[item] <= 77 ? weatherConditions["snowy"].icon :
                                            weatherConditions["unknown"].icon),
                        temperature_2m_max: data.daily.temperature_2m_max[item],
                        temperature_2m_min: data.daily.temperature_2m_min[item],
                    }));
                    setSevenDayForcast(sevenDayTransformData);
                }
            })
            .catch(error => console.log('error', error));
    };
    // get user location and fetch weather data
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('No permission to get location')
                return;
            }
            // Fetch location and set state
            let deviceLocation = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = deviceLocation.coords;

            const region = {
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };
            setLocation(region);
            // fetch user address using location reversegeocodeasync
            const place = await Location.reverseGeocodeAsync({ latitude, longitude });
            if (place.length > 0) {
                const placeName = place[0].city;
                setAddress(placeName);
            } else {
                console.log("No place found");
            }
            // Fetch weather data
            findTodaysWeather(latitude, longitude);
            findHourlyForecast(latitude, longitude);
            findSevenDayForecast(latitude, longitude);
        })();
    }, []);


    return (
        <View style={styles.container}>
            <Text > <MaterialCommunityIcons name="home" size={18} color="black" /> Home</Text>
            {weather ? (
                <View>
                    <Text variant="headlineLarge">{address}</Text>
                    <Text variant="displayLarge">{Math.round(weather.current_weather.temperature)} °C</Text>
                    <Text>min temp: {Math.round(Math.min(...weather.daily.temperature_2m_min))}</Text>
                    <Text>max temp: {Math.round(Math.max(...weather.daily.temperature_2m_max))}</Text>
                </View>
            ) : (
                <Text>Loading weather...</Text>
            )}
            <View></View>
            <Card style={styles.flatCard}>
                <Text variant="labelSmall" theme={{ height: 30, width: 370, backgroundColor: 'ghostwhite', borderRadius: 5 }} >Hourly Forecast</Text>
                <FlatList
                    horizontal
                    backgroundColor='ghostwhite'
                    marginVertical={5}
                    style={{ maxHeight: 100, width: 370 }}
                    data={hourlyForecast}
                    renderItem={({ item }) => (
                        <View style={styles.hourlyForecast}>
                            <Text style={styles.text}>Time: {item.time}:00</Text>
                            <Text style={styles.text}>temp:{item.temperature_2m} °C</Text>

                        </View>
                    )}
                />
            </Card>
            <Text variant="labelSmall" style={{ height: 30, width: 370, backgroundColor: 'ghostwhite', borderRadius: 5 }} >7 Day Forecast</Text>
            <FlatList
                style={{ width: 370, borderRadius: 5 }}
                marginVertical={10}
                backgroundColor='ghostwhite'
                data={sevenDayForcast}
                renderItem={({ item }) =>
                (

                    <Card style={styles.card}>
                        <Card.Content style={styles.cardContent} >
                            <View style={styles.cardRow}>
                                <Text style={styles.dayText}>{item.time}</Text>
                                <Text style={styles.dayText}>{item.weatherIcon}</Text>
                                <Text style={styles.dayText}> max temp: {Math.round(item.temperature_2m_max)} </Text>
                                <Text style={styles.dayText}> min temp: {Math.round(item.temperature_2m_min)} </Text>
                            </View>
                        </Card.Content>
                    </Card>
                )}
            />
            <BottomNavBar />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 90,
    },
    hourlyForecast: {
        backgroundColor: 'ghostwhite',
        marginVertical: 1,
        marginHorizontal: 10,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        alignContent: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
    },
    flatCard: {
        backgroundColor: 'white',
        marginVertical: 15,
        borderRadius: 5,
        justifyContent: 'center',
    },
    sevenDayForcastCard: {
        backgroundColor: 'white',
        marginVertical: 15,
        borderRadius: 5,
        justifyContent: 'center',
        height: 10,
    },
    cardContent: {
        backgroundColor: 'ghostwhite',
        padding: 0,
        margin: 0,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'ghostwhite',
        width: '100%',
        height: 40,
        padding: 10,
        margin: 0,
    },
    card: {
        backgroundColor: 'ghostwhite',
        padding: 0,
        margine: 10,
    },
    dayText: {
        fontSize: 18,
        fontWeight: 'medium',
    },
});