import React, { useCallback, useMemo } from 'react';

import { useLogto } from '@logto/react';
import { Configuration, DefaultApi } from 'services/api';
import { Resources } from 'shared/config/logto';
import { ApiContext } from 'shared/hooks/useApi';

export function withApi(WrappedComponent: React.ComponentType) {
  function WithApi() {
    const { getAccessToken, signOut } = useLogto();

    const tokenIssuer = useCallback(async () => {
      try {
        return getAccessToken(Resources.API);
      } catch (e) {
        await signOut();
      }
    }, [getAccessToken]);

    const api = useMemo(() => {
      const configuration = new Configuration({
        //@ts-expect-error skip
        accessToken: tokenIssuer,
      });

      return new DefaultApi(configuration);
    }, [tokenIssuer]);

    return (
      <ApiContext.Provider value={api}>
        <WrappedComponent />
      </ApiContext.Provider>
    );
  }

  WithApi.displayName = 'WithApi';
  return WithApi;
}
