import flowRight from 'lodash/flowRight';

import { withApi } from './with-api';
import { withLogto } from './with-logto';
import { withStrictMode } from './with-strict-mode';
import { withThemeConfig } from './with-theme-config';
import { withUserInfo } from './with-user-info';

export const withProviders = flowRight(withStrictMode, withLogto, withUserInfo, withApi, withThemeConfig);
