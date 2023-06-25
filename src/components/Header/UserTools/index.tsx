import React, { FC } from 'react';

import { useUserInfo } from 'app/providers/with-user-info';

import { UserToolsWrapper } from './styles';
import { UserInfoDropdown } from './ui/UserInfoDropdown';

export const UserTools: FC = () => {
  const { userData } = useUserInfo();

  return (
    <UserToolsWrapper>
      <UserInfoDropdown avatar={userData?.picture} shortName={userData?.name} />
    </UserToolsWrapper>
  );
};
