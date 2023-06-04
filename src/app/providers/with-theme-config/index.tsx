import { FC } from 'react';

import { ConfigProvider } from 'antd';
export const withThemeConfig = (App: FC) => {
  const WithProvider = (props: Record<string, unknown>) => {
    return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FF3F3D',
          },
        }}
      >
        <App {...props} />
      </ConfigProvider>
    );
  };

  WithProvider.displayName = 'withThemeConfigProvider';

  return WithProvider;
};
