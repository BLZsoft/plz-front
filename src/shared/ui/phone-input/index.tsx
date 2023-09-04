import { ComponentProps, FC, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import { useMaskito } from '@maskito/react';

import { Input } from '~/shared/ui/input';

import { phoneMask } from './mask';

export type PhoneInputProps = ComponentProps<typeof Input>;

export const PhoneInput: FC<PhoneInputProps> = forwardRef((props, ref) => {
  const innerRef = useRef<HTMLInputElement>(null);

  const maskedInputRef = useMaskito({ options: phoneMask });

  useEffect(() => {
    maskedInputRef(innerRef.current);
  }, [innerRef, maskedInputRef]);

  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

  return <Input {...props} ref={innerRef} />;
});
