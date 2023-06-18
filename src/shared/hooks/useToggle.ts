import { useState } from 'react';

export function useToggle(
  initialStatus?: boolean,
  callbackOnToggle?: (newStatus: boolean) => void,
): [boolean, () => void, (newStatus: boolean) => void] {
  const [status, setStatus] = useState(initialStatus ?? false);

  const toggleStatus = () => {
    setStatus((prevState) => !prevState);
    if (callbackOnToggle) callbackOnToggle(!status);
  };

  const setStatusManually = (newStatus: boolean) => {
    setStatus(newStatus);
    if (callbackOnToggle) callbackOnToggle(newStatus);
  };

  return [status, toggleStatus, setStatusManually];
}
