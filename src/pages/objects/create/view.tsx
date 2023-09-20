import { FC } from 'react';

import { ObjectCreateForm } from '~/features/objects/create';

type Props = {
  organizationId?: string;
  userId: string;
};

export const ObjectCreatePageView: FC<Props> = ({ organizationId, userId }) => (
  <>
    <div className={'mt-4'}>
      <ObjectCreateForm organizationId={organizationId} userId={userId} />
    </div>
  </>
);
