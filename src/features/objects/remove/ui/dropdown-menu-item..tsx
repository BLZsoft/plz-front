import type { FC, MouseEvent } from 'react';

import type { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';
import { useUnit } from 'effector-react/effector-react.mjs';

import { objectsApi } from '~/shared/api/objects';
import { DropdownMenuItem } from '~/shared/ui/dropdown-menu';

export type ObjectsRemoveDropdownMenuItemProps = { id: string } & DropdownMenuItemProps;

export const ObjectsRemoveDropdownMenuItem: FC<ObjectsRemoveDropdownMenuItemProps> = ({
  id,
  children = 'Удалить объект',
  onClick,
  ...props
}) => {
  const onRemoveObject = useUnit(objectsApi.removeMutation.start);

  const _onClick = (event: MouseEvent<HTMLDivElement>) => {
    onRemoveObject({ id });

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <DropdownMenuItem {...props} onClick={_onClick}>
      {children}
    </DropdownMenuItem>
  );
};
