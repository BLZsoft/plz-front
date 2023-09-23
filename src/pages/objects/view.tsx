import { FC } from 'react';

type Props = {
  ChildRoutes: FC;
};

export const ObjectsRootPageView: FC<Props> = ({ ChildRoutes }) => (
  <>
    <div className="container mx-auto py-10">
      <ChildRoutes />
    </div>
  </>
);

export const ObjectsRootPageLoader = () => <h1>Загрузка...</h1>;
