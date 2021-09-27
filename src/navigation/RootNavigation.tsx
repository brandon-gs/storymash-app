import React, {useEffect} from 'react';
import AuthStackNavigation from './AuthStackNavigation';
import NoAuthStackNavigation from './NoAuthStackNavigation';
import {useSelector} from 'react-redux';
import axios from 'utils/axios';

const RootNavigation = () => {
  const token = useSelector(state => state.authentication.token);
  const hasAuth = useSelector(state => state.authentication.auth);

  // Config token in axios client
  useEffect(() => {
    axios.defaults.headers.authorization = token;
  }, [token]);

  return hasAuth ? <AuthStackNavigation /> : <NoAuthStackNavigation />;
};

export default RootNavigation;
