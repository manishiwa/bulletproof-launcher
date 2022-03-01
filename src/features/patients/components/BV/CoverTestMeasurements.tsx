/* eslint-disable react/jsx-key */
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { keyBy } from 'lodash';
import { useMemo } from 'react';
import { useTable, useSortBy, Column, Row } from 'react-table';

import { MeasurementsRow, MeasurementsData } from '../../api/getMeasurements';

export const CoverTestMeasurementsTable = ({ input }: any) => {
  const data: MeasurementsData = useMemo(() => input, [input]);
  // eslint-disable-next-line
  const columns: Array<Column<MeasurementsRow>> = useMemo(
    // eslint-disable-next-line
    () => [
      {
        Header: 'measurement_id',
        id: 'measurement_id',
        accessor: 'measurement_id',
      },
      {
        Header: 'Eye',
        accessor: (row) => row.measurements_json.Eye,
      },
      {
        Header: 'Distance',
        accessor: (row) => row.measurements_json.Distance,
      },
      {
        Header: 'Direction',
        accessor: (row) => row.measurements_json.Direction,
      },
      {
        Header: 'Tropia',
        accessor: (row) => row.measurements_json.Tropia,
      },
      {
        Header: 'Magnitude',
        accessor: (row) => row.measurements_json.Magnitude,
      },
      {
        Header: 'Type',
        accessor: (row) => row.measurements_json.Type,
      },
      {
        Header: 'Subtype',
        accessor: (row) => row.measurements_json.Subtype,
      },
      {
        Header: 'Comitancy',
        accessor: (row) => row.measurements_json.Comitancy,
      },
      {
        Header: 'Edit',
        // eslint-disable-next-line
        accessor: (row) =>
          (
          <Button
            size="sm"
            onClick={() => {
              console.log(row.measurement_id);
            }}
          >
            edit
          </Button>
        ),
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ['measurement_id'],
      },
    },
    useSortBy
  );
  return (
    <Table size="sm" fontSize="sm" {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => {
          const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
          return (
            <Tr key={key} {...restHeaderGroupProps}>
              {headerGroup.headers.map((column) => {
                const { key, ...restColumn } = column.getHeaderProps();
                return (
                  <Th key={key} {...restColumn}>
                    {column.render('Header')}
                  </Th>
                );
              })}
            </Tr>
          );
        })}
      </Thead>
      <Tbody {...getTableBodyProps}>
        {rows.map((row) => {
          prepareRow(row);
          const { key, ...restRowProps } = row.getRowProps();
          return (
            <Tr key={key} {...restRowProps}>
              {row.cells.map((cell) => {
                const { key, ...restCellProps } = cell.getCellProps();
                return (
                  <Td key={key} {...restCellProps}>
                    {cell.render('Cell')}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
