import { ComponentProps, ComponentType } from 'react';

import { Question } from '../types';

type Option = { display: string; value: string };

export function withOptions<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  C extends ComponentType<{ name: Question; options: Option[] } & any>,
  T extends string | number,
>(Component: C): C {
  const WithOptions = ({
    options,
    Dictionary,
    name,
    ...props
  }: ComponentProps<C> & { options?: T[]; Dictionary: Record<T, string> }) => {
    console.log(Dictionary);
    console.log(name);
    console.log(options);

    const normalizedOptions: Option[] = options?.map((o: T) => ({ display: Dictionary[name][o], value: o }));

    console.log(normalizedOptions);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return <Component name={name} options={normalizedOptions} {...(props as ComponentProps<C>)} />;
  };

  return WithOptions as C;
}
