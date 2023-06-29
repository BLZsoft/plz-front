import compose from 'compose-function';

import { withRouter } from './with-router.tsx';
import { withStrictMode } from './with-strict-mode.tsx';

export const withProviders = compose(withStrictMode, withRouter);
