import { LogtoConfig } from '@logto/react';

import { API_URL } from './api';

export const logtoConfig: LogtoConfig = {
  endpoint: import.meta.env.VITE_LOGTO_ENDPOINT,
  appId: import.meta.env.VITE_LOGTO_APP_ID,
  resources: [API_URL],
  // scopes: Object.values(Scope),
};
