import React, { useState } from "react";
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
  deleteNotAvailable,
  updateNotAvailable,
} from "../../api/student/notAvailable.requets";
import { useHistory, useLocation } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { NotAvailableUpdateData } from "../../api/interfaces";
import { NotAvailable } from "../../models/NotAvailable";
import { useForm } from "react-hook-form";

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

export interface ManageNotAvailabletblProps {
  notabl: NotAvailable[];
}

const ManageNotAvailabletbl: React.SFC<ManageNotAvailabletblProps> = ({
  notabl,
}: ManageNotAvailabletblProps) => {
  const classes = useStyles();
  const history = useHistory();

  const location = useLocation();

  const [update, setUpdate] = React.useState(false);
  const [notAvailables, selectnotAvailables] = React.useState(Object);

  const [editTags] = useState<NotAvailable | undefined>(() => {
    return location?.state as NotAvailable | undefined;
  });

  const { register, handleSubmit, errors } = useForm({
    defaultValues: editTags,
  });

  const onSubmit = (data: any) => {
    const notabl: NotAvailableUpdateData = {
      _id: data?._id as string,
      type: data?.type,
      typeId: data?.typeId,
      name: data?.name,
      day: data?.day,
      stime: data?.stime,
      ltime: data?.ltime,
    };
    console.log("values2", data);
    updateNotAvailable(notabl)
      .then((res) => {
        console.log(res);
        history.push("student-year-screen");
        history.push("not-available-screen");
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
    deleteNotAvailable(e)
      .then((res) => {
        console.log(res);
        history.push("student-year-screen");
        history.push("not-available-screen");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tablerow}>Type</TableCell>
              <TableCell className={classes.tablerow}>Type ID</TableCell>
              <TableCell className={classes.tablerow}>Name</TableCell>
              <TableCell className={classes.tablerow}>Date</TableCell>
              <TableCell className={classes.tablerow}>Start Time</TableCell>
              <TableCell className={classes.tablerow}>End Time</TableCell>
              <TableCell className={classes.tablerow} align="right">
                Edit
              </TableCell>
              <TableCell className={classes.tablerow} align="right">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notabl.map((w: NotAvailable) => (
              <TableRow key={w._id}>
                <TableCell component="th" scope="row">
                  {w.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {w.typeId}
                </TableCell>
                <TableCell component="th" scope="row">
                  {w.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {w.day}
                </TableCell>
                <TableCell component="th" scope="row">
                  {w.stime}
                </TableCell>
                <TableCell component="th" scope="row">
                  {w.ltime}
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      selectnotAvailables(w);
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
                <label htmlFor="txtName" className="form-label">
                  Date :
                </label>
                <input
                  type="hidden"
                  name="_id"
                  ref={register}
                  value={notAvailables._id}
                />
                <input
                  type="text"
                  className="form-control"
                  id="day"
                  name="day"
                  placeholder={notAvailables.day}
                  ref={register({ required: true })}
                />
                {errors.name && (
                  <span style={{ color: "red" }}>This Field is Required</span>
                )}

                <label htmlFor="txtName" className="form-label">
                  Start Time :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="stime"
                  name="stime"
                  placeholder={notAvailables.stime}
                  ref={register({ required: true })}
                />
                {errors.name && (
                  <span style={{ color: "red" }}>This Field is Required</span>
                )}

                <label htmlFor="txtName" className="form-label">
                  End Time :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ltime"
                  name="ltime"
                  placeholder={notAvailables.ltime}
                  ref={register({ required: true })}
                />
                {errors.name && (
                  <span style={{ color: "red" }}>This Field is Required</span>
                )}

                <div className="align-right" style={{ alignContent: "right" }}>
                  <button type="submit" className="btn btn-primary btn-abc">
                    Update
                  </button>{" "}
                  <button
                    type="button"
                    className="btn btn-danger btn-abc"
                    onClick={() => {
                      history.push("student-year-screen");
                      history.push("not-available-screen");
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

export default ManageNotAvailabletbl;
