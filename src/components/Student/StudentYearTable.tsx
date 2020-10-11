import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import {
  deleteYearSemester,
  updateYearSemester,
} from "../../api/student/year.request";
import { useHistory, useLocation } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { YearSemesterUpdateData } from "../../api/interfaces";
import { YearSemester } from "../../models/yearSemester";

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
  const history = useHistory();

  const location = useLocation();

  const [update, setUpdate] = React.useState(false);
  const [year, selectYear] = React.useState(Object);

  const [editTags] = useState<YearSemester | undefined>(() => {
    return location?.state as YearSemester | undefined;
  });

  const { register, handleSubmit } = useForm({
    defaultValues: editTags,
  });

  const onSubmit = (data: any) => {
    const YearSemester: YearSemesterUpdateData = {
      _id: data?._id as string,
      year: data?.year,
      semester: data?.semester,
    };
    console.log("values2", data);
    updateYearSemester(YearSemester)
      .then((res) => {
        console.log(res);
        history.push("/student-home-screen");
        history.push("/student-year-screen");
      })
      .catch((err) => console.error(err));
  };

  const handleUpdateOpen = () => {
    setUpdate(true);
  };

  const handleUpdateClose = () => {
    setUpdate(false);
  };

  const handleDeleteAction = (e) => {
    deleteYearSemester(e)
      .then((res) => {
        console.log(res);
        history.push("/student-home-screen"); 
        history.push("/student-year-screen");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
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
                  <Button
                    onClick={() => {
                      selectYear(w);
                      handleUpdateOpen();
                    }}
                  >
                    <EditIcon />
                  </Button>
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <Button onClick={() => handleDeleteAction(w._id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog
          open={update}
          onClose={handleUpdateClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Update Tags"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label htmlFor="txtyear" className="form-label">
                  Year
                </label>
                <input
                  type="hidden"
                  name="_id"
                  ref={register}
                  value={year._id}
                />
                <input
                  type="text"
                  className="form-control"
                  id="year"
                  placeholder={year.year}
                  name="year"
                  ref={register}
                />
                <label htmlFor="txtSem" className="form-label">
                  Semester
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="semester"
                  value={year.semester}
                  name="semester"
                  ref={register}
                />
                <div className="align-right" style={{ alignContent: "right" }}>
                  <button type="submit" className="btn btn-primary btn-abc">
                    Save
                  </button>{" "}
                  <button
                    type="button"
                    className="btn btn-danger btn-abc"
                    onClick={() => {
                      history.push("/student-home-screen");
                      history.push("/student-year-screen");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </TableContainer>
    </>
  );
};

export default ManageYearTable;
