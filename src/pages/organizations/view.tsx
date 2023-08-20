import { FC } from 'react';

import { clsx } from 'clsx';
import { useStore } from 'effector-react';

import { OrganizationsSidebar } from '~/widgets/organizations-sidebar';

import { Organization } from '~/shared/api/organizations';
import { routes } from '~/shared/lib/router';

type Props = {
  data: Organization[];
  ChildRoutes: FC;
};

export const OrganizationsPageView: FC<Props> = ({ data, ChildRoutes }) => {
  const isHomePage = useStore(routes.organizations.home.$isOpened);

  return (
    <>
      <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3'}>
        <OrganizationsSidebar organizations={data} className={clsx(!isHomePage && 'hidden md:block')} />

        <main
          className={clsx(
            'col-span-1 min-h-[600px] space-y-2 p-0 md:space-y-4 md:p-4 xl:col-span-2',
            isHomePage && 'hidden md:block',
          )}
        >
          <ChildRoutes />
        </main>
      </div>
    </>
  );
};

export const OrganizationsPageLoader = () => <h1>Загрузка...</h1>;
