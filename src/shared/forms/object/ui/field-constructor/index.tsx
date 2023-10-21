import { FC } from 'react';

import { questionsMap } from '../../model/questions';
import { FormQuestions } from '../../model/questions-by-f-classification/f-to-questions';

export type FieldConstructorProps = {
  questions: FormQuestions;
};

export const FieldsConstructor: FC<FieldConstructorProps> = ({ questions: { Questions, Data, Dictionary } }) => {
  if (!Questions) return null;

  return (
    <>
      {Questions.map((q) => {
        const Component = questionsMap[q];
        return <Component key={q} name={q} Questions={Questions} Data={Data} Dictionary={Dictionary} />;
      })}
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
