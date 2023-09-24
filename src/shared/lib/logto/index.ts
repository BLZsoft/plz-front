import LogtoClient from '@logto/browser';

import { logtoConfig } from './config';

/**
 * @deprecated use $logtoClient instead
 */
export const logtoClient = new LogtoClient(logtoConfig);

export { chainLogtoClient } from './chain';
export { $logtoClient, fetchResourceTokenFx } from './logto';

export { LogtoResource } from './config';
