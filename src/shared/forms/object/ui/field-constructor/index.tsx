import { ComponentProps, ComponentType, FC } from 'react';

import { FieldPath, FieldValues, UseFormReturn, useFormContext } from 'react-hook-form';

import { FieldAddressInput, FieldCheckbox, FieldInput, FieldSelect } from '~/shared/forms/fields';

import QUESTIONS from '../../model/questions.json';

type QuestionType = 'address' | 'number' | 'select' | 'boolean';
type Question = {
  type: QuestionType;
  label: string;
  placeholder?: string;
  description?: string;
  requires?: string;
};

export type FieldConstructorProps = {
  questions?: string[];
};

export const FieldsConstructor: FC<FieldConstructorProps> = ({ questions }) => {
  const form = useFormContext();

  if (!questions) return null;

  return <>{questions.map((question) => getQuestionField(question, form))}</>;
};

function getQuestionField(question: FieldPath<FieldValues>, form: UseFormReturn) {
  const { type, requires, ...props } = getQuestion(question);
  const Component = withRequires(getFieldComponent(type), form.getValues, requires);

  return <Component key={question} name={question} control={form.control} {...props} />;
}

function getFieldComponent(type: QuestionType) {
  switch (type) {
    case 'address':
      return FieldAddressInput;
    case 'number':
      return FieldInput;
    case 'select':
      return FieldSelect;
    case 'boolean':
      return FieldCheckbox;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withRequires<C extends ComponentType<any>>(
  Component: C,
  getValues: UseFormReturn['getValues'],
  requires?: string,
): C {
  if (!requires) return Component;

  const WithRequires = (props: ComponentProps<C>) => {
    const value = getValues(requires);
    return value ? <Component {...props} /> : null;
  };

  return WithRequires as C;
}

function getQuestion(question: string): Question {
  return QUESTIONS[question];
}
