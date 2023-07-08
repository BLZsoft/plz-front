import { FC, StrictMode } from 'react';

export const withStrictMode = (App: FC) => {
  const WithStrictMode = () => (
    <StrictMode>
      <App />
    </StrictMode>
  );

  WithStrictMode.displayName = 'WithStrictMode';

  return WithStrictMode;
};
