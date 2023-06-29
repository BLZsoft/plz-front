import { FC } from 'react';

import { Organization } from '~/shared/api/organizations';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/shared/ui/select';
import { Skeleton } from '~/shared/ui/skeleton';

export type Props = {
  current: string | null;
  options: Organization[] | null;
  onChange: (org: string) => void;
};

export const View: FC<Props> = ({ current, options, onChange }) =>
  !current ? (
    <Skeleton className="h-4 w-[250px]" />
  ) : (
    <Select value={current} onValueChange={onChange}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Организация" />
      </SelectTrigger>
      <SelectContent>
        {options?.map((o) => (
          <SelectItem key={o.id} value={o.id}>
            {o.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
