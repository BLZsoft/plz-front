import { attachLogger as attachLoggerBase } from 'effector-logger';

export type AttachLoggerParams = Parameters<typeof attachLoggerBase>[0];

export function attachLogger(storageKey: string, params: AttachLoggerParams) {
  const loggerEnabled = JSON.parse(localStorage.getItem(storageKey) ?? 'false');

  if (loggerEnabled) {
    attachLoggerBase(params);
  }

  // @ts-expect-error extend window
  window.toggleLogger = (state: boolean) => {
    localStorage.setItem(storageKey, JSON.stringify(state));
    location.reload();
  };
}
