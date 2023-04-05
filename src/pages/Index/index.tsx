import React, { useEffect } from 'react';

import { Navigate } from 'react-router-dom';

import { useLogto } from '@logto/react';
import { commonConfig } from 'shared/config/common';

import { partnersPaths } from '../Partners/routes';

const Index = () => {
  const { isAuthenticated, signIn, isLoading } = useLogto();

  useEffect(() => {
    if (!isAuthenticated) {
      signIn(commonConfig.baseUrl + '/callback');
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return <Navigate to={partnersPaths.list} />;
};

export default Index;
