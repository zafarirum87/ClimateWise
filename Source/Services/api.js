import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig.extra.EXPO_PUBLIC_Meteo_Weather_API_Base_URL;
// get current weather
export  const requestMeteoWeatherApi = async(latitude, longitude) => {

    return fetch(`${BASE_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=precipitation_probability&daily=temperature_2m_max,temperature_2m_min&timezone=auto`)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch:" + response.statusText);
            return response.json()
        })
        .catch(error => {
            console.error('Error fetching hourly data:', error);
            throw error;
        });
    };

    //----------------------- get hourly forecast-----------------------


export  const requestHourlyForecast = async (latitude, longitude) =>{
    // Get the current time in the user's local timezone
    const currentTime = new Date();
    const userOffset = currentTime.getTimezoneOffset() * 60000; // in milliseconds
    const currentLocalTime = new Date(currentTime.getTime() - userOffset);

    // Calculate start and end time for the next 24-hour period, starting from the current hour
    const startOfDay = new Date(currentLocalTime);
    startOfDay.setMinutes(0, 0, 0); // Set minutes, seconds, and milliseconds to zero to start from current hour
    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(startOfDay.getHours() + 24); // Set to 24 hours later

    // Convert times to ISO format (required by Open Meteo API)
    const start = startOfDay.toISOString();
    const end = endOfDay.toISOString();

    return fetch(`${BASE_URL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&daily=sunrise,sunset&start=${start}&end=${end}&timezone=auto`)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch:" + response.statusText);
            return response.json()
        })
        .catch(error => {
            console.error('Error fetching hourly data:', error);
            throw error;
        });
}

// -----------------------------------seven days forecast-----------------------------------
export const requestSevenDayForecast = async (latitude, longitude) => {

    return fetch(`${BASE_URL}?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=GMT`)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch:" + response.statusText);
            return response.json()
        })
        .catch(error => {
            console.error('Error fetching seven days data:', error);
            throw error;
        });
}