import Constants from 'expo-constants';

export default function requestMeteoWeatherApi(latitude, longitude) {
    const API_URL = Constants.expoConfig.extra.EXPO_PUBLIC_Meteo_Weather_API_URL;

    const query_url = `${API_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=precipitation_probability&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

    return fetch(query_url)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch:" + response.statusText);

            return response.json()
        })
}