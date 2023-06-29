import LogtoClient from '@logto/browser';

import { logtoConfig } from '~/shared/config/logto';

export enum LOGTO_RESOURCES {
  Supabase = 'https://supabase.пожликбез.рф',
}

export enum LOGTO_SCOPES {
  Email = 'email',
  Phone = 'phone',
}

export const logtoClient = new LogtoClient({
  ...logtoConfig,
  resources: Object.values(LOGTO_RESOURCES),
  scopes: Object.values(LOGTO_SCOPES),
});
