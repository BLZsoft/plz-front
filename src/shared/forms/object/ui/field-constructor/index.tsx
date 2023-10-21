import { FC } from 'react';

import { useFormContext } from 'react-hook-form';

import { questionsMap } from '../../model/questions';
import { FormQuestions, getOptionsByPrevious } from '../../model/questions-by-f-classification/f-to-questions';

export type FieldConstructorProps = {
  questions: FormQuestions;
};

export const FieldsConstructor: FC<FieldConstructorProps> = ({ questions: { Questions, Data, Dictionary } }) => {
  const form = useFormContext();

  if (!Questions) return null;

  return (
    <>
      {Questions.map((q, index) => {
        const Component = questionsMap[q];
        const previousQuestions = Questions.slice(0, index);

        const previousAnswers = previousQuestions.reduce(
          (acc, question) => {
            acc[question] = form.getValues(question);
            return acc;
          },
          {} as Record<string, unknown>,
        );

        const options = getOptionsByPrevious({ Questions, Data }, previousAnswers);

        return <Component key={q} name={q} requires={previousQuestions} options={options} Dictionary={Dictionary} />;
      })}
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
