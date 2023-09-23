import { FC } from 'react';

import { Model } from 'effector-factorio';

import { CreateObjectForm } from '~/features/objects/create';

type Props = {
  model: Model<typeof CreateObjectForm.factory>;
};

export const ObjectCreatePageView: FC<Props> = ({ model }) => (
  <>
    <div className={'mt-4'}>
      <CreateObjectForm.View model={model} />
    </div>
  </>
);
