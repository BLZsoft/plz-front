import React, { useContext } from 'react';

import { DefaultApi } from 'services/api';

export const ApiContext = React.createContext<DefaultApi | null>(null);

export const useApi = (): DefaultApi => {
  return useContext(ApiContext)!;
};
