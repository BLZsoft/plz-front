import React from 'react';

import AntTooltip from 'antd/es/tooltip';
import styled from 'styled-components';

import type { TooltipProps } from 'antd/es/tooltip';

const Tooltip: React.FC<TooltipProps> = ({ className, children, overlay, ...restProps }) => (
  <AntTooltip arrow={{ pointAtCenter: true }} overlay={overlay} overlayClassName={className} {...restProps}>
    {children}
  </AntTooltip>
);

export const TooltipCustom = styled(Tooltip)`
  max-width: 400px !important;

  .ant-tooltip-arrow {
    width: 20px;
    height: 20px;
    left: ${({ placement }) => placement === 'topRight' && '11px'};
  }

  .ant-tooltip-inner {
    border-radius: 8px;
    padding: 8px;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;

    & * {
      //FIXME to pallet
      color: #ffffff;
    }
  }
  .ant-tooltip-arrow-content {
    //FIXME to pallet
    background-color: slategray;
    border-radius: 4px 0 4px 0;
    bottom: -4px;
    width: 15px;
    height: 15px;
  }
`;
