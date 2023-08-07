import { FC, PropsWithChildren } from 'react';

import { clsx } from 'clsx';

// https://ui.shadcn.com/docs/components/typography#p

type Props = PropsWithChildren<{
  className?: string;
}>;

const H1: FC<Props> = ({ children, className }) => (
  <h1 className={clsx('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}>{children}</h1>
);

const H2: FC<Props> = ({ children, className }) => (
  <h2
    className={clsx(
      'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
      className,
    )}
  >
    {children}
  </h2>
);

const H3: FC<Props> = ({ children, className }) => (
  <h3 className={clsx('scroll-m-20 text-2xl font-semibold tracking-tight', className)}>{children}</h3>
);

const H4: FC<Props> = ({ children, className }) => (
  <h4 className={clsx('scroll-m-20 text-xl font-semibold tracking-tight', className)}>{children}</h4>
);

const P: FC<Props> = ({ children, className }) => (
  <p className={clsx('leading-7 [&:not(:first-child)]:mt-6', className)}>{children}</p>
);

export const Typography = {
  H1,
  H2,
  H3,
  H4,
  P,
};
