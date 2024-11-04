import Constants from 'expo-constants'

export default function requestLocationApi(address) {
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
}

// reverse geo location service

export  function requestReverseGeoLocationApi(latitude, longitude) {
    const API_URL = Constants.expoConfig.extra.EXPO_PUBLIC_Reverse_Geo_Location_API_URL;
    const API_KEY = '66ed541f45f34477635715jmee2e425';
console.log(API_URL, API_KEY, longitude, latitude);
    if (!API_URL) {
        console.error("Missing Location API URL");
        return Promise.reject("Missing Location API URL");
    }

    // fetches and manages the location
    return fetch(`${API_URL}?lat=${latitude}&lon=${longitude}&api_key=${API_KEY}`)
        .then(response => {
            console.log(response);
            if (!response.ok)
                throw new Error("Error in fetch:" + response.statusText);

            return response.json()
        })
}