import { FC, PropsWithChildren } from 'react';

import { Header } from '~/widgets/header';

import { Toaster } from '~/shared/ui/toaster';

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Header />
    <div className={'container py-4'}>{children}</div>
    <Toaster />
  </>
);
