import axios from 'axios';
import Config from 'react-native-config';

const instance = axios.create({
	baseURL: Config.API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

axios.interceptors.request.use(
	(config) => {
		console.log('REQUEST', config);
		return config;
	},
	(error) => {
		console.log('REQUEST FAILURE:', error);
		return Promise.reject(error);
	},
);

axios.interceptors.response.use(
	(response) => {
		console.log('RESPONSE', response);
		return response;
	},
	(error) => {
		console.log('RESPONSE FAILURE:', error);
		return Promise.reject(error);
	},
);

export default instance;
