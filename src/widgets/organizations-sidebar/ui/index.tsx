import { FC } from 'react';

import { clsx } from 'clsx';
import { useStore } from 'effector-react';

import { Organization } from '~/shared/api/organizations';
import { routes } from '~/shared/lib/router';
import { Separator } from '~/shared/ui/separator';

import { OrganizationsSidebarCreate } from './create-button';
import { OrganizationsSidebarItem } from './item';

type Props = {
  organizations: Organization[];
  className?: string;
};

export const OrganizationsSidebar: FC<Props> = ({ organizations, className }) => {
  const isOrganizationOpened = useStore(routes.organizations.details.$isOpened);
  const { organizationId: selectedOrganizationId } = useStore(routes.organizations.details.$params);

  return (
    <aside className={clsx('col-span-1 border-zinc-200 md:col-span-1 md:border-r', className)}>
      <OrganizationsSidebarCreate />

      <Separator className={'my-4'} />

      {organizations.map(({ id, name }) => (
        <OrganizationsSidebarItem
          id={id}
          name={name}
          key={id}
          isActive={isOrganizationOpened && id === selectedOrganizationId}
        />
      ))}
    </aside>
  );
};
