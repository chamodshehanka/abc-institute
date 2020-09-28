import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { Rooms } from "../../models/Rooms";
import { useHistory, useLocation } from "react-router-dom";
import { RoomsUpdateData } from "../../api/interfaces";
import { updateRooms } from "../../api/rooms/rooms.request";

export interface EditRoomProps {
  buildingName: string;
  roomName: string;
  roomID: string;
}

const EditRoom: React.SFC<EditRoomProps> = ({
  buildingName,
  roomName,
  roomID,
}: EditRoomProps) => {
  const [open, setOpen] = React.useState(false);

  const history = useHistory();
  const location = useLocation();

  const [editRoom] = useState<Rooms | undefined>(() => {
    return location?.state as Rooms | undefined;
  });

  const { register, handleSubmit } = useForm({
    defaultValues: editRoom,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    const rooms: RoomsUpdateData = {
      _id: roomID as string,
      buildingName: data?.buildingName,
      roomType: data?.roomType,
      name: data?.name,
    };
    console.log("values2", rooms);
    updateRooms(rooms)
      .then((res) => {
        console.log(res);
        handleClose();
        history.push("/student-home-screen");
        history.push("/locations-screen");
      })
      .catch((err) => console.error(err));
  };
  return (
    <React.Fragment>
      <EditIcon
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
          Edit Room
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <DialogContentText>Building Name: </DialogContentText>
            <TextField
              name="buildingName"
              inputRef={register}
              variant="outlined"
              fullWidth
              margin="dense"
              value={buildingName}
            ></TextField>
            <RadioGroup
              row
              aria-label="position"
              name="roomType"
              defaultValue="top"
            >
              <FormControlLabel
                value="Lecture Hall"
                control={<Radio color="primary" />}
                label="Lecture Hall"
                inputRef={register}
              />
              <FormControlLabel
                value="Laboratory"
                control={<Radio color="primary" />}
                label="Laboratory"
                inputRef={register}
              />
            </RadioGroup>
            <DialogContentText>Room Name</DialogContentText>
            <TextField
              name="name"
              inputRef={register}
              variant="outlined"
              fullWidth
              margin="dense"
              placeholder={roomName}
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
};

export default EditRoom;
