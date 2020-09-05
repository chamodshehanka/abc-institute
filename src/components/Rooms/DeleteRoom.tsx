import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import { useForm } from "react-hook-form";
import { deleteRooms } from "../../api/rooms/rooms.request";

export interface ManageDeleteRoomProps {
  _id: string;
}

const DeleteRoom: React.SFC<ManageDeleteRoomProps> = ({
  _id,
}: ManageDeleteRoomProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    deleteRooms(_id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
    handleClose();
  };

  const { handleSubmit } = useForm();

  return (
    <React.Fragment>
      <DeleteOutlineIcon
        onClick={handleClickOpen}
        style={{
          float: "right",
          fontSize: "20",
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
          Delete Room
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete the Room?
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
    </React.Fragment>
  );
};

export default DeleteRoom;
