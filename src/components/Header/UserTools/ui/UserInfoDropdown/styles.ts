import styled from 'styled-components';

export const UserInfoContainer = styled.div`
  height: 40px;
  display: flex;
  width: 100%;
  align-items: center;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
`;

export const DefaultOverlay = styled.div`
  width: 323px;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  //FIXME to pallet
  background-color: #ffffff;
  box-shadow: 0 4px 24px rgba(3, 8, 25, 0.1);
`;

export const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  column-gap: 14px;
  width: 100%;
  justify-content: left;
  padding: 0 18px;
  align-items: center;
  overflow: hidden;

  border-radius: 8px;
`;
