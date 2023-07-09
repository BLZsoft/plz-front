import { FC } from 'react';

import { User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '~/shared/ui/avatar';
import { Skeleton } from '~/shared/ui/skeleton';

export type Props = {
  src?: string | null;
  className?: string;
  fallbackSize?: number;
};

export const View: FC<Props> = ({ src, className, fallbackSize }) => (
  <Avatar className={className}>
    <AvatarImage src={src ?? undefined} alt={'Изображение профиля'} />
    <AvatarFallback>
      <User size={fallbackSize} />
    </AvatarFallback>
  </Avatar>
);

export const Loading = () => <Skeleton className="h-10 w-10 rounded-full" />;
