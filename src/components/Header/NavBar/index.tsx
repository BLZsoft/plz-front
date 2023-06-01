import type { FC } from 'react';
import React from 'react';

import { ManageAccounts } from '@styled-icons/material/ManageAccounts';
import { ReceiptLong } from '@styled-icons/material/ReceiptLong';
import { TooltipCustom } from 'shared/ui/TooltipCustom';
import styled from 'styled-components';

import { NavMenuItem } from './styles';

export const NavBar: FC = () => {
  return (
    <StyledNav>
      <TooltipCustom key={'Объекты'} placement="bottom" title={'Объекты'}>
        <NavMenuItem to="/partners">
          <ManageAccounts height={40} width={40} />
        </NavMenuItem>
      </TooltipCustom>
      <TooltipCustom key={'Объекты'} placement="bottom" title={'Объекты'}>
        <NavMenuItem to="/partners">
          <ReceiptLong height={40} width={40} />
        </NavMenuItem>
      </TooltipCustom>
      <TooltipCustom key={'Объекты'} placement="bottom" title={'Объекты'}>
        <NavMenuItem to="/partners">
          <ManageAccounts height={40} width={40} />
        </NavMenuItem>
      </TooltipCustom>
      <TooltipCustom key={'Объекты'} placement="bottom" title={'Объекты'}>
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
