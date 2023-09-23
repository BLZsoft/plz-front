import { ControllerProps, FieldPath, FieldValues, PathValue } from 'react-hook-form';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/shared/ui/form';
import { Input } from '~/shared/ui/input';

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & {
  label?: string;
  placeholder?: string;
  description?: string;
  asNumber?: boolean
};

export const FormFieldInput = <
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
          <Input placeholder={props.placeholder} {...field} onChange={
            props.asNumber ? (e) => field.onChange(parseInt(e.currentTarget.value) as PathValue<TFieldValues, TName>) : field.onChange }/>
        </FormControl>

        {props.description && <FormDescription>{props.description}</FormDescription>}

        <FormMessage />
      </FormItem>
    )}
  />
);
