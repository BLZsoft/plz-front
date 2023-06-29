import LogtoClient from '@logto/browser';

import { logtoConfig } from '~/shared/config/logto';

export const logtoClient = new LogtoClient(logtoConfig);
