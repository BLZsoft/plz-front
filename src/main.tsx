import { createRoot } from 'react-dom/client';

import { App } from '~/app';

import { appStarted } from '~/shared/lib/lifecycle';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

// attachLogger();
appStarted();
root.render(<App />);
