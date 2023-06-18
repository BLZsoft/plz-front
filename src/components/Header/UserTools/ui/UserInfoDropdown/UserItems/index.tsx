import { Dispatch } from 'react';

import { Logout, Edit } from '@styled-icons/material';
import { useUserInfo } from 'app/providers/with-user-info';

import { MenuItem } from './MenuItem';

type Props = {
  setModal: Dispatch<boolean>;
};

export function UserItems({ setModal }: Props) {
  const { signOut } = useUserInfo();

  return (
    <>
      <MenuItem title={'Редактировать'} icon={<Edit height={24} width={24} />} onClick={() => setModal(true)} />
      <MenuItem title={'Выйти'} icon={<Logout height={24} width={24} color="red" />} onClick={signOut} />
    </>
  );
}
