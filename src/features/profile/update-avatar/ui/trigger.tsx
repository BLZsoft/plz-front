import { forwardRef, useState } from 'react';

import { ViewerAvatar } from '~/entities/viewer';

import { cn } from '~/shared/lib/utils';

export const ProfileUpdateAvatarTrigger = forwardRef<
  HTMLDivElement,
  {
    onClick?: () => void;
  }
>(({ onClick }, ref) => {
  const [hover, setHover] = useState(false);
  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);

  return (
    <div
      ref={ref}
      className={'relative aspect-square h-auto w-full cursor-pointer overflow-hidden rounded-full'}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ViewerAvatar className={'aspect-square h-auto w-full'} fallbackSize={256} />

      <div
        className={cn(
          'absolute bottom-0 h-1/4 w-full bg-slate-950 opacity-50 md:opacity-0 transition-opacity text-white flex items-center justify-center',
          hover && 'md:opacity-50',
        )}
      >
        Изменить
      </div>
    </div>
  );
});
