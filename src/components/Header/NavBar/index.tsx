import type { FC } from 'react';
import React from 'react';

import { ManageAccounts } from '@styled-icons/material/ManageAccounts';
import { TooltipCustom } from 'shared/ui/TooltipCustom';
import styled from 'styled-components';

import { NavMenuItem } from './styles';

export const NavBar: FC = () => {
  return (
    <StyledNav>
      <TooltipCustom key={'Партнеры'} placement="bottom" title={'Партнеры'}>
        <NavMenuItem to="/partners">
          <ManageAccounts height={40} width={40} />
        </NavMenuItem>
      </TooltipCustom>
    </StyledNav>
  );
};

export const StyledNav = styled.nav`
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  column-gap: 32px;
`;
