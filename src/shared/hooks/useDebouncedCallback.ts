import { useCallback } from 'react';

import debounce from 'lodash/debounce';

export function useDebouncedCallback<T extends (...args: any[]) => unknown>(
  callback: T,
  deps: unknown[],
  debounceTime: number,
) {
  return useCallback(debounce(callback, debounceTime), deps);
}
