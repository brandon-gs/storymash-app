import {
  AuthState,
  AuthActions,
  AUTH_AUTHENTICATE,
  AUTH_DEAUTHENTICATE,
  AUTH_UPDATE_USER,
  AUTH_REMOVE_USER,
} from 'store/types/auth.types';

const initialState: AuthState = {
  token: undefined,
  user: undefined,
  auth: false,
};

const authReducer = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AUTH_AUTHENTICATE: {
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        auth: true,
      };
    }
    case AUTH_DEAUTHENTICATE: {
      return {
        ...state,
        token: undefined,
        user: undefined,
        auth: false,
      };
    }
    case AUTH_UPDATE_USER: {
      return {
        ...state,
        user: action.payload.user,
      };
    }
    case AUTH_REMOVE_USER: {
      return {
        ...state,
        user: undefined,
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
