import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import type { Object } from '~/shared/api/objects';
import { Button } from '~/shared/ui/button';

import { RowActions } from './actions';

const columnHelper = createColumnHelper<Object>();

export const columns = [
  columnHelper.accessor('name', {
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Название
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  }),
  columnHelper.accessor('address', {
    header: 'Адрес',
  }),
  columnHelper.display({
    id: 'actions',
    cell: (props) => <RowActions row={props.row} />,
  }),
];
