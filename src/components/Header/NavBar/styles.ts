import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

export const NavMenuItem = styled(NavLink)`
  & > svg {
    transition: all 0.3s;
  }
`;
