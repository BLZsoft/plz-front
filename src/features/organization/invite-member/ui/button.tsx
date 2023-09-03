import { ComponentProps, forwardRef } from 'react';

import { Button } from '~/shared/ui/button';

import { InviteMemberPopup } from './popup';

export interface InviteMemberButtonProps extends ComponentProps<typeof Button> {
  organizationId: string;
}

export const InviteMemberButton = forwardRef<HTMLButtonElement, InviteMemberButtonProps>(
  ({ organizationId, ...props }, ref) => (
    <InviteMemberPopup>
      <Button ref={ref} {...props} />
    </InviteMemberPopup>
  ),
);
