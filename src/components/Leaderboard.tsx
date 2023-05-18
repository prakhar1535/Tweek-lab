import {
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Tbody,
  Td,
  Text,
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
import * as React from 'react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { Card, CardHeader } from './Card';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';

const data = [
  {
    id: '7283a153-bb33-4b4e-ad61-72da38dc0b5d',
    name: 'Esthera Jackson',
    ballSpeed: 100,
    runUp: 1.5,
    jump: 0.2,
    bfc: 0.2,
    ffc: 0.3,
    release: 25,
  },
  {
    id: '8c2953ea-383b-4140-be7f-5c29720dc9dd',
    name: 'Alexa Liras',
    ballSpeed: 101,
    runUp: 1.6,
    jump: 0.3,
    bfc: 0.3,
    ffc: 0.4,
    release: 26,
  },
  {
    id: '939fce2f-253f-41ed-aff2-438ed6022813',
    name: 'Laurent Michael',
    ballSpeed: 102,
    runUp: 1.7,
    jump: 0.4,
    bfc: 0.4,
    ffc: 0.5,
    release: 27,
  },
  {
    id: '94348283-47a9-4a70-9f39-ce1044f61d49',
    name: 'Freduardo Hill',
    ballSpeed: 103,
    runUp: 1.8,
    jump: 0.5,
    bfc: 0.5,
    ffc: 0.6,
    release: 28,
  },
  {
    id: '3e07a410-2387-4d64-a19a-4f155de27753',
    name: 'Daniel Thomas',
    ballSpeed: 104,
    runUp: 1.9,
    jump: 0.6,
    bfc: 0.6,
    ffc: 0.7,
    release: 29,
  },
];

type Props = {};

export default function Leaderboard({}: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filteredData, setFilteredData] = React.useState(data);

  const playerColumnHelper = createColumnHelper<typeof filteredData[0]>();

  const columns = [
    playerColumnHelper.accessor('name', {
      cell: (info) => info.getValue(),
      header: 'Name',
    }),
    playerColumnHelper.accessor('ballSpeed', {
      cell: (info) => info.getValue(),
      header: 'Ball Speed (kmph)',
      meta: {
        isNumeric: true,
      },
    }),
    playerColumnHelper.accessor('runUp', {
      cell: (info) => info.getValue(),
      header: 'Run Up (m)',
      meta: {
        isNumeric: true,
      },
    }),
    playerColumnHelper.accessor('jump', {
      cell: (info) => info.getValue(),
      header: 'Jump (m)',
      meta: {
        isNumeric: true,
      },
    }),
    playerColumnHelper.accessor('bfc', {
      cell: (info) => info.getValue(),
      header: 'BFC (s)',
      meta: {
        isNumeric: true,
      },
    }),
    playerColumnHelper.accessor('ffc', {
      cell: (info) => info.getValue(),
      header: 'FFC (s)',
      meta: {
        isNumeric: true,
      },
    }),
    playerColumnHelper.accessor('release', {
      cell: (info) => info.getValue(),
      header: 'Release (100)',
      meta: {
        isNumeric: true,
      },
    }),
  ];

  const table = useReactTable({
    columns,
    data: filteredData,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const [search, setSearch] = React.useState<string>('');

  React.useEffect(() => {
    // Filter the data based on the search string
    if (search.trim() == '') {
      setFilteredData(data);
      return;
    }
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filteredData);
  }, [search]);

  return (
    <Card marginTop={15}>
      <CardHeader mb={2}>
        <Flex direction='column' alignSelf='flex-start'>
          <Text fontSize='lg' color='gray.700' fontWeight='bold' mb='6px'>
            Leaderboard
          </Text>
        </Flex>
      </CardHeader>
      <FormControl>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            height={8}
            // eslint-disable-next-line react/no-children-prop
            children={<HiMagnifyingGlass color='gray.800' />}
          />
          <Input
            size='sm'
            borderRadius={6}
            placeholder='Search Name...'
            variant='filled'
            width='xs'
            mb={8}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </FormControl>
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
                if (cell.column.id === 'name') {
                  return (
                    <Td
                      key={cell.id}
                      fontWeight={'bold'}
                      fontFamily={'body'}
                      color={'gray.500'}
                    >
                      <Link
                        as={NextLink}
                        href={`/player/${cell.row.original.id}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Link>
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
    </Card>
  );
}
