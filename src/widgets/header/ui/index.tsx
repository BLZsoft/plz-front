import { FC } from 'react';

import { SignInButton } from '~/features/authn/sign-in';
import { SignOutButton } from '~/features/authn/sign-out';

import { viewerModel } from '~/entities/viewer';

export type HeaderViewProps = { viewer: viewerModel.Viewer; isAuthenticated: boolean };

export const HeaderView: FC<HeaderViewProps> = ({ viewer, isAuthenticated }) => {
  const authenticatedLayout = (
    <>
      <div>
        Hello, <b>{viewer?.username}</b>
      </div>
      <SignOutButton>Выйти</SignOutButton>
    </>
  );

  return <header>{isAuthenticated ? authenticatedLayout : <SignInButton>Войти</SignInButton>}</header>;
};
