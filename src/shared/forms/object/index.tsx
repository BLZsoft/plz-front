import { FC, useEffect, useMemo } from 'react';

import { Loader2 } from 'lucide-react';
import { UseFormReturn, useWatch } from 'react-hook-form';

import { FieldInput, FieldSelect } from '~/shared/forms/fields';
import { cn } from '~/shared/lib/utils';
import { Button } from '~/shared/ui/button';
import { Form } from '~/shared/ui/form';

import { FormValues, ObjectType, Schema, normalizePayload, normalizeValues } from './model';
import { F_TO_QUESTIONS } from './model/questions-by-f-classification/f-to-questions';
import { FieldsConstructor } from './ui';

export type ObjectFormProps = {
  objectTypes: ObjectType[] | null;
  form: UseFormReturn<FormValues>;
  submitting: boolean;
  onSubmit: (object: FormValues) => void;
  className?: string;
};

const View: FC<ObjectFormProps> = ({ objectTypes, form, submitting, onSubmit, className }) => {
  const type = useWatch({
    control: form.control,
    name: 'type',
    defaultValue: undefined,
  });

  const questions = useMemo(() => {
    const f = objectTypes?.find((o) => o.id === type)?.f;
    if (!f) return undefined;

    return F_TO_QUESTIONS[f];
  }, [objectTypes, type]);

  useEffect(() => {
    questions?.Questions.map((q) => form.resetField(q as keyof FormValues));
  }, [form, questions]);

  if (!objectTypes) return 'Произошла ошибка, пожалуйста, попробуйте ещё раз';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-8', className)}>
        <FieldInput control={form.control} name={'name'} label="Название объекта" placeholder="Торговое предприятие" />

        <FieldSelect
          name={'type'}
          label={'Тип объекта'}
          placeholder="Выберите значение"
          options={objectTypes.map((t) => ({ display: `${t.f} ${t.name}`, value: t.id }))}
        />

        {questions && <FieldsConstructor questions={questions} />}

        <Button type="submit" className={'ml-auto flex w-full md:w-auto'} disabled={submitting}>
          {submitting && (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Сохраняем
            </>
          )}

          {!submitting && 'Сохранить'}
        </Button>
      </form>
    </Form>
  );
};

export const ObjectForm = {
  View,
  Schema,
  normalizeValues,
  normalizePayload,
};

export type { Payload as ObjectFormPayload, FormValues as ObjectFormValues } from './model';
