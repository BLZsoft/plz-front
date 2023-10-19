import { ControllerProps, FieldPath, FieldValue, FieldValues } from 'react-hook-form';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/shared/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/shared/ui/select';

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & {
  label?: string;
  placeholder?: string;
  description?: string;
  options?: { display: string; value: FieldValue<TFieldValues> }[];
};

export const FieldSelect = <
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

        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {props.options?.map(({ value, display }) => (
              <SelectItem key={value} value={value}>
                {display}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {props.description && <FormDescription>{props.description}</FormDescription>}

        <FormMessage />
      </FormItem>
    )}
  />
);
