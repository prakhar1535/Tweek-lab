import {
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  chakra,
} from '@chakra-ui/react';
import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import * as React from 'react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';

const data = [
  {
    id: '5fef3c4b-35b8-4290-8f7a-7ce8644741bd',
    sessions: 1,
    date: '1/22/2023',
    topSpeed: 164,
    ballsBowled: 94,
  },
  {
    id: '3df381aa-7d04-4b44-9ec8-c2b3d0b96a34',
    sessions: 2,
    date: '5/11/2022',
    topSpeed: 195,
    ballsBowled: 15,
  },
  {
    id: '437fc3b8-013b-4bcc-af62-fb74641d3f4a',
    sessions: 3,
    date: '10/4/2022',
    topSpeed: 151,
    ballsBowled: 46,
  },
  {
    id: '765acf17-08e2-4927-9ee4-526696c16e9a',
    sessions: 4,
    date: '4/6/2023',
    topSpeed: 187,
    ballsBowled: 27,
  },
  {
    id: 'b5ddf4c0-6957-446c-b0a2-84e3930be670',
    sessions: 5,
    date: '3/27/2023',
    topSpeed: 53,
    ballsBowled: 89,
  },
  {
    id: 'f39f6bba-cce9-4368-ae34-9e4634f1d62d',
    sessions: 6,
    date: '6/30/2022',
    topSpeed: 150,
    ballsBowled: 57,
  },
  {
    id: '13b18c0d-75bf-45fa-a84e-ab862dc96053',
    sessions: 7,
    date: '8/14/2022',
    topSpeed: 199,
    ballsBowled: 40,
  },
  {
    id: '7d710fa7-4f3b-4766-9eb0-5f10cff55a65',
    sessions: 8,
    date: '10/24/2022',
    topSpeed: 96,
    ballsBowled: 36,
  },
  {
    id: '1e27b6c0-c9db-4038-a656-3c50f7023393',
    sessions: 9,
    date: '3/28/2023',
    topSpeed: 122,
    ballsBowled: 61,
  },
  {
    id: 'eba0e253-bd82-48d1-91a3-6cb78d69faef',
    sessions: 10,
    date: '4/27/2022',
    topSpeed: 66,
    ballsBowled: 38,
  },
];

type Props = {};

export default function SessionsTable({}: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columnHelper = createColumnHelper<typeof data[0]>();

  const columns = [
    columnHelper.accessor('sessions', {
      cell: (info) => `Session ${info.getValue()}`,
      header: 'Sessions',
    }),
    columnHelper.accessor('date', {
      cell: (info) => format(new Date(info.getValue()), 'd MMMM yyyy, h:mm aa'),
      header: 'Date',
    }),
    columnHelper.accessor('topSpeed', {
      cell: (info) => info.getValue(),
      header: 'Top Speed (km/h)',
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor('ballsBowled', {
      cell: (info) => info.getValue(),
      header: 'Balls Bowled',
      meta: {
        isNumeric: true,
      },
    }),
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Flex
      mx={10}
      mb={10}
      direction='column'
      bg='white'
      borderRadius='2xl'
      p={10}
    >
      <Heading fontSize='2xl' color='gray.600' fontWeight='black' mb={5}>
        Sessions
      </Heading>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta: any = header.column.columnDef.meta;
                return (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    isNumeric={meta?.isNumeric}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    <chakra.span>
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === 'desc' ? (
                          <GoTriangleDown
                            aria-label='sorted descending'
                            style={{ display: 'inline' }}
                          />
                        ) : (
                          <GoTriangleUp
                            aria-label='sorted ascending'
                            style={{ display: 'inline' }}
                          />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                if (cell.column.id === 'sessions') {
                  return (
                    <Td
                      key={cell.id}
                      fontWeight={'bold'}
                      fontFamily={'body'}
                      color={'gray.500'}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                }
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta: any = cell.column.columnDef.meta;
                return (
                  <Td
                    key={cell.id}
                    isNumeric={meta?.isNumeric}
                    fontWeight={'normal'}
                    fontFamily={'mono'}
                    color={'gray.700'}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
}
