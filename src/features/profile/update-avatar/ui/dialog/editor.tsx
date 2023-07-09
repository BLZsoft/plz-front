import { FC, forwardRef, Ref, useState } from 'react';

import { CornerLeftDown, CornerRightDown } from 'lucide-react';
import AvatarEditor from 'react-avatar-editor';

import { Nullable } from '~/shared/lib/utils';
import { Button } from '~/shared/ui/button';
import { Slider } from '~/shared/ui/slider';

export type ProfileUpdateAvatarEditorProps = {
  ref: Ref<AvatarEditor>;
  image?: Nullable<string | File>;
};

export const ProfileUpdateAvatarEditor: FC<ProfileUpdateAvatarEditorProps> = forwardRef<
  AvatarEditor,
  ProfileUpdateAvatarEditorProps
>(({ image }, editorRef) => {
  const [scale, setScale] = useState<number>(1.5);
  const [rotate, setRotate] = useState<number>(0);

  const onScaleChange = (newScale) => {
    setScale(newScale[0]);
  };

  const onRotateChange = (diff: number) => {
    setRotate((prevRotation) => prevRotation + diff);
  };

  return (
    <div className={'flex w-full flex-col items-center justify-center space-y-4 md:space-y-8'}>
      <AvatarEditor ref={editorRef} image={image ?? ''} scale={scale} rotate={rotate} border={50} borderRadius={100} />

      <div className={'space-x-4'}>
        <Button size={'icon'} variant={'secondary'} onClick={() => onRotateChange(-90)}>
          <CornerLeftDown />
        </Button>

        <Button size={'icon'} variant={'secondary'} onClick={() => onRotateChange(90)}>
          <CornerRightDown />
        </Button>
      </div>

      <Slider defaultValue={[1]} value={[scale]} onValueChange={onScaleChange} max={2} min={0.5} step={0.01} />
    </div>
  );
});
