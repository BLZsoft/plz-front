import React, { FC } from 'react';

import { useUserInfo } from 'app/providers/with-user-info';
import { useToggle } from 'shared/hooks/useToggle';

import { UserToolsWrapper } from './styles';
import { UserInfoDropdown } from './ui/UserInfoDropdown';
import { UserInfoModal } from './ui/UserInfoModal';

export const UserTools: FC = () => {
  const { userData } = useUserInfo();

  const [modal, , setModal] = useToggle();

  return (
    <UserToolsWrapper>
      <UserInfoModal open={modal} setOpen={setModal} />
      <UserInfoDropdown avatar={userData?.picture} shortName={userData?.name} setModal={setModal} />
    </UserToolsWrapper>
  );
};
