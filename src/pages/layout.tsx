import { FC, PropsWithChildren } from 'react';

import { Header } from '~/widgets/header';

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Header />
    <div className={'container py-8'}>{children}</div>
  </>
);
