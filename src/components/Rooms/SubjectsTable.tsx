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

const SubjectsTable = () => {
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
                  Programme
                </TableCell>
                <TableCell style={{ width: 30 }} align="left">
                  Hours
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
                <TableRow>
                  <TableCell align="left">Lecture Hours</TableCell>
                  <TableCell align="left">1</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">4</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">4</TableCell>
                  <TableCell align="right">5</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">2</TableCell>
                  <TableCell align="right">8</TableCell>
                  <TableCell align="right">7</TableCell>
                  <TableCell align="right">6</TableCell>
                  <TableCell align="right">8</TableCell>
                  <TableCell align="right">8</TableCell>
                  <TableCell align="right">7</TableCell>
                  <TableCell align="right">6</TableCell>
                  <TableCell align="right">7</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">3{"<"}</TableCell>
                  <TableCell align="right">1</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">4</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">4</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="left">Lab Hours</TableCell>
                  <TableCell align="left">1</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">5</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">2</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">5</TableCell>
                  <TableCell align="right">8</TableCell>
                  <TableCell align="right">8</TableCell>
                  <TableCell align="right">8</TableCell>
                  <TableCell align="right">8</TableCell>
                  <TableCell align="right">9</TableCell>
                  <TableCell align="right">9</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">3{"<"}</TableCell>
                  <TableCell align="right">1</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">4</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">4</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="left">Tutorial Hours</TableCell>
                  <TableCell align="left">1</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">5</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">2</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">5</TableCell>
                  <TableCell align="right">8</TableCell>
                  <TableCell align="right">8</TableCell>
                  <TableCell align="right">8</TableCell>
                  <TableCell align="right">8</TableCell>
                  <TableCell align="right">9</TableCell>
                  <TableCell align="right">9</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">3{"<"}</TableCell>
                  <TableCell align="right">1</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">4</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">4</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    </div>
  );
};

export default SubjectsTable;
