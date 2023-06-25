import React from 'react';

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
};

export const UserInfoDropdown: React.VFC<UserInfoDropdownProps> = (props) => {
  const { avatar, shortName, avatarSize = 40 } = props;

  return (
    <UserInfoContainer>
      <StyledDropdown
        placement="bottomRight"
        overlay={
          <DefaultOverlay>
            <StyledTitleContainer>
              <Avatar key={Date.now()} size={avatarSize} src={avatar} />
              <Title variant="h6" weight="semibold">
                {shortName}
              </Title>
            </StyledTitleContainer>
            <UserItems />
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
