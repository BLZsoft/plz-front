import { FC, PropsWithChildren } from 'react';

import { Layout } from '~/pages/layout';

export const ProfilePageLayout: FC<PropsWithChildren> = ({ children }) => (
  <Layout>
    <div className={'grid grid-cols-1 gap-8 md:grid-cols-3 xl:grid-cols-4'}>{children}</div>
  </Layout>
);
