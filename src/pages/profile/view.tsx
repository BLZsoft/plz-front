import { FC } from 'react';

import { ProfileUpdateForm, ProfileUpdateFormSkeleton, UpdateProfileFormValues } from '~/features/profile/update';
import { ProfileUpdateAvatar } from '~/features/profile/update-avatar';

type Props = {
  defaultValues: UpdateProfileFormValues;
};

export const ProfilePageView: FC<Props> = ({ defaultValues }) => (
  <>
    <ProfileUpdateAvatar />
    <ProfileUpdateForm className={'col-span-1 md:col-span-2 xl:col-span-3'} defaultValues={defaultValues} />
  </>
);

export const ProfilePageLoader = () => (
  <>
    <ProfileUpdateAvatar />
    <ProfileUpdateFormSkeleton className={'col-span-1 md:col-span-2 xl:col-span-3'} />
  </>
);
