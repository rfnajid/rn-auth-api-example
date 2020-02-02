import axios from 'axios';
import { ACCESS_TOKEN } from '../config/const';
import NavigationService from './NavigationService';
import ApiConfig from '../config/api';
import StorageService from './StorageService';

export const ApiHeader = {
    noToken : {
        Accept: 'application/json'
    },
    standard : async () => {
        header = {
            Accept: 'application/json',
        }
        token = await getAccessToken();

        if(token){
            header.Authorization = 'Bearer '+token;
        }

        return header;
    }
}

export const getAccessToken = async () => {
    try {
        const retrievedItem = await AsyncStorage.getItem(ACCESS_TOKEN);
        if (retrievedItem !== null) {
            const token = JSON.parse(retrievedItem);
            // We have the token!!
            return token;
        } return null;
    } catch (error) {
        // Error retrieving data
    }
};

const apiService = axios.create({
    baseURL: ApiConfig.baseUrl
});

const getApiService = (header = ApiHeader.noToken) =>{
    apiService.defaults.headers.common = header;
    return apiService
}

export default getApiService;

function getUrl(config) {
    console.log('full url : '+config.baseURL+config.url);
    if (config.baseURL) {
        return config.url.replace(config.baseURL, '');
    } else {
        return config.url;
    }
}

// Intercept all requests
apiService.interceptors.request.use(
    config => {
        console.log(`%c ${config.method.toUpperCase()} - ${getUrl(config)}:`,config);
        return config;
    },
    error => Promise.reject(error)
);

// Intercept all responses
apiService.interceptors.response.use(
    async response => {
        if (response.status === 401) {
            //unauthorized or token expired
            StorageService.remove(ACCESS_TOKEN);
            NavigationService.navigate('Auth');
        }
        console.log(`%c ${response.status} - ${getUrl(response.config)}:`,response);
        return response;
    },
    error => {
        console.log(`%c ${error.response.status} - ${getUrl(error.response.config)}:`,error.response);
        return Promise.reject(error);
    },
);