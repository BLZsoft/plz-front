import { FC } from 'react';

import { CreditCard, LogOut, User } from 'lucide-react';

import { ViewerAvatar } from '~/entities/viewer';

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
  onProfile: () => void;
};

export const ProfileMenuView: FC<Props> = ({ onSignOut, onProfile }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className={'h-12 w-12'}>
        <ViewerAvatar />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent className="w-56" align={'end'}>
      <DropdownMenuLabel>Мой профиль</DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuItem onClick={onProfile}>
        <User className="mr-2 h-4 w-4" />
        <span>Профиль</span>
      </DropdownMenuItem>

      <DropdownMenuItem>
        <CreditCard className="mr-2 h-4 w-4" />
        <span>Оплата</span>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem onClick={onSignOut}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Выйти</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
