import { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { CreateOrganizationDto } from '~/shared/api/organizations';
import { FormFieldInput } from '~/shared/forms/input';
import { cn } from '~/shared/lib/utils';
import { Button } from '~/shared/ui/button';
import { Form } from '~/shared/ui/form';

import { defaultValues, formSchema, FormValues } from './model';

type Props = {
  onSubmit: (organization: CreateOrganizationDto) => void;
  className?: string;
};

export const OrganizationCreateFormView: FC<Props> = ({ onSubmit, className }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-8', className)}>
        <FormFieldInput control={form.control} name={'name'} label={'Название организации'} />

        <Button className={'ml-auto flex w-full md:w-auto'} type="submit">
          Создать
        </Button>
      </form>
    </Form>
  );
};
