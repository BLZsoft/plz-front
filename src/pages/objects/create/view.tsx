import { FC } from 'react';

import { ObjectCreateForm } from '~/features/objects/create';
 
export const ObjectCreatePageView: FC = () => (
  <>
    <div className={'mt-4'}>
      <ObjectCreateForm />
    </div>
  </>
);
