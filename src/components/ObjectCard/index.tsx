import React, { FC } from 'react';

import { NavBar } from 'components/Footer/NavBar';

import { StyledFooterWrapper, StyledFooterContent, ToolBar } from './ui';

export const ObjectCard: FC<{ disabled: boolean }> = ({ disabled }) => {
  return (
    <StyledFooterWrapper disabled={disabled}>
      <StyledFooterContent>
        <ToolBar size="large">
          <NavBar />
        </ToolBar>
      </StyledFooterContent>
    </StyledFooterWrapper>
  );
};
