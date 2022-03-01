/* eslint-disable react/jsx-key */
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTable, useSortBy, Column } from 'react-table';

import { SmartAssistEventsData, SmartAssistEventRow } from '../../api/getSmartAssistEvents';

export const SmartAssistEventsTable = ({ input }: any) => {
  const data: SmartAssistEventsData = useMemo(() => input, [input]);
  const columns: Array<Column<SmartAssistEventRow>> = useMemo(
    () => [
      {
        Header: 'event_id',
        accessor: 'event_id', // accessor is the "key" in the data
        show: false,
      },
      {
        Header: 'Session #',
        accessor: 'sa_session_number',
        isNumeric: true,
      },
      {
        Header: 'Stage',
        accessor: 'stage',
      },
      {
        Header: 'Activity',
        accessor: 'activity_code',
      },
      {
        Header: 'Summary',
        accessor: 'event_summary',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ['event_id'],
      },
    },
    useSortBy
  );

  return (
    <Table size="xs" fontSize="xs" {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th>{column.render('Header')}</Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
