import { createEffect, sample } from 'effector';
import { z } from 'zod';

import { organizationMembersModel } from '~/entities/organization-members';

import { MemberData, organizationsApi } from '~/shared/api/organizations';
import { formatPhone } from '~/shared/lib/utils';

export const formSchema = z.object({
  phone: z.string(),
});

export type FormValues = z.infer<typeof formSchema>;

export const defaultValues: FormValues = {
  phone: '',
};

export const inviteMemberFx = createEffect<{ phone: string; organizationId: string }, MemberData>(
  ({ phone, organizationId }) => {
    const normalizedPhone = formatPhone(phone);

    return organizationsApi.inviteMember(organizationId, normalizedPhone);
  },
);

sample({
  clock: inviteMemberFx.doneData,
  source: organizationMembersModel.$members,
  fn: (state, payload) => [...(state ? state : []), payload],
  target: organizationMembersModel.$members,
});
