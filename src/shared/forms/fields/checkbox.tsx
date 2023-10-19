import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

import { Checkbox } from '~/shared/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '~/shared/ui/form';

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & {
  label?: string;
  description?: string;
};

export const FieldCheckbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: Props<TFieldValues, TName>,
) => (
  <FormField
    control={props.control}
    name={props.name}
    render={({ field }) => (
      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
        <FormControl>
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
        </FormControl>

        <div className="space-y-1 leading-none">
          {props.label && <FormLabel>{props.label}</FormLabel>}
          {props.description && <FormDescription>{props.description}</FormDescription>}
        </div>
      </FormItem>
    )}
  />
);
