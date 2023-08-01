import { FC } from 'react';

import { Link } from 'atomic-router-react';
import { clsx } from 'clsx';
import { Plus } from 'lucide-react';

import { routes } from '~/shared/lib/router';

type Props = {
  className?: string;
};

export const OrganizationsSidebarCreate: FC<Props> = ({ className }) => (
  <Link
    to={routes.organizations.create}
    className={clsx(
      'flex w-full items-center p-4 text-left font-semibold transition-colors hover:bg-red-600 hover:text-white',
      className,
    )}
  >
    <Plus className="mr-2 h-4 w-4" /> Создать организацию
  </Link>
);
