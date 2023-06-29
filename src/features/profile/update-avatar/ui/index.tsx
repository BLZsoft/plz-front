import { FC, useRef, useState } from 'react';

import AvatarEditor from 'react-avatar-editor';

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

import { ProfileUpdateAvatarDropzone } from './dialog/dropzone';
import { ProfileUpdateAvatarEditor } from './dialog/editor';
import { ProfileUpdateAvatarTrigger } from './trigger';

export type Props = {
  onSubmit: (newAvatar: Blob | null) => Promise<void>;
};

// TODO: @d.tankov — move logic to effector
export const ProfileUpdateAvatarView: FC<Props> = ({ onSubmit }) => {
  const editorRef = useRef<AvatarEditor>(null);

  const [open, setOpen] = useState(false);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const onFileSelected = (selectedFiles) => {
    setAvatarFile(selectedFiles[0]);
  };

  const onFileClear = () => {
    setAvatarFile(null);
  };

  const onSave = () => {
    if (!avatarFile || !onSubmit || !editorRef.current) {
      return;
    }

    const onBlobReady = (blob) => {
      onSubmit(blob).then(() => {
        setOpen(false);
      });
    };

    const canvas = editorRef.current.getImage();
    canvas.toBlob(onBlobReady);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ProfileUpdateAvatarTrigger />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:space-y-4">
        <DialogHeader>
          <DialogTitle>Изображение профиля</DialogTitle>
          <DialogDescription>Нажмите сохранить, как закончите.</DialogDescription>
        </DialogHeader>

        {!avatarFile && <ProfileUpdateAvatarDropzone onDrop={onFileSelected} />}

        {avatarFile && <ProfileUpdateAvatarEditor image={avatarFile} ref={editorRef} />}

        <DialogFooter>
          {avatarFile && (
            <Button type="button" variant={'ghost'} onClick={onFileClear}>
              Назад
            </Button>
          )}

          {avatarFile && (
            <Button type="submit" disabled={!avatarFile} onClick={onSave}>
              Сохранить
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
