import { z } from 'zod';

export const updateProfileSchema = z.object({
  username: z.string().nonempty({ message: 'Имя пользователя не может быть пустым' }),
  primaryEmail: z.string().email({ message: 'Введите действительный адрес электронной почты' }),
  primaryPhone: z.string().nonempty({ message: 'Телефон не может быть пустым' }),
  name: z.string().nonempty({ message: 'Имя не может быть пустым' }),
});

export type UpdateProfileFormData = {
  username: string;
  primaryEmail: string;
  primaryPhone: string;
  name: string;
  avatar: any;
};
