import { FC } from 'react';

import { Link } from 'atomic-router-react';
import { CreditCard, LogOut, User, Users } from 'lucide-react';

import { ViewerAvatar } from '~/entities/viewer';

import { routes } from '~/shared/lib/router';
import { Button } from '~/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/shared/ui/dropdown-menu';

type Props = {
  onSignOut: () => void;
};

export const ProfileMenuView: FC<Props> = ({ onSignOut }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className={'h-12 w-12'}>
        <ViewerAvatar />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent className="w-56" align={'end'}>
      <DropdownMenuLabel>Мой профиль</DropdownMenuLabel>

      <DropdownMenuSeparator />

      <Link to={routes.profile}>
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Профиль</span>
        </DropdownMenuItem>
      </Link>

      <DropdownMenuItem>
        <CreditCard className="mr-2 h-4 w-4" />
        <span>Оплата</span>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <Link to={routes.organizations.home}>
        <DropdownMenuItem>
          <Users className="mr-2 h-4 w-4" />
          <span>Организации</span>
        </DropdownMenuItem>
      </Link>

      <DropdownMenuSeparator />

      <DropdownMenuItem onClick={onSignOut}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Выйти</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
