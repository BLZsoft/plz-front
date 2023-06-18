import { LogtoConfig } from '@logto/react';

export enum Resources {
  API = 'https://пожликбез.рф/api',
}

export enum Scope {
  // https://docs.logto.io/docs/recipes/integrate-logto/react/#fetch-user-information
  Email = 'email',
  Phone = 'phone',

  // Scope для API
  ReadAllObjects = 'read-all:objects',
  WriteAllObjects = 'write-all:objects',
}

export const logtoConfig: LogtoConfig = {
  endpoint: import.meta.env.VITE_LOGTO_ENDPOINT,
  appId: import.meta.env.VITE_LOGTO_APP_ID,
  resources: Object.values(Resources),
  scopes: Object.values(Scope),
};
