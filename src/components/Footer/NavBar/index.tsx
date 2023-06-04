import type { FC } from 'react';
import React from 'react';

import { Buildings } from '@styled-icons/boxicons-regular/Buildings';
import { Quiz, Summarize, Calculate } from '@styled-icons/material';
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
      <TooltipCustom key={'Калькуляторы'} placement="bottom" title={'Калькуляторы'}>
        <NavMenuItem to="/calculators">
          <Calculate height={40} width={40} />
        </NavMenuItem>
      </TooltipCustom>
      <TooltipCustom key={'Аудит'} placement="bottom" title={'Аудит'}>
        <NavMenuItem to="/audit">
          <Quiz height={40} width={40} />
        </NavMenuItem>
      </TooltipCustom>
      <TooltipCustom key={'Документы'} placement="bottom" title={'Документы'}>
        <NavMenuItem to="/audit">
          <Summarize height={40} width={40} />
        </NavMenuItem>
      </TooltipCustom>
    </StyledNav>
  );
};
