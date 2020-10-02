import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";

import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Button,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { deleteTags, updateTags } from "../../api/student/tags.request";
import { useHistory, useLocation } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TagsUpdateData } from "../../api/interfaces";
import { Tags } from "../../models/Tags";

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

export interface ManageTagsProps {
  tags: Tags[];
}

const ManageTagsTable: React.SFC<ManageTagsProps> = ({
  tags,
}: ManageTagsProps) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [update, setUpdate] = React.useState(false);
  const [tag, selectTag] = React.useState(Object);

  const [editTags] = useState<Tags | undefined>(() => {
    return location?.state as Tags | undefined;
  });

  const { register, handleSubmit, errors } = useForm({
    defaultValues: editTags,
  });

  const onSubmit = (data: any) => {
    const Tags: TagsUpdateData = {
      _id: data?._id as string,
      name: data?.name,
      rooms: [],
    };
    console.log("values2", data);
    updateTags(Tags)
      .then((res) => {
        console.log(res);
        history.push("/student-home-screen");
        history.push("/tags-screen");
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
    deleteTags(e)
      .then((res) => {
        console.log(res);
        history.push("/student-home-screen");
        history.push("/tags-screen");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tablerow}>Tag Name</TableCell>
              <TableCell className={classes.tablerow} align="right">
                Edit
              </TableCell>
              <TableCell className={classes.tablerow} align="right">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags.map((w: Tags) => (
              <TableRow key={w._id}>
                <TableCell component="th" scope="row">
                  {w.name}
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      selectTag(w);
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
                  value={tag._id}
                />
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder={tag.name}
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
                      history.push("/student-home-screen");
                      history.push("/tags-screen");
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

export default ManageTagsTable;
