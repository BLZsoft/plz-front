import type React from 'react';

import styled from 'styled-components';

export const StyledHeaderWrapper = styled.header<{ disabled: boolean }>`
  position: fixed;
  display: ${({ disabled }) => (disabled ? 'none' : 'flex')};
  flex-direction: row;
  top: 0;
  width: 100vw;

  line-height: 100%;
  height: 60px;
  // FIXME to pallet
  background: #ffffff;
  box-shadow: darkgray;
  z-index: 1000;
`;

export const StyledHeaderContent = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
`;

export interface ToolBarProps extends React.ComponentPropsWithRef<'header'> {
  size?: 'normal' | 'large';
}

export const ToolBar = styled.div<ToolBarProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1440px;
  padding-left: 36px;
  padding-right: 36px;
`;
