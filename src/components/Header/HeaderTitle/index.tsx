import React, { FC } from 'react';

import Title from 'antd/es/typography/Title';
import styled from 'styled-components';

export const HeaderTitle: FC = () => {
  return (
    <StyledHeaderTitle>
      <Title level={3}>Объекты</Title>
    </StyledHeaderTitle>
  );
};

const StyledHeaderTitle = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;

  & > h3 {
    margin-bottom: 0;
    margin-top: 0;
  }
`;
