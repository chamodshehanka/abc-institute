import React, { useState } from "react";
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
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
// import {deleteYearSemester} from "../../api/student/year.request";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

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

  const [deleteDialog, setDeleteDialog] = useState(false);

  const handleDeleteDialogOpen = () => {
    setDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialog(false);
  };

  // const handleDeleteAction = () => {
  //   deleteYearSemester(yearSemester?._id)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => console.error(err));
  // };

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
                  <Button onClick={handleDeleteDialogOpen}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog
          open={deleteDialog}
          onClose={handleDeleteDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Working Day"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {/* Are you sure to delete {yearSemester?.year} ? */}
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            {/* <button className="btn btn-primary" onClick={handleDeleteAction}>
              Yes
            </button>
            <button className="btn btn-danger" onClick={handleDeleteDialogOpen}>
              Cancel
            </button> */}
          </DialogActions>
        </Dialog>
      </TableContainer>
    </>
  );
};

export default ManageYearTable;
