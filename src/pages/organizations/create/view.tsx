import { FC } from 'react';

import { Link } from 'atomic-router-react';
import { ChevronLeft } from 'lucide-react';

import { OrganizationCreateForm } from '~/features/organization/create';

import { routes } from '~/shared/router';
import { Button } from '~/shared/ui/button';
import { Typography } from '~/shared/ui/typography';

export const OrganizationCreatePageView: FC = () => (
  <>
    <div className={'flex flex-row items-center'}>
      <Button variant="link" size="icon" className={'md:hidden'} asChild>
        <Link to={routes.organizations.home}>
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </Button>

      <Typography.H4 className={'mb-1 md:text-2xl'}>Создать организацию</Typography.H4>
    </div>

    <div className={'mt-4'}>
      <OrganizationCreateForm />
    </div>
  </>
);
