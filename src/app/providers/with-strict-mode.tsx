import { FC, StrictMode } from 'react';

export const withStrictMode = <P extends Record<string, unknown>,>(App: FC<P>): FC<P> => {
  const WithStrictMode = (props: P) => (
    <StrictMode>
      <App {...props} />
    </StrictMode>
  );

  WithStrictMode.displayName = 'WithStrictMode';

  return WithStrictMode;
};
