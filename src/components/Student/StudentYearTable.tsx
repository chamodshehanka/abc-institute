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

const StudentYearTable = () => {
    return (
        <div>
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
            {/* {workingDays.map((w: WorkingDays) => (
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
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
        </div>
    );
}

export default StudentYearTable;
