import {
  AuthState,
  AuthActions,
  AUTH_AUTHENTICATE,
  AUTH_DEAUTHENTICATE,
  AUTH_UPDATE_USER,
  AUTH_REMOVE_USER,
  USER_ADD_FOLLOWER,
  USER_REMOVE_FOLLOWER,
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
    case USER_ADD_FOLLOWER: {
      const {userToFollowId} = action.payload;

      if (!state.user) {
        return state;
      }

      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, userToFollowId],
        },
      };
    }
    case USER_REMOVE_FOLLOWER: {
      const {userToUnfollowId} = action.payload;

      if (!state.user) {
        return state;
      }

      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter(
            userId => userId !== userToUnfollowId,
          ),
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
