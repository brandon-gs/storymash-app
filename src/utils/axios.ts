import axios from 'axios';
import {store} from 'store/store';
import {API_URL} from 'react-native-dotenv';

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    authorization: store.getState().authentication.token,
  },
});

export default axiosClient;
