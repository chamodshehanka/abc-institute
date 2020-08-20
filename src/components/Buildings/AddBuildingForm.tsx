import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { addBuilding } from "../../api/buildings/buildings.request";
import { BuildingsCreateData } from "../../api/interfaces";

export default function AddBuildingForm() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    const buidling: BuildingsCreateData = {
      name: data?.name,
    };

    addBuilding(buidling)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const { register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <AddCircleIcon
        onClick={handleClickOpen}
        style={{
          color: "0075FF",
          float: "right",
          fontSize: "40",
        }}
      />

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
          Add a Building
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Building Name</DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              name="name"
              inputRef={register}
              variant="outlined"
              fullWidth
              margin="dense"
            ></TextField>
            <DialogActions>
              <Button type="submit" color="primary">
                Save
              </Button>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
