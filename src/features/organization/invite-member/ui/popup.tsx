import { FC, PropsWithChildren } from 'react';

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

export const InviteMemberPopup: FC<PropsWithChildren> = ({ children }) => (
  <Dialog>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Пригласить пользователя</DialogTitle>
        <DialogDescription>Введите номер телефона пользователя, которого хотите пригласить.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            Телефон
          </Label>

          <PhoneInput id="phone" className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Пригласить</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
