import { Mutation } from '@farfetched/core';
import { RouteInstance, RouteParams, redirect } from 'atomic-router';
import { Store, createEvent, sample } from 'effector';
import { modelFactory } from 'effector-factorio';

import { ObjectType } from '~/shared/api/object-types';
import { Object } from '~/shared/api/objects';
import { ObjectForm, ObjectFormPayload, ObjectFormValues } from '~/shared/forms/object';

export type FactoryParams = {
  $objectTypes: Store<ObjectType[] | null>;
  $object: Store<Object | null>;

  mutation: Mutation<ObjectFormPayload, Object, Error>;
  redirectAfter?: {
    route: RouteInstance<RouteParams>;
    params?: RouteParams;
  };
};

export const factory = modelFactory(({ $objectTypes, $object, mutation, redirectAfter }: FactoryParams) => {
  const $submitting = mutation.$pending;

  const $initialValues = $object.map(ObjectForm.normalizeValues);

  const submitted = createEvent<ObjectFormValues>();

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
    $objectTypes,
    $submitting,
    submitted,
    $initialValues,
  };
});
