import type { Context } from 'react';
import React, { useContext } from 'react';

import { UserInfoService, useUserInfoService } from './userInfoService';

const UserInfoContext = React.createContext<UserInfoService | null>(null);

export const useUserInfo = (): UserInfoService => {
  return useContext<UserInfoService>(UserInfoContext as Context<UserInfoService>);
};

export function withUserInfo(WrappedComponent: React.ComponentType) {
  function WithUserInfo() {
    const useUserDataService = useUserInfoService();

    return (
      <UserInfoContext.Provider value={useUserDataService}>
        <WrappedComponent />
      </UserInfoContext.Provider>
    );
  }
  WithUserInfo.displayName = 'WithUserInfo';
  return WithUserInfo;
}
