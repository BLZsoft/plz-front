import { FC, forwardRef } from 'react';

import { DropzoneOptions, DropzoneRootProps as BaseDropzoneRootProps, useDropzone } from 'react-dropzone';

import { cn } from '~/shared/lib/utils';
import { Button } from '~/shared/ui/button';

type DropzoneRootProps = BaseDropzoneRootProps & {
  isDragAccept: boolean;
  isDragReject: boolean;
};

const DropzoneRoot = forwardRef<HTMLButtonElement, DropzoneRootProps>(
  ({ className, isDragAccept, isDragReject, ...props }, ref) => (
    <Button
      asChild
      variant={'outline'}
      {...props}
      ref={ref}
      className={cn(
        'h-24 border-dashed border-2',
        isDragAccept && 'border-red-500',
        isDragReject && 'opacity-50',
        className,
      )}
    >
      <div>{props.children}</div>
    </Button>
  ),
);

type ProfileUpdateAvatarDropzoneProps = {
  onDrop: DropzoneOptions['onDrop'];
};

export const ProfileUpdateAvatarDropzone: FC<ProfileUpdateAvatarDropzoneProps> = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    accept: { 'image/*': [] },
    onDrop,
    multiple: false,
  });

  return (
    <DropzoneRoot {...getRootProps({ isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      <span>Выберите изображение</span>
    </DropzoneRoot>
  );
};
