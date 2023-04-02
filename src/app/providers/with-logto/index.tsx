import { FC } from 'react';

import { LogtoProvider } from '@logto/react';
import { logtoConfig } from 'shared/config/logto';

export const withLogto = (App: FC) => {
  console.log(logtoConfig);
  const WithProvider = (props: Record<string, unknown>) => {
    return (
      <LogtoProvider config={logtoConfig}>
        <App {...props} />
      </LogtoProvider>
    );
  };

  WithProvider.displayName = 'WithLogtoProvider';

  return WithProvider;
};
