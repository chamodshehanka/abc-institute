import React from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Chip,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Timetable } from '../../models/Timetable';

export interface TimetableTableProps {
  timetables: Timetable[];
}

const TimetableTable: React.SFC<TimetableTableProps> = ({
  timetables,
}: TimetableTableProps) => {
  return (
    <>
      <TableContainer className='table-container expandable-table-container'>
        <Table
          size='small'
          stickyHeader
          aria-label='sticky table'
          className='table-first-cell-padded'
        >
          <TableHead>
            <TableCell>Name</TableCell>
            <TableCell></TableCell>
          </TableHead>

          <TableBody>
            {timetables.map((t: Timetable) => (
              <TableRow key={t._id}>
                <TableCell>{t.name}</TableCell>

                <TableCell>
                  <MenuIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TimetableTable;
