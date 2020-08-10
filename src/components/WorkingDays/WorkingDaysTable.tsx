import React from 'react';
import { WorkingDays } from '../../models/WorkingDays';
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

export interface ManageWorkingDaysTableProps {
  workingDays: WorkingDays[];
}

const ManageWorkingDaysTable: React.SFC<ManageWorkingDaysTableProps> = ({
  workingDays,
}: ManageWorkingDaysTableProps) => {
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
            {workingDays.map((w: WorkingDays) => (
              <TableRow key={w._id}>
                <TableCell>{w.name}</TableCell>
                <TableCell>
                  <Chip
                    size='small'
                    color='primary'
                    label={<span>{w.selectedDays.friday ? '3' : '5'}</span>}
                  />
                </TableCell>
                <TableCell>
                  <Chip size='small' color='secondary' label={<span>5</span>} />
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

export default ManageWorkingDaysTable;
