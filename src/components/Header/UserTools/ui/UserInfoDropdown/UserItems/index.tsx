import { Link } from 'react-router-dom';

import { Logout, Edit } from '@styled-icons/material';
import { useUserInfo } from 'app/providers/with-user-info';
import { profilePaths } from 'pages/Profile/routes';

import { MenuItem } from './MenuItem';

export function UserItems() {
  const { signOut } = useUserInfo();

  return (
    <>
      <Link to={profilePaths.index}>
        <MenuItem title={'Редактировать'} icon={<Edit height={24} width={24} />} />
      </Link>
      <MenuItem title={'Выйти'} icon={<Logout height={24} width={24} color="red" />} onClick={signOut} />
    </>
  );
}
