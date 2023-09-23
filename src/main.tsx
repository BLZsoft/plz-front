import { createRoot } from 'react-dom/client';

import { allSettled, fork } from 'effector';

import { App } from '~/app';

import { appStarted } from '~/shared/lifecycle';

import { attachLogger } from './logger';

const scope = fork({});

attachLogger('__effectorLogger', { scope });

async function renderApp() {
  await allSettled(appStarted, { scope });

  const container = document.getElementById('root') as HTMLElement;
  const root = createRoot(container);

  root.render(<App scope={scope} />);
}

renderApp();
