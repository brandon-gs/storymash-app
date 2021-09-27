import axios from 'utils/axios';
import {AxiosError} from 'axios';
import {
  AUTH_AUTHENTICATE,
  AUTH_DEAUTHENTICATE,
  AUTH_UPDATE_USER,
  AUTH_REMOVE_USER,
} from '../types/auth.types';
import {User} from 'interfaces/user';

// Update the user without request
const updateUser = (user: User) => {
  return (dispatch: any) => {
    dispatch({type: AUTH_UPDATE_USER, payload: user});
  };
};

// Update the user with request to backend
const asyncUpdateUser = (token: string | null, body: any) => {
  return async (dispatch: any) => {
    if (token) {
      const {data} = await axios.put('/user', body, {
        headers: {
          authorization: token,
        },
      });
      if (data.user) {
        dispatch({type: AUTH_UPDATE_USER, payload: data.user});
      }
    }
  };
};

const removeUser = () => {
  return (dispatch: any) => {
    dispatch({type: AUTH_REMOVE_USER});
  };
};

// gets token from the api and stores it in the redux store and in a cookie
const authenticate = (
  formData: Record<string, string>,
  type: 'login' | 'register',
): any => {
  if (type !== 'login' && type !== 'register') {
    throw new Error('Wront API call!');
  }
  return async (dispatch: any) => {
    try {
      // Get user info
      const {
        data: {token, user},
      } = await axios.post(`/auth/${type}`, formData);
      // Add token to axios headers
      axios.defaults.headers.authorization = token;
      // Save auth data in axios
      dispatch({type: AUTH_AUTHENTICATE, payload: {token, user}});
    } catch (error) {
      const e = error as AxiosError;
      const {response} = e;
      if (response && response.status === 401) {
        const message = 'Datos incorrectos, intente nuevamente.';
        console.log(message);
        // dispatch(actions.updateAlert({message, severity: 'error', open: true}));
      }
    } finally {
      // dispatch(actions.updateLoader(false));
    }
  };
};

// gets the token from the cookie and saves it in the store
const reauthenticate = (token: string, user: User): any => {
  return (dispatch: any) => {
    // Add token to axios headers
    axios.defaults.headers.authorization = token;
    // Save authenticated data in redux
    dispatch({type: AUTH_AUTHENTICATE, payload: {token, user}});
  };
};

// remove token
const deauthenticate = () => {
  return (dispatch: any) => {
    // dispatch(actions.updateLoader(true));
    dispatch({type: AUTH_DEAUTHENTICATE});
    // Remove token from axios headers
    axios.defaults.headers.authorization = null;
    // dispatch(actions.updateLoader(false));
  };
};

export default {
  authenticate,
  reauthenticate,
  deauthenticate,
  updateUser,
  asyncUpdateUser,
  removeUser,
};
