import React, { useState } from "react";
import { Buildings } from "../../models/Buildings";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
//import UpdateBuildingForm from "../../components/Buildings/UpdateBuildingForm";
import { deleteBuilding } from "../../api/buildings/buildings.request";
import { useForm } from "react-hook-form";

import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

export interface ManageBuildingProps {
  buildings: Buildings[];
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    height: "230px",
  },
});

const ManageBuilding: React.SFC<ManageBuildingProps> = ({
  buildings,
}: ManageBuildingProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const [building, setBuilding] = useState<Buildings>(Object);

  const handleBuilding = (i) => {
    setBuilding(buildings[i]);
    console.log(building);
  };

  const { handleSubmit } = useForm();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    handleBuilding(event.currentTarget.value);
  };

  const onSubmit = () => {
    setOpen(false);
    console.log(building);
    deleteBuilding(building?._id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <div>
      <>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table
              size="small"
              stickyHeader
              aria-label="sticky table"
              className="table-first-cell-padded"
            >
              <TableHead>
                <TableCell>Buildings</TableCell>

                <TableCell style={{ width: 100 }} align="right">
                  Edit
                </TableCell>
                <TableCell style={{ width: 100 }} align="right">
                  Delete
                </TableCell>
              </TableHead>
              <TableBody>
                {buildings.map((b: Buildings, index: number) => (
                  <TableRow key={b._id}>
                    <TableCell component="th" scope="row">
                      {b.name}
                    </TableCell>

                    <TableCell style={{ width: 100 }} align="right">
                      {/* <UpdateBuildingForm /> */}
                    </TableCell>
                    <TableCell style={{ width: 100 }} align="right">
                      <Button
                        value={index}
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <DeleteOutlineIcon onClick={handleClickOpen} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Dialog
          fullWidth
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle
            id="max-width-dialog-title"
            style={{ textAlign: "center" }}
          >
            Delete Building
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure to delete the building?
            </DialogContentText>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <DialogActions>
                <Button type="submit" color="primary">
                  Yes
                </Button>
                <Button onClick={handleClose} color="primary">
                  No
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
};

export default ManageBuilding;
