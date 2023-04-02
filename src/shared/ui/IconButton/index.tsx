import React from 'react';

import { StyledButton } from './styles';

import type { IconButtonProps } from './styles';

export type { IconButtonProps } from './styles';

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, component, href, target, ...buttonProps }, ref) => (
    <StyledButton
      as={component}
      ref={ref}
      tabIndex={0}
      type="button"
      {...(component === 'a' && { href, target })}
      {...buttonProps}
    >
      {children}
    </StyledButton>
  ),
);
