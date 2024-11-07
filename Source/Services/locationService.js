import Constants from 'expo-constants'
import axios from 'axios';


// search suggestions service
export function requestLocationApi(input) {
    const API_URL = Constants.expoConfig.extra.EXPO_PUBLIC_Location_API_URL;
    const API_KEY = '66ed541f45f34477635715jmee2e425'; // Replace with your actual API key

    if (!API_URL) {
        console.error("Missing Location API URL");
        return Promise.reject("Missing Location API URL");
    }

    return axios.get(API_URL, {
        params: {
            q: input,
            key: API_KEY,
            format: 'json', // adjust based on API requirements
        },
    }).then(response => {
        console.log("Location suggestions:", response.data);
        return response.data;
    }).catch(error => {
        console.error("Error fetching location suggestions:", error);
        throw error;
    });
}

// Location service
/* export  function requestLocationApi(address) {
    const API_URL = Constants.expoConfig.extra.EXPO_PUBLIC_Location_API_URL;
    const API_KEY = '66ed541f45f34477635715jmee2e425';

    if (!API_URL) {
        console.error("Missing Location API URL");
        return Promise.reject("Missing Location API URL");
    }

    // fetches and manages the location
    return fetch(`${API_URL}?q=${address}&api_key=${API_KEY}`)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch:" + response.statusText);

            return response.json()
        })
} */

// reverse geo location service

export  function requestReverseGeoLocationApi(latitude, longitude) {
    console.log("here is Latitude:", latitude + "here is Longitude:", longitude);
    const API_URL = Constants.expoConfig.extra.EXPO_PUBLIC_Reverse_Geo_Location_API_URL;
    const API_KEY = '66ed541f45f34477635715jmee2e425';

    if (!API_URL) {
        console.error("Missing Location API URL");
        return Promise.reject("Missing Location API URL");
    }

    // fetches and manages the location
    return fetch(`${API_URL}?lat=${latitude}&lon=${longitude}&api_key=${API_KEY}`)
        .then(response => {

            if (!response.ok)
                throw new Error("Error in fetch:" + response.statusText);

            return response.json()
        })
        .then(data => {
            // Check if data is structured as expected
            if (!data || (Array.isArray(data) && data.length === 0)) {
                throw new Error("No location data returned");
            }
            return data;
        })
        .catch(error => {
            console.error("Reverse Geolocation API Error:", error);
            return Promise.reject(error);
        });
}