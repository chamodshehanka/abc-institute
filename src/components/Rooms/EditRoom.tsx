import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { addBuilding } from "../../api/buildings/buildings.request";
import { BuildingsCreateData } from "../../api/interfaces";

export interface EditRoomProps {
  buildingName: string;
  roomName: string;
}

const EditRoom: React.SFC<EditRoomProps> = ({
  buildingName,
  roomName,
}: EditRoomProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const { register, handleSubmit, reset } = useForm();

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
            <DialogContentText>Building Name: {buildingName}</DialogContentText>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
            >
              <FormControlLabel
                value="Lecture Hall"
                control={<Radio color="primary" />}
                label="Lecture Hall"
                checked
              />
              <FormControlLabel
                value="Laboratory"
                control={<Radio color="primary" />}
                label="Laboratory"
              />
            </RadioGroup>
            <DialogContentText>Room Name</DialogContentText>
            <TextField
              name="building"
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
