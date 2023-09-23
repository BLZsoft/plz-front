import { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useUnit } from 'effector-react';
import { useForm } from 'react-hook-form';

import { FieldInput } from '~/shared/forms/fields';
import { cn } from '~/shared/lib/utils';
import { Button } from '~/shared/ui/button';
import { Form } from '~/shared/ui/form';
import { Skeleton } from '~/shared/ui/skeleton';
import { Typography } from '~/shared/ui/typography';

import { formSchema, FormValues, updateProfileFx } from './model';

type Props = {
  className?: string;
  defaultValues: FormValues;
};

export const ProfileUpdateForm: FC<Props> = ({ className, defaultValues }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const updateProfile = useUnit(updateProfileFx);

  const onSubmit = (values: FormValues) => {
    updateProfile(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-8', className)}>
        <Typography.H3>Основная информация</Typography.H3>

        <FieldInput control={form.control} name={'username'} label={'Имя пользователя'} />

        <FieldInput control={form.control} name={'name'} label={'Фамилия, имя, отчество'} />

        <Typography.H3>Контактная информация</Typography.H3>

        <FieldInput control={form.control} name={'primaryEmail'} label={'Электронная почта'} />

        <FieldInput control={form.control} name={'primaryPhone'} label={'Номер телефона'} />
        <Button type="submit">Сохранить</Button>
      </form>
    </Form>
  );
};

export const ProfileUpdateFormSkeleton: FC<Omit<Props, 'defaultValues'>> = ({ className }) => (
  <div className={cn('space-y-8', className)}>
    <Typography.H3>Основная информация</Typography.H3>

    <div className={'space-y-4'}>
      <Skeleton className={'h-4 w-56'} />
      <Skeleton className={'h-10'} />
    </div>

    <div className={'space-y-4'}>
      <Skeleton className={'h-4 w-56'} />
      <Skeleton className={'h-10'} />
    </div>

    <Typography.H3>Контактная информация</Typography.H3>

    <div className={'space-y-4'}>
      <Skeleton className={'h-4 w-56'} />
      <Skeleton className={'h-10'} />
    </div>

    <div className={'space-y-4'}>
      <Skeleton className={'h-4 w-56'} />
      <Skeleton className={'h-10'} />
    </div>

    <Skeleton className={'h-10 w-24'} />
  </div>
);
