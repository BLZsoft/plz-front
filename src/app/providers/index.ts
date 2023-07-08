import compose from 'compose-function';

import { withRouter } from './with-router';
import { withStrictMode } from './with-strict-mode';

export const withProviders = compose(withStrictMode, withRouter);
