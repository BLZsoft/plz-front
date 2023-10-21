import { ComponentProps, ComponentType } from 'react';

import { UseFormReturn, useFormContext } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withRequires<C extends ComponentType<any>>(Component: C): C {
  const WithRequires = (props: ComponentProps<C & { requires?: string[] }>) => {
    const form = useFormContext();

    const shouldDisplay = checkRequires(props.requires, form);

    return shouldDisplay ? <Component {...props} /> : null;
  };

  return WithRequires as C;
}

function checkRequires(requires: string[], form: UseFormReturn) {
  let requiresValid = true;

  for (const require of requires) {
    const value = form.getValues(require);

    if (!value) {
      requiresValid = false;
      break;
    }

    const errors = form.formState.errors[require];

    if (errors && Object.keys(errors).length) {
      requiresValid = false;
      break;
    }
  }

  return requiresValid;
}
