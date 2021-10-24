import {User} from 'interfaces/user';

export const AUTH_AUTHENTICATE = '@AUTH/AUTHENTICATE';
export const AUTH_DEAUTHENTICATE = '@AUTH/DEAUTHENTICATE';
export const AUTH_UPDATE_USER = '@AUTH/UPDATE_USER';
export const AUTH_REMOVE_USER = '@AUTH/REMOVE_USER';
export const USER_ADD_FOLLOWER = '@AUTH/USER_ADD_FOLLOWER';
export const USER_REMOVE_FOLLOWER = '@AUTH/USER_REMOVE_FOLLOWER';

export interface AuthState {
  token?: string;
  user?: User;
  auth: boolean;
}

export interface AuthenticateAction {
  type: typeof AUTH_AUTHENTICATE;
  payload: AuthState;
}

export interface DeauthenticateAction {
  type: typeof AUTH_DEAUTHENTICATE;
}

export interface UpdateUserAction {
  type: typeof AUTH_UPDATE_USER;
  payload: {user: User};
}

export interface RemoveUserAction {
  type: typeof AUTH_REMOVE_USER;
}

export interface RemoveUserAction {
  type: typeof AUTH_REMOVE_USER;
}

export interface AddFollowerUserAction {
  type: typeof USER_ADD_FOLLOWER;
  payload: {
    userToFollowId: string;
  };
}

export interface RemoveFollowerUserAction {
  type: typeof USER_REMOVE_FOLLOWER;
  payload: {
    userToUnfollowId: string;
  };
}

export type AuthActions =
  | AuthenticateAction
  | DeauthenticateAction
  | UpdateUserAction
  | RemoveUserAction
  | AddFollowerUserAction
  | RemoveFollowerUserAction;
