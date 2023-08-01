import { FC } from 'react';

import { Link } from 'atomic-router-react';
import { clsx } from 'clsx';

import { routes } from '~/shared/lib/router';

type Props = {
  id: string;
  name: string;
  isActive?: boolean;
};

export const OrganizationsSidebarItem: FC<Props> = ({ id, name, isActive }) => {
  return (
    <Link
      to={routes.organizations.details}
      params={{ organizationId: id }}
      className={clsx(
        'block w-full p-4 text-left transition-colors hover:bg-red-600 hover:text-white',
        isActive && 'bg-red-500 text-white',
      )}
    >
      {name}
    </Link>
  );
};
