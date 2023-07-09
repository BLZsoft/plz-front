import { FC, PropsWithChildren } from 'react';

import { Layout } from '~/pages/layout';

import { ProfileUpdateForm, ProfileUpdateFormSkeleton, UpdateProfileFormValues } from '~/features/profile/update';
import { ProfileUpdateAvatar } from '~/features/profile/update-avatar';

export const ProfilePageLayout: FC<PropsWithChildren> = ({ children }) => (
  <Layout>
    <div className={'grid grid-cols-1 gap-8 md:grid-cols-3 xl:grid-cols-4'}>{children}</div>
  </Layout>
);

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
