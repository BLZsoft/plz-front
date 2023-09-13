import { FC } from 'react';

import { ObjectsTable } from '~/widgets/objectsTable';

import { ObjectType } from '~/shared/api/objects';
import { columns } from '~/shared/table-ui/columns';

type Props = {
  data: ObjectType[];
  ChildRoutes: FC;
};

export const HomePageView: FC<Props> = ({ data, ChildRoutes }) => (
  <>
    <div className="container mx-auto py-10">
      <ObjectsTable data={data} columns={columns} />
      <ChildRoutes />
    </div>
  </>
);

export const HomePageLoader = () => <h1>Загрузка...</h1>;
