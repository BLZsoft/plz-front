import { FC, PropsWithChildren } from 'react';

// https://ui.shadcn.com/docs/components/typography#p

const H1: FC<PropsWithChildren> = ({ children }) => (
  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{children}</h1>
);

const H2: FC<PropsWithChildren> = ({ children }) => (
  <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
    {children}
  </h2>
);

const H3: FC<PropsWithChildren> = ({ children }) => (
  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{children}</h3>
);

const H4: FC<PropsWithChildren> = ({ children }) => (
  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{children}</h4>
);

const P: FC<PropsWithChildren> = ({ children }) => <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;

export const Typography = {
  H1,
  H2,
  H3,
  H4,
  P,
};
