import { Link } from 'atomic-router-react';

import { OrganizationSelectActive } from '~/features/organization/select-active';

import Logo from '~/shared/assets/logo.svg';
import { routes } from '~/shared/lib/router';

import { ProfileMenu } from './ui/profile-menu';

export const Header = () => (
  <header className={'sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur'}>
    <div className={'container flex h-16 items-center justify-between'}>
      <div className={'flex items-center space-x-4 sm:space-x-8'}>
        <Link className={'flex items-center space-x-2 text-lg font-bold'} to={routes.home}>
          <img src={Logo} alt={'Логотип'} className={'h-10'} />
          <span className={'hidden sm:inline-block'}>Пожликбез</span>
        </Link>

        <OrganizationSelectActive />
      </div>

      <div className={'flex h-full items-center space-x-2'}>
        <ProfileMenu />
      </div>
    </div>
  </header>
);
