import { FC } from 'react';

import { Scope } from 'effector';
import { Provider } from 'effector-react';

export type WithScopeProps = {
  scope: Scope;
};

export const withScope = (App: FC): FC<WithScopeProps> => {
  const WithScope: FC<WithScopeProps> = ({ scope }) => (
    <Provider value={scope}>
      <App />
    </Provider>
  );

  WithScope.displayName = 'WithScope';

  return WithScope;
};
