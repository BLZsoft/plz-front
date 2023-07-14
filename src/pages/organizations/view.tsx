import { FC } from 'react';

import { Organization } from '~/shared/api/organizations';

type Props = {
  data: Organization[];
};

export const OrganizationsPageView: FC<Props> = () => (
  <>
    <h1>Организации</h1>
  </>
);

export const OrganizationsPageLoader = () => <h1>Загрузка...</h1>;
