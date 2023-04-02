import type React from 'react';

import styled, { css } from 'styled-components';

export interface TitleProps extends React.HTMLAttributes<HTMLSpanElement> {
  readonly variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  readonly component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  readonly weight?: 'bold' | 'semibold' | 'medium';
}

export const headingStyles = {
  h1: css`
    font-size: 36px;
    font-style: normal;
    line-height: 48px;
  `,
  h2: css`
    font-size: 28px;
    font-style: normal;
    line-height: 36px;
  `,
  h3: css`
    font-size: 24px;
    font-style: normal;
    line-height: 32px;
  `,
  h4: css`
    font-size: 20px;
    font-style: normal;
    line-height: 28px;
  `,
  h5: css`
    font-size: 16px;
    line-height: 24px;
    font-style: normal;
  `,
  h6: css`
    font-size: 14px;
    font-style: normal;
    line-height: 1.6;
  `,
};

export const weightStyles = {
  bold: css`
    font-weight: 700;
  `,
  semibold: css`
    font-weight: 600;
  `,
  medium: css`
    font-weight: 500;
  `,
};

export const StyledTitleRoot = styled.span<TitleProps>`
  margin: 0;
  ${({ variant }) => headingStyles[variant]}
  ${({ weight = 'medium' }) => weightStyles[weight]}
   color: ${({ color }) => color ?? 'main'}
`;
