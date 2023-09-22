import { FC } from 'react';

import compose from 'compose-function';

import { withRouter } from './with-router';
import { WithScopeProps, withScope } from './with-scope';
import { withStrictMode } from './with-strict-mode';

export const withProviders: (App: FC) => FC<WithScopeProps> = compose(withStrictMode, withScope, withRouter);
