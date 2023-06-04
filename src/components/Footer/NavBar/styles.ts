import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

export const NavMenuItem = styled(NavLink)`
  color: #fff;
  & > svg {
    transition: all 0.3s;
  }
  &:hover {
    color: #fff;
    opacity: 0.8;
  }
`;

export const StyledNav = styled.nav`
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  column-gap: 32px;
  margin: 0 auto;
`;
