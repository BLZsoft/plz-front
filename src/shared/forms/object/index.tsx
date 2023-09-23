import { FC } from 'react';

import { Loader2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { FieldAddressInput, FieldInput } from '~/shared/forms/fields';
import { cn } from '~/shared/lib/utils';
import { Button } from '~/shared/ui/button';
import { Form } from '~/shared/ui/form';

import { FormValues, Schema, normalizePayload, normalizeValues } from './model';

export type ObjectFormProps = {
  form: UseFormReturn<FormValues>;
  submitting: boolean;
  onSubmit: (object: FormValues) => void;
  className?: string;
};

const View: FC<ObjectFormProps> = ({ form, submitting, onSubmit, className }) => (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-8', className)}>
      <FieldInput control={form.control} name={'name'} placeholder="Название объекта" />
      <FieldAddressInput control={form.control} name={'address'} placeholder="Адрес" />

      <FieldInput control={form.control} name={'floors'} placeholder="Количество этажей" />
      <FieldInput control={form.control} name={'height'} placeholder="Высота" />
      <FieldInput control={form.control} name={'width'} placeholder="Ширина" />
      <FieldInput control={form.control} name={'fireRoomArea'} placeholder="Площадь пожарного отсека" />

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

export const ObjectForm = {
  View,
  Schema,
  normalizeValues,
  normalizePayload,
};

export type { Payload as ObjectFormPayload, FormValues as ObjectFormValues } from './model';
