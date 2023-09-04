import { ComponentProps, forwardRef } from 'react';

import { useUnit } from 'effector-react';

import { Button } from '~/shared/ui/button';

import { FormValues, inviteMemberFx } from '../model';

import { InviteMemberPopup } from './popup';

export interface InviteMemberButtonProps extends ComponentProps<typeof Button> {
  organizationId: string;
}

export const InviteMemberButton = forwardRef<HTMLButtonElement, InviteMemberButtonProps>(
  ({ organizationId, ...props }, ref) => {
    const invite = useUnit(inviteMemberFx);

    const onSubmit = ({ phone }: FormValues) => {
      invite({ organizationId, phone });
    };

    return (
      <InviteMemberPopup onSubmit={onSubmit}>
        <Button ref={ref} {...props} />
      </InviteMemberPopup>
    );
  },
);
