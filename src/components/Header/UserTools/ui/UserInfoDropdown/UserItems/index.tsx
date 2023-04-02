import { Logout } from '@styled-icons/material';
import { useUserInfo } from 'app/providers/with-user-info';

import { MenuItem } from './MenuItem';

export function UserItems() {
  const { signOut } = useUserInfo();

  return (
    <>
      <MenuItem title={'Выйти'} icon={<Logout height={24} width={24} color="red" />} onClick={signOut} />
    </>
  );
}
