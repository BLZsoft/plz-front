import { FC, PropsWithChildren, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '~/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/shared/ui/dialog';
import { Label } from '~/shared/ui/label';
import { PhoneInput } from '~/shared/ui/phone-input';

import { defaultValues, formSchema, FormValues } from '../model';

type Props = PropsWithChildren<{
  onSubmit?: (values: FormValues) => void | Promise<void>;
}>;

export const InviteMemberPopup: FC<Props> = ({ children, onSubmit }) => {
  const [open, setOpen] = useState(false);
  const onOpenChange = (open: boolean) => setOpen(open);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const _onSubmit = async (values: FormValues) => {
    if (onSubmit) await onSubmit(values);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(_onSubmit)}>
          <DialogHeader>
            <DialogTitle>Пригласить пользователя</DialogTitle>
            <DialogDescription>Введите номер телефона пользователя, которого хотите пригласить.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Телефон
              </Label>

              <PhoneInput id="phone" className="col-span-3" {...form.register('phone')} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Пригласить</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
