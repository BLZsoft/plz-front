import { zodResolver } from '@hookform/resolvers/zod';
import { modelView } from 'effector-factorio';
import { useUnit } from 'effector-react';
import { useForm } from 'react-hook-form';

import { ObjectForm, ObjectFormValues } from '~/shared/forms/object';

import { factory } from './model';

export const View = modelView(factory, () => {
  const { $objectTypes, $submitting, submitted, defaultValues } = factory.useModel();

  const [submitting, onSubmit] = useUnit([$submitting, submitted]);
  const objectTypes = useUnit($objectTypes);

  const form = useForm<ObjectFormValues>({
    resolver: zodResolver(ObjectForm.Schema),
    defaultValues,
  });

  return <ObjectForm.View objectTypes={objectTypes} form={form} submitting={submitting} onSubmit={onSubmit} />;
});
