import { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { CreateObjectDto } from '~/shared/api/objects';
import { FormFieldInput } from '~/shared/forms-ui/input';
import { cn } from '~/shared/lib/utils';
import { Button } from '~/shared/ui/button';
import { DadataAddress } from '~/shared/ui/dadata';
import { Form } from '~/shared/ui/form';

import { defaultValues, formSchema, FormValues } from './model';

type Props = {
  onSubmit: (organization: CreateObjectDto) => void;
  className?: string;
};

export const ObjectCreateFormView: FC<Props> = ({ onSubmit, className }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-8', className)}>
        <FormFieldInput control={form.control} name={'name'} placeholder='Название объекта' />
        <DadataAddress />
        <FormFieldInput control={form.control} name={'floor'} placeholder='Этаж' />
        <FormFieldInput control={form.control} name={'fireRoomArea'} placeholder='Площадь пожарного отсека' />
        <FormFieldInput control={form.control} name={'height'} placeholder='Высота' />
        <Button className={'ml-auto flex w-full md:w-auto'} type="submit">
          Создать
        </Button>
      </form>
    </Form>
  );
};
