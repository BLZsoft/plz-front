import type { FC, ReactNode } from 'react';

import { StyledContent, StyledWrapper } from './styles';

export const Layout: FC<{ disabled: boolean; children: ReactNode }> = ({ children, disabled }) => {
  if (disabled) return <main>{children}</main>;

  return (
    <StyledWrapper>
      <StyledContent>{children}</StyledContent>
    </StyledWrapper>
  );
};
