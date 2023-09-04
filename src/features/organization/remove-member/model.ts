import { createEffect } from 'effector';

import { organizationMembersModel } from '~/entities/organization-members';

import { organizationsApi } from '~/shared/api/organizations';

export const removeMemberFx = createEffect(
  ({ organizationId, memberId }: { organizationId: string; memberId: string }) =>
    organizationsApi.removeMember(organizationId, memberId),
);

organizationMembersModel.$members.on(removeMemberFx.doneData, (store, data) => store?.filter((m) => m.id !== data));
