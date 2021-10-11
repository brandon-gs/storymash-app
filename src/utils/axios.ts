import axios from 'axios';
import {store} from 'store/store';
import {API_URL, API_SECRET} from 'react-native-dotenv';

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    authorization: store.getState().authentication.token,
    ['api-authorization']: API_SECRET,
  },
});

export const CancelToken = axios.CancelToken;

export default axiosClient;
