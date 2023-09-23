import { Mutation } from '@farfetched/core';
import { RouteInstance, RouteParams, redirect } from 'atomic-router';
import { createEvent, sample } from 'effector';
import { modelFactory } from 'effector-factorio';

import { CreateObjectDto, Object } from '~/shared/api/objects';
import { ObjectForm, ObjectFormValues } from '~/shared/forms/object';

type MutationParams = Omit<CreateObjectDto, 'organization_id' | 'owner_id'>;

export type FactoryParams = {
  mutation: Mutation<MutationParams, Object, Error>;
  redirectAfter?: {
    route: RouteInstance<RouteParams>;
    params?: RouteParams;
  };
};

export const factory = modelFactory(({ mutation, redirectAfter }: FactoryParams) => {
  const $submitting = mutation.$pending;
  const submitted = createEvent<ObjectFormValues>();

  const defaultValues = ObjectForm.normalizeValues();

  sample({
    clock: submitted,
    fn: ObjectForm.normalizePayload,
    target: mutation.start,
  });

  if (redirectAfter) {
    redirect({
      clock: mutation.finished.success,
      params: redirectAfter.params,
      route: redirectAfter.route,
    });
  }

  return {
    $submitting,
    submitted,
    defaultValues,
  };
});
