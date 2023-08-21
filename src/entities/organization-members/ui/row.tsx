import { FC, ReactElement } from 'react';

import { MemberData } from '~/shared/api/organizations';
import { Avatar, AvatarFallback, AvatarImage } from '~/shared/ui/avatar';

type Props = {
  member: MemberData;
  actions?: ReactElement;
};

export const OrganizationMemberRow: FC<Props> = ({ member, actions }) => {
  const { primaryPhone, name, avatar } = member;

  return (
    <div className={'flex flex-row items-center space-x-4'}>
      <Avatar className={'h-12 w-12'}>
        {avatar && <AvatarImage src={avatar} alt={name ?? 'Аватар пользователя'} />}
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className={'flex grow flex-col'}>
        <span className={'font-semibold'}>{name}</span>
        <span className={'text-zinc-500'}>+{primaryPhone}</span>
      </div>

      <div className={'flex flex-row items-center'}>{actions}</div>
    </div>
  );
};
