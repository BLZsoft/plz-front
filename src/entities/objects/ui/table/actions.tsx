import { FC } from 'react';

import type { Row } from '@tanstack/react-table';
import { Link } from 'atomic-router-react';
import { MoreHorizontal } from 'lucide-react';

import type { Object } from '~/shared/api/objects';
import { routes } from '~/shared/router';
import { Button } from '~/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '~/shared/ui/dropdown-menu';

export type RowActionsProps = {
  row: Row<Object>;
};

export const RowActions: FC<RowActionsProps> = ({ row }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem>Журналы</DropdownMenuItem>
      <DropdownMenuItem>Калькуляторы</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link to={routes.objects.edit} params={{ objectId: row.id }}>
          Редактировать объект
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>Удалить объект</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
