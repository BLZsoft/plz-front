import { createEffect, createStore, sample } from 'effector';

import { MemberData, Membership, organizationsApi } from '~/shared/api/organizations';
import { usersApi } from '~/shared/api/users';

export const requestMembershipsFx = createEffect<string, Membership[]>((organizationId) =>
  organizationsApi.fetchMemberships(organizationId),
);

export const requestMembersDataFx = createEffect<Membership[], MemberData[]>((memberships) =>
  Promise.all(
    memberships.map((m) =>
      usersApi.getUserByFields({ id: m.user_id }).then((r) => ({
        ...r[0],
        role: m.role,
      })),
    ),
  ),
);

sample({
  source: requestMembershipsFx.doneData,
  target: requestMembersDataFx,
});

export const $members = createStore<MemberData[] | null>(null)
  .on(requestMembersDataFx.doneData, (_, payload) => payload)
  .on(requestMembersDataFx.failData, () => null);
