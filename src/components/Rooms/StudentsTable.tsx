import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    height: "230px",
  },
});
function createData(
  name: string,
  c1: number,
  c2: number,
  c3: number,
  c4: number,
  c5: number,
  c6: number,
  c7: number,
  c8: number
) {
  return { name, c1, c2, c3, c4, c5, c6, c7, c8 };
}

const rows = [
  createData("Malabe", 750, 750, 1500, 1500, 1250, 1200, 750, 600),
  createData("Metro", 200, 200, 350, 300, 150, 100, 100, 90),
  createData("Kurunegala", 80, 60, 0, 0, 0, 0, 0, 0),
  createData("Kandy", 120, 100, 80, 75, 0, 0, 0, 0),
  createData("Matara", 80, 50, 35, 30, 0, 0, 0, 0),
  createData("Jaffna", 50, 40, 40, 30, 0, 0, 0, 0),
];
const StudentsTable = () => {
  const classes = useStyles();
  return (
    <div>
      <>
        <div className={classes.root}>
          <TableContainer className={classes.container}>
            <Table
              size="small"
              stickyHeader
              aria-label="sticky table"
              className="table-first-cell-padded"
            >
              <TableHead>
                <TableCell style={{ width: 30 }} align="left">
                  Centre
                </TableCell>
                <TableCell style={{ width: 30 }} align="right">
                  Y1S1
                </TableCell>
                <TableCell style={{ width: 30 }} align="right">
                  Y1S2
                </TableCell>
                <TableCell style={{ width: 30 }} align="right">
                  Y2S1
                </TableCell>
                <TableCell style={{ width: 30 }} align="right">
                  Y2S2
                </TableCell>
                <TableCell style={{ width: 30 }} align="right">
                  Y3S1
                </TableCell>
                <TableCell style={{ width: 30 }} align="right">
                  Y3S2
                </TableCell>
                <TableCell style={{ width: 30 }} align="right">
                  Y4S1
                </TableCell>
                <TableCell style={{ width: 30 }} align="right">
                  Y4S2
                </TableCell>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="right">{row.c1}</TableCell>
                    <TableCell align="right">{row.c2}</TableCell>
                    <TableCell align="right">{row.c3}</TableCell>
                    <TableCell align="right">{row.c4}</TableCell>
                    <TableCell align="right">{row.c5}</TableCell>
                    <TableCell align="right">{row.c6}</TableCell>
                    <TableCell align="right">{row.c7}</TableCell>
                    <TableCell align="right">{row.c8}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    </div>
  );
};

export default StudentsTable;
