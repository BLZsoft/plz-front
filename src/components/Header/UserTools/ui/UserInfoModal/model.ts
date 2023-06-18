import { z } from 'zod';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// Создайте схему zod для валидации данных формы
export const updateProfileSchema = z.object({
  username: z.string().nonempty({ message: 'Имя пользователя не может быть пустым' }),
  primaryEmail: z.string().email({ message: 'Введите действительный адрес электронной почты' }),
  primaryPhone: z.string().nonempty({ message: 'Телефон не может быть пустым' }),
  name: z.string().nonempty({ message: 'Имя не может быть пустым' }),
  avatar: z
    .any()
    .refine(({ file }) => !file || file?.size <= MAX_FILE_SIZE, `Максимальный размер 5MB`)
    .refine(
      ({ file }) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Изображение должно быть в формате.jpg, .jpeg, .png and .webp',
    ),
});

export type UpdateProfileFormData = {
  username: string;
  primaryEmail: string;
  primaryPhone: string;
  name: string;
  avatar: any;
};
