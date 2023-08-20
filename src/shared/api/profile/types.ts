import { UserInfoResponse } from '@logto/browser';

import { Nullable } from '~/shared/lib/utils';

export type Profile = UserInfoResponse;

// https://docs.logto.io/api/#tag/Users/paths/~1api~1users~1:userId/patch
export type UpdateProfileDto = {
  username?: string;
  primaryEmail?: string;
  primaryPhone?: string;
  name?: string;
  avatar?: string;
};

export type UserData = {
  id: string;
  username: Nullable<string>;
  primaryEmail: Nullable<string>;
  primaryPhone: Nullable<string>;
  name: Nullable<string>;
  avatar: Nullable<string>;
  customData: Record<string, unknown>;
  identities: Record<string, { userId: string; details: Record<string, unknown> }>;
  lastSignInAt: Nullable<number>;
  createdAt: number;
  applicationId: Nullable<string>;
  isSuspended: boolean;
  hasPassword: boolean;
};
