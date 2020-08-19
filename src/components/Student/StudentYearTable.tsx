
import React from 'react';
import { YearSemester } from '../../models/yearSemester';
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

export interface ManageYearProps {
  yearSemester: YearSemester[];
}

const ManageYearTable: React.SFC<ManageYearProps> = ({
  yearSemester,
}: ManageYearProps) => {
//   const getNoOfWorkingDays = (s) => (number) => {
//     console.log(s);
//     return 77;
//   };

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
            <TableCell>No of Wokring Days</TableCell>
            <TableCell>No of Working Hours</TableCell>
            <TableCell></TableCell>
          </TableHead>
          <TableBody>
            {yearSemester.map((w: YearSemester) => (
              <TableRow key={w._id}>
                <TableCell>{w.year}</TableCell>
                <TableCell>
                </TableCell>
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

export default ManageYearTable;

