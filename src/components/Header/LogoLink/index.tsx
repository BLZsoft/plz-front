import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

import logoPath from 'shared/assets/logo.svg';

export const LogoLink: FC = () => {
  return (
    <StyledLogoLink to={'/objects'}>
      <img src={logoPath} alt="Logo" />
    </StyledLogoLink>
  );
};

const StyledLogoLink = styled(NavLink)`
  display: flex;
  flex-shrink: 0;
  height: 40px;
  justify-content: center;
`;
