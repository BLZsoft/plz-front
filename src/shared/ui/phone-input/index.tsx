import { ComponentProps, FC } from 'react';

import { useMaskito } from '@maskito/react';

import { Input } from '~/shared/ui/input';

import { phoneMask } from './mask';

export type PhoneInputProps = ComponentProps<typeof Input>;

export const PhoneInput: FC<PhoneInputProps> = (props) => {
  const maskedInputRef = useMaskito({ options: phoneMask });

  return <Input {...props} ref={maskedInputRef} />;
};
