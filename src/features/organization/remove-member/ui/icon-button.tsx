import { ComponentProps, forwardRef } from 'react';

import { useUnit } from 'effector-react';
import { Trash } from 'lucide-react';

import { cn } from '~/shared/lib/utils';
import { Button } from '~/shared/ui/button';

import { removeMemberFx } from '../model';

export type RemoveMemberIconButtonProps = ComponentProps<typeof Button> & {
  onRemove?: (success: boolean) => void;
  organizationId: string;
  memberId: string;
};

export const RemoveMemberIconButton = forwardRef<HTMLButtonElement, RemoveMemberIconButtonProps>(
  (
    {
      organizationId,
      memberId,
      onRemove,
      className,
      variant = 'ghost',
      size = 'icon',
      children = <Trash className="h-4 w-4" />,
      ...props
    },
    ref,
  ) => {
    // "noop" analogue
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const callback = onRemove ?? (() => {});

    const removeMember = useUnit(removeMemberFx);

    const onClick = () => {
      removeMember({ organizationId, memberId })
        .then(() => callback(true))
        .catch(() => callback(false));
    };

    return (
      <Button
        onClick={onClick}
        className={cn('text-red-500 hover:bg-red-100 hover:text-red-500', className)}
        variant={variant}
        size={size}
        children={children}
        ref={ref}
        {...props}
      />
    );
  },
);
