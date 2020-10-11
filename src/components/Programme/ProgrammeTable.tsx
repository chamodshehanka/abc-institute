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
  deleteProgramme,
  updateProgramme,
} from "../../api/student/programme.request";
import { useHistory, useLocation } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ProgrammeUpdateData } from "../../api/interfaces";
import { Programme } from "../../models/Programme";
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

export interface ManageProgrammeProps {
  programme: Programme[];
}

const ManageProgrammeTable: React.SFC<ManageProgrammeProps> = ({
  programme,
}: ManageProgrammeProps) => {
  const classes = useStyles();
  const history = useHistory();

  const location = useLocation();

  const [update, setUpdate] = React.useState(false);
  const [programmes, selectprogramme] = React.useState(Object);

  const [editTags] = useState<Programme | undefined>(() => {
    return location?.state as Programme | undefined;
  });

  const { register, handleSubmit, errors } = useForm({
    defaultValues: editTags,
  });

  const onSubmit = (data: any) => {
    const Programme: ProgrammeUpdateData = {
      _id: data?._id as string,
      name: data?.name,
    };
    console.log("values2", data);
    updateProgramme(Programme)
      .then((res) => {
        console.log(res);
        history.push("student-year-screen");
        history.push("programme-screen");
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
    deleteProgramme(e)
      .then((res) => {
        console.log(res);
        history.push("student-year-screen");
        history.push("programme-screen");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tablerow}>Programme Name</TableCell>
              <TableCell className={classes.tablerow} align="right">
                Edit
              </TableCell>
              <TableCell className={classes.tablerow} align="right">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {programme.map((w: Programme) => (
              <TableRow key={w._id}>
                <TableCell component="th" scope="row">
                  {w.name}
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      selectprogramme(w);
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
                  Name
                </label>
                <input
                  type="hidden"
                  name="_id"
                  ref={register}
                  value={programmes._id}
                />
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder={programmes.name}
                  ref={register({ required: true })}
                />
                {errors.name && (
                  <span style={{ color: "red" }}>This Field is Required</span>
                )}
                <div className="align-right" style={{ alignContent: "right" }}>
                  <button type="submit" className="btn btn-primary btn-abc">
                    Save
                  </button>{" "}
                  <button
                    type="button"
                    className="btn btn-danger btn-abc"
                    onClick={() => {
                      history.push("student-year-screen");
                      history.push("programme-screen");
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

export default ManageProgrammeTable;
