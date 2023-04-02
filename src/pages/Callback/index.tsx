import { useNavigate } from 'react-router-dom';

import { useHandleSignInCallback } from '@logto/react';

const Callback = () => {
  const navigate = useNavigate();
  const { isLoading } = useHandleSignInCallback(() => {
    navigate('/', { replace: true });
  });

  // When it's working in progress
  if (isLoading) {
    return <div>Redirecting...</div>;
  }

  return <div>Callback</div>;
};

export default Callback;
