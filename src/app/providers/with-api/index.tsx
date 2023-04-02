import React, { useContext } from 'react';

import { useLogto } from '@logto/react';
import { Api } from 'services/api/apiAdapter';

const ApiContext = React.createContext<Api | null>(null);

export const useApi = () => {
  return useContext(ApiContext)!;
};

export function withApi(WrappedComponent: React.ComponentType) {
  function WithApi() {
    const { getAccessToken } = useLogto();
    const api = new Api(getAccessToken);

    return (
      <ApiContext.Provider value={api}>
        <WrappedComponent />
      </ApiContext.Provider>
    );
  }
  WithApi.displayName = 'WithApi';
  return WithApi;
}
