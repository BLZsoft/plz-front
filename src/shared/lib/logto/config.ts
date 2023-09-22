import { LogtoConfig } from '@logto/browser';

const LOGTO_ENDPOINT = import.meta.env.VITE_LOGTO_ENDPOINT;
const LOGTO_APP_ID = import.meta.env.VITE_LOGTO_APP_ID;

export enum LogtoResource {
  Supabase = 'https://supabase.пожликбез.рф',
}

export enum LogtoScope {
  Email = 'email',
  Phone = 'phone',
}

export const logtoConfig: LogtoConfig = {
  endpoint: LOGTO_ENDPOINT,
  appId: LOGTO_APP_ID,
  resources: Object.values(LogtoResource),
  scopes: Object.values(LogtoScope),
};
