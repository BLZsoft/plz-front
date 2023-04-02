import { FC, StrictMode } from 'react';

export const withStrictMode = (App: FC) => {
  const WithProvider = (props: Record<string, unknown>) => (
    <StrictMode>
      <App {...props} />
    </StrictMode>
  );

  WithProvider.displayName = 'WithStrictMode';

  return WithProvider;
};
