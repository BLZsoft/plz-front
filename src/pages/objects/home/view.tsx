import { FC } from 'react';

import { ObjectsTable } from '~/entities/objects';

import type { Object } from '~/shared/api/objects';

type Props = {
  data: Object[];
};

export const ObjectHomePageView: FC<Props> = ({ data }) => (
  <div className="container mx-auto py-10">
    <ObjectsTable data={data} />
  </div>
);
