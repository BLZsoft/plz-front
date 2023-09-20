import { ControllerProps, FieldPath, FieldValues, PathValue } from 'react-hook-form';

import { DadataAddress } from '~/shared/ui/dadata';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/shared/ui/form';

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & {
  label?: string;
  placeholder?: string;
  description?: string;
};

export const FormFieldAddressInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: Props<TFieldValues, TName>,
) => (
  <FormField
    control={props.control}
    name={props.name}
    render={({ field }) => (
      <FormItem>
        {props.label && <FormLabel>{props.label}</FormLabel>}

        <FormControl>
          <DadataAddress
            defaultQuery={field.value.value}
            value={field.value}
            onChange={(e) => e && field.onChange(e as PathValue<TFieldValues, TName>)}
            inputProps={{ ref: field.ref, name: field.name, placeholder: props.placeholder, onBlur: field.onBlur }}
          />
        </FormControl>

        {props.description && <FormDescription>{props.description}</FormDescription>}

        <FormMessage />
      </FormItem>
    )}
  />
);

export type { AddressSuggestionSchema } from './schema';
export { AddressSuggestionSchemaZ } from './schema';
