import Constants from 'expo-constants';

export default function requestWeatherApi(latitude, longitude) {

    // Get the weather API URL from environment variables
    const API_URL = Constants.expoConfig.extra.EXPO_PUBLIC_Weather_API_URL;
    const API_KEY = 'be092c5a2fe5f484c9673c77da97eeea'; // Replace with actual key or read from env if needed

    if (!API_URL || !API_KEY) {
        console.error("Missing API URL or API Key");
        return Promise.reject("Missing API URL or API Key");
    }
    // fetches and manages the location lat={latitude}&lon={longitude}&appid={}

    const url = `${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    console.log("Fetching weather data from:", url);
    return fetch(url)
        .then(response => {
            console.log(response);
            if (!response.ok)
                throw new Error("Error in fetch:" + response.statusText);

            return response.json()
        })
}