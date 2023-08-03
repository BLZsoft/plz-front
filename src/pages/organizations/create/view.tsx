import { FC } from 'react';

import { Link } from 'atomic-router-react';
import { ChevronLeft } from 'lucide-react';

import { routes } from '~/shared/lib/router';
import { Button } from '~/shared/ui/button';

export const OrganizationDetailsPageView: FC = () => (
  <>
    <Button variant="link" size="icon" className={'md:hidden'} asChild>
      <Link to={routes.organizations.home}>
        <ChevronLeft className="h-4 w-4" />
      </Link>
    </Button>
  </>
);
