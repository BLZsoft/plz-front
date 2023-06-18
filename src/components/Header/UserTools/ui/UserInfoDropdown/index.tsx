import React, { Dispatch } from 'react';

import { Avatar } from 'antd';
import Dropdown from 'antd/es/dropdown';
import { Title } from 'shared/ui/Title';
import styled from 'styled-components';

import { UserInfoContainer, AvatarWrapper, DefaultOverlay, StyledTitleContainer } from './styles';
import { UserItems } from './UserItems';

type UserInfoDropdownProps = {
  shortName?: string | null;
  avatarSize?: number;
  avatar?: string | null;
  setModal: Dispatch<boolean>;
};

export const UserInfoDropdown: React.VFC<UserInfoDropdownProps> = (props) => {
  const { avatar, shortName, avatarSize = 40, setModal } = props;

  return (
    <UserInfoContainer>
      <StyledDropdown
        placement="bottomRight"
        overlay={
          <DefaultOverlay>
            <StyledTitleContainer>
              <Avatar size={avatarSize} src={avatar} />
              <Title variant="h6" weight="semibold">
                {shortName}
              </Title>
            </StyledTitleContainer>
            <UserItems setModal={setModal} />
          </DefaultOverlay>
        }
      >
        <AvatarWrapper>
          <Avatar size={avatarSize} src={avatar} />
        </AvatarWrapper>
      </StyledDropdown>
    </UserInfoContainer>
  );
};

const StyledDropdown = styled(Dropdown)`
  transition: all 50ms cubic-bezier(0.645, 0.045, 0.355, 1) !important;
`;
