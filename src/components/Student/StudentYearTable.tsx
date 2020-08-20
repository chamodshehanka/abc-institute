import React from "react";
import { YearSemester } from "../../models/yearSemester";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },

  tablerow: {
    fontWeight: "bolder",
    fontSize: 15,
    color: "black",
  },
});

export interface ManageYearProps {
  yearSemester: YearSemester[];
}

const ManageYearTable: React.SFC<ManageYearProps> = ({
  yearSemester,
}: ManageYearProps) => {
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tablerow}>
                Year & Semester
              </TableCell>
              <TableCell className={classes.tablerow} align="right">
                Edit
              </TableCell>
              <TableCell className={classes.tablerow} align="right">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {yearSemester.map((w: YearSemester) => (
              <TableRow key={w._id}>
                <TableCell component="th" scope="row">
                  {w.year}.{w.semester}
                </TableCell>
                <TableCell align="right">
                  <Button>
                    <EditIcon />
                  </Button>
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <Button>
                    <DeleteIcon />
                  </Button>
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
