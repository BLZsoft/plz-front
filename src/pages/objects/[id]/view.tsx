import { FC } from 'react';

import { Model } from 'effector-factorio';

import { EditObjectForm } from '~/features/objects/edit';

export type Props = {
  model: Model<typeof EditObjectForm.factory>;
};

export const ObjectEditPageView: FC<Props> = ({ model }) => (
  <>
    <div className={'mt-4'}>
      <EditObjectForm.View model={model} />
    </div>
  </>
);

export const ObjectEditPageLoad = () => (
  <>
    <div className={'mt-4'}>
      <h1>Тут могла быть ваша реклама</h1>
    </div>
  </>
);
