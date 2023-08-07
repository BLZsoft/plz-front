import { PropsWithChildren } from 'react';

import { RouteInstance, RouteParams } from 'atomic-router';
import { Link } from 'atomic-router-react';
import { clsx } from 'clsx';

type Props<Params extends RouteParams = RouteParams> = PropsWithChildren<{
  to: RouteInstance<Params>;
  params?: Params;
  isActive?: boolean;
  className?: string;
}>;

export const OrganizationsSidebarItem = <Params extends RouteParams>({
  to,
  params,
  isActive,
  className,
  children,
}: Props<Params>) => {
  return (
    <Link
      to={to}
      params={params}
      className={clsx(
        'flex w-full items-center px-2 py-4 text-left transition-colors hover:text-white  md:p-4',
        !isActive && 'hover:bg-red-500',
        isActive && 'bg-red-500 text-white hover:bg-red-600',
        className,
      )}
    >
      {children}
    </Link>
  );
};
