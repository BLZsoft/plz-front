import { useEffect, useState } from 'react';

import { useLogto, UserInfoResponse } from '@logto/react';
import { commonConfig } from 'shared/config/common';

export interface UserInfoService {
  loadUserData: () => void;
  userData: UserInfoResponse | undefined;
  signOut: () => void;
}

export const useUserInfoService = () => {
  const { fetchUserInfo, isAuthenticated, signOut: logtoSignOut } = useLogto();
  const [userData, setUserData] = useState<UserInfoResponse | undefined>();

  useEffect(() => {
    if (isAuthenticated) {
      loadUserData();
    }
  }, [isAuthenticated]);

  const loadUserData = () => {
    fetchUserInfo().then((data) => {
      setUserData(data);
    });
  };

  return { userData, loadUserData, signOut: () => logtoSignOut(commonConfig.baseUrl) };
};
