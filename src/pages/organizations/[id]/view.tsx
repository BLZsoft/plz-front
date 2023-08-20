import { FC } from 'react';

import { Link } from 'atomic-router-react';
import { ChevronLeft } from 'lucide-react';

import { Organization } from '~/shared/api/organizations';
import { routes } from '~/shared/lib/router';
import { Button } from '~/shared/ui/button';
import { Skeleton } from '~/shared/ui/skeleton';
import { Typography } from '~/shared/ui/typography';

export type Props = {
  organization?: Organization;
};

export const OrganizationDetailsPageView: FC<Props> = ({ organization }) => (
  <>
    <div className={'flex flex-row items-center'}>
      <Button variant="link" size="icon" className={'md:hidden'} asChild>
        <Link to={routes.organizations.home}>
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </Button>

      {organization && <Typography.H4 className={'mb-1 md:text-2xl'}>{organization.name}</Typography.H4>}
    </div>

    {!organization && (
      <div className={'flex h-full w-full items-center justify-center'}>
        <span className={'text-center text-xl text-zinc-600'}>Запрашиваемая организация не найдена</span>
      </div>
    )}
  </>
);

export const OrganizationDetailsPageLoader = () => (
  <>
    <div className={'flex flex-row items-center'}>
      <Button variant="link" size="icon" className={'md:hidden'} asChild>
        <Link to={routes.organizations.home}>
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </Button>

      <Skeleton className={'h-8 w-80'} />
    </div>

    <div className={'mt-8 space-y-6'}>
      <Skeleton className={'h-6 w-full'} />
      <Skeleton className={'h-6  w-full'} />
      <Skeleton className={'h-6  w-full'} />
    </div>
  </>
);
