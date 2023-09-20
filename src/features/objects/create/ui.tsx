import { FC, useEffect, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FormFieldAddressInput } from '~/shared/forms-ui/address-input';
import { FormFieldInput } from '~/shared/forms-ui/input';
import { cn } from '~/shared/lib/utils';
import { Button } from '~/shared/ui/button';
import { Form } from '~/shared/ui/form';

import { FormValues, formSchema, initializeDefaultValues } from './model';

type Props = {
  organizationId?: string;
  userId: string;
  onSubmit: (object: FormValues) => void;
  className?: string;
};

export const ObjectCreateFormView: FC<Props> = ({ organizationId, userId, onSubmit, className }) => {
  const defaultValues = useMemo(() => initializeDefaultValues({ organizationId, userId }), [organizationId, userId]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // FIXME: Костылим аки можем
  useEffect(() => {
    form.setValue('organizationId', organizationId);
    form.setValue('userId', userId);
  }, [form, organizationId, userId])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-8', className)}>
        <FormFieldInput control={form.control} name={'name'} placeholder="Название объекта" />
        <FormFieldAddressInput control={form.control} name={'address'} placeholder="Адрес" />
        <FormFieldInput control={form.control} name={'floors'} asNumber placeholder="Количество этажей" />
        <FormFieldInput control={form.control} name={'fireRoomArea'} asNumber placeholder="Площадь пожарного отсека" />
        <FormFieldInput control={form.control} name={'height'} asNumber placeholder="Высота" />
        <Button className={'ml-auto flex w-full md:w-auto'} type="submit">
          Создать
        </Button>
      </form>
    </Form>
  );
};
