import { LogtoConfig } from '@logto/browser';

const LOGTO_ENDPOINT = import.meta.env.VITE_LOGTO_ENDPOINT;

const LOGTO_APP_ID = import.meta.env.VITE_LOGTO_APP_ID;

export const logtoConfig: LogtoConfig = {
  endpoint: LOGTO_ENDPOINT,
  appId: LOGTO_APP_ID,
};
