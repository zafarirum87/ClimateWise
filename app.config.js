import 'dotenv/config';
export default {
    expo: {
        name: 'ClimateWise-Weather-App',
        slug: 'ClimateWise-Weather-App',
        extra: {
            EXPO_PUBLIC_Location_API_URL: process.env.EXPO_PUBLIC_Location_API_URL,
            EXPO_PUBLIC_Reverse_Geo_Location_API_URL: process.env.EXPO_PUBLIC_Reverse_Geo_Location_API_URL,
            EXPO_PUBLIC_Weather_API_URL: process.env.EXPO_PUBLIC_Weather_API_URL,
            EXPO_PUBLIC_Meteo_Weather_API_Base_URL: process.env.EXPO_PUBLIC_Meteo_Weather_API_Base_URL,
        },
    },
};