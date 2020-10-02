import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { addRooms } from "../../api/rooms/rooms.request";
import { RoomsCreateData } from "../../api/interfaces";
import { withStyles } from "@material-ui/core/styles";

export interface ManageAddRoomProps {
  buildingName: string;
}

const AddRoom: React.SFC<ManageAddRoomProps> = ({
  buildingName,
}: ManageAddRoomProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory();

  const onSubmit = (data) => {
    console.log(data);
    const room: RoomsCreateData = {
      building: data?.building,
      roomType: data?.roomType,
      name: data?.name,
    };

    addRooms(room)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    handleClose();
    history.push("/student-home-screen");
    history.push("/locations-screen");
  };

  const { register, handleSubmit, errors } = useForm();

  const BootstrapButton = withStyles({
    root: {
      boxShadow: "none",
      textTransform: "none",
      fontSize: 12,
      padding: "5px 10px",
      border: "1px solid",
      lineHeight: 1.5,
      backgroundColor: "#0075FF",
      borderColor: "#0075FF",
      borderRadius: "30px",
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:hover": {
        backgroundColor: "#0075FF",
        borderColor: "#0075FF",
        boxShadow: "none",
      },
      "&:active": {
        boxShadow: "none",
        backgroundColor: "#0075FF",
        borderColor: "#0075FF",
      },
      "&:focus": {
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
      },
    },
  })(Button);
  return (
    <React.Fragment>
      <BootstrapButton
        size="small"
        onClick={handleClickOpen}
        style={{ color: "white" }}
      >
        <AddIcon
          style={{
            color: "white",
            float: "right",
            fontSize: "20",
            backgroundColor: "0075FF",
          }}
        />
        Room
      </BootstrapButton>

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
          Add a Room
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <DialogContentText>
              Building &nbsp;&nbsp;
              <TextField
                name="building"
                inputRef={register({ required: true })}
                value={buildingName}
                variant="outlined"
                size="small"
              ></TextField>
              {errors.building && (
                <span style={{ color: "red" }}>This Field is Required</span>
              )}
            </DialogContentText>
            <RadioGroup
              row
              aria-label="position"
              name="roomType"
              defaultValue="top"
              ref={register({ required: true })}
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
              inputRef={register({ required: true })}
              variant="outlined"
              fullWidth
              margin="dense"
            ></TextField>
            {errors.name && (
              <span style={{ color: "red" }}>This Field is Required</span>
            )}
            <DialogActions>
              <Button type="submit" color="primary">
                Add
              </Button>
              <Button
                onClick={() => {
                  handleClose();
                  history.push("/student-home-screen");
                  history.push("/locations-screen");
                }}
                color="primary"
              >
                Close
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default AddRoom;
