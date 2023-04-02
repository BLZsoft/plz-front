import type { FC, ReactNode } from 'react';

import { IconButton } from 'shared/ui/IconButton';
import styled from 'styled-components';

type Props = {
  title: string;
  icon: ReactNode;
  onClick: () => void;
};
export const MenuItem: FC<Props> = ({ icon, onClick, title }) => {
  return (
    <StyledOverlayItem onClick={onClick}>
      <IconButton children={icon} />
      {title}
    </StyledOverlayItem>
  );
};

export const StyledOverlayItem = styled.div`
  display: inline-flex;
  flex-direction: row;
  height: 48px;
  column-gap: 14px;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 18px;
  width: calc(100% - 18px);
  align-items: center;

  cursor: pointer;

  border-radius: 8px;

  :hover {
    //FIXME to pallet
    background-color: lightblue;
  }

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`;
