import { FC, useEffect, useMemo } from 'react';

import { Loader2 } from 'lucide-react';
import { UseFormReturn, useWatch } from 'react-hook-form';

import { FieldInput, FieldSelect } from '~/shared/forms/fields';
import { cn } from '~/shared/lib/utils';
import { Button } from '~/shared/ui/button';
import { Form } from '~/shared/ui/form';

import { FormValues, normalizePayload, normalizeValues, ObjectType, Schema } from './model';
import { FieldsConstructor } from './model/constructor';
import { Question } from './model/questions';
import { QuestionAddress } from './model/questions/components';
import { F_TO_FIELDS } from './model/questions-by-f-classification/f-to-fields';
import { Result } from './ui/result';

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

  const f = useMemo(() => objectTypes?.find((o) => o.id === type)?.f, [objectTypes, type]);

  const fields = useMemo(() => !!f && F_TO_FIELDS[f], [f]);

  useEffect(() => {
    const fieldNames = Object.keys(fields ?? {});
    fieldNames.map((q) => form.resetField(q as keyof FormValues));
  }, [form, fields]);

  useEffect(() => {
    console.log(f);

    if (f) form.setValue('f', f);
  }, [form, f]);

  // Обёртка для вычисления Resistance Level и Hazard Class
  const _onSubmit = (values: FormValues) => {
    const result = fields && fields._getResult(values as unknown as Record<Question, string | number>);

    if (!result) return;

    const hazardClass = (result && (Array.isArray(result[1]) ? result[1] : [result[1]])) ?? undefined;
    const resistanceLevel = (result && (Array.isArray(result[0]) ? result[0] : [result[0]])) ?? undefined;

    return onSubmit({ ...values, hazardClass, resistanceLevel });
  };

  if (!objectTypes) return 'Произошла ошибка, пожалуйста, попробуйте ещё раз';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(_onSubmit)} className={cn('space-y-8', className)}>
        <FieldInput control={form.control} name={'name'} label="Название объекта" placeholder="Торговое предприятие" />

        <QuestionAddress label="Адрес объекта" />

        <FieldSelect
          name={'type'}
          label={'Тип объекта'}
          placeholder="Выберите значение"
          options={objectTypes.map((t) => ({ display: `${t.f} ${t.name}`, value: t.id }))}
        />

        {fields && <FieldsConstructor fields={fields} />}

        {fields && <Result fields={fields} />}

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
