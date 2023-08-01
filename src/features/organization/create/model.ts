import { sample } from 'effector';
import { createEffect } from 'effector/compat';
import { z } from 'zod';

import { organizationsModel } from '~/entities/organizations';

import { CreateOrganizationDto, Organization, organizationsApi } from '~/shared/api/organizations';
import { routes } from '~/shared/lib/router';
import { toast } from '~/shared/ui/use-toast';

export const formSchema = z.object({
  name: z.string(),
});

export type FormValues = z.infer<typeof formSchema>;

export const defaultValues: FormValues = {
  name: '',
};

export const createOrganizationFx = createEffect<CreateOrganizationDto, Organization>((data) =>
  organizationsApi.createOrganization(data),
);

sample({
  clock: createOrganizationFx.doneData,
  target: organizationsModel.getAvailableOrganizationsFx,
});

sample({
  clock: createOrganizationFx.doneData,
  fn: ({ name }) =>
    toast({
      title: 'Успех!',
      description: `Организация ${name} создана`,
    }),
});

sample({
  clock: createOrganizationFx.doneData,
  fn: ({ id: organizationId }) => ({ organizationId }),
  target: routes.organizations.details.open,
});
