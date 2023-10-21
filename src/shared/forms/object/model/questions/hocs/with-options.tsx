/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentProps, ComponentType, useEffect, useMemo } from 'react';

import { useFormContext } from 'react-hook-form';

import { getOptionsByPrevious } from '../../questions-by-f-classification/f-to-questions';
import { Question } from '../types';

type Option = { display: string; value: string };

export function withOptions<
  C extends ComponentType<{ name: Question; options: Option[]; requires?: Question[] } & any>,
>(Component: C): C {
  const WithOptions = ({
    name,
    Questions,
    Data,
    Dictionary,
    ...props
  }: ComponentProps<C> & {
    name: Question;
    Questions: Question[];
    Data: Record<string, any>;
    Dictionary: Record<Question, string>;
    requires?: Question[];
  }) => {
    const form = useFormContext();

    const previousQuestions = useMemo(() => Questions.slice(0, Questions.indexOf(name)), [name, Questions]);
    const previousAnswers = form.watch(previousQuestions);

    useEffect(() => {
      const subscription = form.watch((_, { name: changedName, type }) => {
        if (previousQuestions.includes(changedName) && type === 'change') {
          console.log(`[${name}]: has been reseted due to "${changedName}"`);
          form.resetField(name, { defaultValue: '' });
        }
      });

      return () => subscription.unsubscribe();
    }, [form, name, previousQuestions]);

    const options = getOptionsByPrevious({ Questions, Data }, previousAnswers)?.map((o) => ({
      display: Dictionary[name][o],
      value: o,
    }));

    // console.log(`[${name}]: previousQuestions:`, previousQuestions);
    // console.log(`[${name}]: previousAnswers:`, previousAnswers);
    // console.log(`[${name}]: Dictionary:`, Dictionary);
    // console.log(`[${name}]: options:`, options);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return <Component name={name} requires={previousQuestions} options={options} {...(props as ComponentProps<C>)} />;
  };

  return WithOptions as C;
}
