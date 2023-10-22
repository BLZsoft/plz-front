import { ComponentProps, ComponentType, FC, useEffect, useMemo } from 'react';

import { UseFormReturn, useFormContext } from 'react-hook-form';

import { questionsMap } from '../questions';
import { CommonProps, Question } from '../questions/types';
import { FieldDefinition, FieldsDefinition } from '../questions-by-f-classification/types';

export type FieldConstructorProps = {
  fields: FieldsDefinition;
};

export const FieldsConstructor: FC<FieldConstructorProps> = ({ fields }) => {
  if (!fields) return null;

  return (
    <>
      {Object.keys(fields).map((q) => {
        const Component = hoc(questionsMap[q]);
        const props = fields[q];

        return <Component key={q} name={q} {...props} />;
      })}
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function hoc<C extends ComponentType<CommonProps & any>>(Component: C) {
  const WithFieldConstructor: FC<FieldDefinition & ComponentProps<C> & { name: string }> = ({
    name,
    getOptions,
    getLabel,
    getShouldRender = () => true,
    dependsOn = [],
    ...props
  }) => {
    const form = useFormContext();
    const dependsOnValues = form.watch(dependsOn);

    // Сбрасываем поле, если поля от которых зависит изменились
    useResetOnDepends({ form, name, dependsOn });

    // Объект вопрос-ответ с вопросами от которых зависит текущий
    const previousAnswers = useMemo(
      () => composeQuestionAnswers(dependsOn, dependsOnValues),
      [dependsOnValues, dependsOn],
    );

    const options = useOptions({ previousAnswers, getOptions, getLabel });
    const shouldRender = getShouldRender(previousAnswers);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return shouldRender ? <Component name={name} {...props} options={options} /> : null;
  };

  return WithFieldConstructor;
}

function composeQuestionAnswers(
  questions: Question[],
  answers: (string | number)[],
): Record<Question, string | number> {
  return questions.reduce(
    (acc, question, index) => {
      acc[question] = answers[index];
      return acc;
    },
    {} as Record<Question, string | number>,
  );
}

function useResetOnDepends({ form, name, dependsOn }: { form: UseFormReturn; name: string; dependsOn: string[] }) {
  useEffect(() => {
    const subscription = form.watch((_, { name: changedName, type }) => {
      if (dependsOn.includes(changedName as string) && type === 'change') {
        console.log(`[${name}]: reseted due to "${changedName}"`);
        form.resetField(name, { defaultValue: undefined });
      }
    });

    return () => subscription.unsubscribe();
  }, [form, name, dependsOn]);
}

function useOptions({
  previousAnswers,
  getOptions,
  getLabel,
}: {
  previousAnswers: Record<Question, string | number>;
  getOptions: FieldDefinition['getOptions'];
  getLabel: FieldDefinition['getLabel'];
}) {
  const options = useMemo(() => {
    let options;

    try {
      options = getOptions(previousAnswers);
    } catch {
      options = [];
    }

    if (options !== null) {
      options = options.map((option) => ({ display: getLabel(option, previousAnswers), value: option }));
    }

    return options;
  }, [previousAnswers, getOptions, getLabel]);

  return options;
}
