import { FC } from 'react';

import { Link } from 'atomic-router-react';
import { ChevronLeft, MessageCircle, Phone } from 'lucide-react';

import { InviteMemberButton } from '~/features/organization/invite-member';
import { RemoveMemberIconButton } from '~/features/organization/remove-member';

import { OrganizationMemberRow } from '~/entities/organization-members';

import { MemberData, Organization } from '~/shared/api/organizations';
import { Profile } from '~/shared/api/profile';
import { routes } from '~/shared/lib/router';
import { Button } from '~/shared/ui/button';
import { Separator } from '~/shared/ui/separator';
import { Skeleton } from '~/shared/ui/skeleton';
import { Typography } from '~/shared/ui/typography';

export type Props = {
  viewer: Profile;
  organization?: Organization;
  role?: string;
  members?: MemberData[];
};

export const OrganizationDetailsPageView: FC<Props> = ({ viewer, organization, members, role }) => (
  <>
    <div className={'flex flex-row items-center'}>
      <Button variant="link" size="icon" className={'md:hidden'} asChild>
        <Link to={routes.organizations.home}>
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </Button>

      {organization && <Typography.H4 className={'mb-1 md:text-2xl'}>{organization.name}</Typography.H4>}
    </div>

    {organization && members && (
      <div>
        <div className={'flex flex-row items-center justify-between'}>
          <Typography.H5>Список участников</Typography.H5>

          {role === 'owner' && (
            <InviteMemberButton organizationId={organization.id} size={'sm'}>
              Пригласить
            </InviteMemberButton>
          )}
        </div>

        {/* TODO: Меню с kebab иконкой для мобильных устройств */}
        <div className={'mt-4 space-y-4 md:mt-6 md:space-y-6'}>
          {members.map((m) => (
            <OrganizationMemberRow
              key={m.id}
              member={m}
              actions={
                m.id !== viewer.sub ? (
                  <>
                    <Button variant="ghost" size="icon">
                      <MessageCircle className="h-4 w-4" />
                    </Button>

                    <Button asChild={true} variant="ghost" size="icon">
                      <a href={`tel:+${m.primaryPhone}`}>
                        <Phone className="h-4 w-4" />
                      </a>
                    </Button>

                    {role === 'owner' && m.role !== 'owner' && (
                      <>
                        <Separator orientation={'vertical'} className={'mx-1 h-6'} />
                        <RemoveMemberIconButton organizationId={organization.id} memberId={m.id} />
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )
              }
            />
          ))}
        </div>
      </div>
    )}

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

      <Skeleton className={'h-8 w-80 text-2xl'} />
    </div>

    <div className={'space-y-6'}>
      <Skeleton className={'h-6 w-72 text-xl'} />

      <Skeleton className={'h-4 w-full'} />
      <Skeleton className={'h-4  w-full'} />
      <Skeleton className={'h-4  w-full'} />
    </div>
  </>
);
