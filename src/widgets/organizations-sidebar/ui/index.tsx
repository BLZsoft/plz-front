import { FC } from 'react';

import { clsx } from 'clsx';
import { useStore } from 'effector-react';
import { Plus } from 'lucide-react';

import { Organization } from '~/shared/api/organizations';
import { routes } from '~/shared/lib/router';
import { Separator } from '~/shared/ui/separator';

import { OrganizationsSidebarItem } from './item';

type Props = {
  organizations: Organization[];
  className?: string;
};

export const OrganizationsSidebar: FC<Props> = ({ organizations, className }) => {
  const createRouteOpened = useStore(routes.organizations.create.$isOpened);
  const detailsRouteOpened = useStore(routes.organizations.details.$isOpened);

  const { organizationId: selectedOrganizationId } = useStore(routes.organizations.details.$params);

  return (
    <aside className={clsx('col-span-1 border-zinc-200 md:col-span-1 md:border-r', className)}>
      <OrganizationsSidebarItem
        to={routes.organizations.create}
        className={'font-semibold'}
        isActive={createRouteOpened}
      >
        <Plus className="mr-2 h-4 w-4" /> Создать организацию
      </OrganizationsSidebarItem>

      <Separator className={'my-4'} />

      {organizations.map(({ id, name }) => (
        <OrganizationsSidebarItem
          key={id}
          to={routes.organizations.details}
          params={{ organizationId: id }}
          isActive={detailsRouteOpened && id === selectedOrganizationId}
        >
          {name}
        </OrganizationsSidebarItem>
      ))}
    </aside>
  );
};
