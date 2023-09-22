import { FC } from 'react';

import { RouterProvider } from 'atomic-router-react';

import { router } from '~/shared/lib/router';

export const withRouter = (App: FC): FC => {
  const WithRouter = () => (
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  );

  WithRouter.displayName = 'WithRouter';

  return WithRouter;
};
