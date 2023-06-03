import type { FC } from 'react';
import React from 'react';

import { Buildings } from '@styled-icons/boxicons-regular/Buildings';
// import { ReceiptLong } from '@styled-icons/material/ReceiptLong';
import { TooltipCustom } from 'shared/ui/TooltipCustom';

import { NavMenuItem, StyledNav } from './styles';

export const NavBar: FC = () => {
  return (
    <StyledNav>
      <TooltipCustom key={'Объекты'} placement="bottom" title={'Объекты'}>
        <NavMenuItem to="/objects">
          <Buildings height={40} width={40} />
        </NavMenuItem>
      </TooltipCustom>
    </StyledNav>
  );
};
