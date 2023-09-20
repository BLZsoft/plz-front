import { FC } from 'react';

type Props = {
  ChildRoutes: FC;
};

export const ObjectsPageView: FC<Props> = ({ ChildRoutes }) => (
  <>
    <div className="container mx-auto py-10">
      <ChildRoutes />
    </div>
  </>
);

export const ObjectsPageLoader = () => <h1>Загрузка...</h1>;
