import React, { FC } from 'react';

import { NavBar } from 'components/Header/NavBar';

import { LogoLink } from './LogoLink';
import { StyledHeaderWrapper, StyledHeaderContent, ToolBar } from './ui';
import { UserTools } from './UserTools';

export const Header: FC<{ disabled: boolean }> = ({ disabled }) => {
  return (
    <StyledHeaderWrapper disabled={disabled}>
      <StyledHeaderContent>
        <ToolBar size="large">
          <LogoLink />
          <NavBar />
          <UserTools />
        </ToolBar>
      </StyledHeaderContent>
    </StyledHeaderWrapper>
  );
};
