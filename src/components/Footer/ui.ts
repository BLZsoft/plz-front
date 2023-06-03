import type React from 'react';

import styled from 'styled-components';

export const StyledFooterWrapper = styled.header<{ disabled: boolean }>`
  position: fixed;
  display: ${({ disabled }) => (disabled ? 'none' : 'flex')};
  flex-direction: row;
  bottom: 0;
  width: 100vw;
  line-height: 100%;
  height: 60px;
  // FIXME to pallet
  background: #ff3f3d;
  box-shadow: darkgray;
  z-index: 1000;
`;

export const StyledFooterContent = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  border-top: 1px solid gray;
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
