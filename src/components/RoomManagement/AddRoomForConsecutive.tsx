import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Autocomplete } from "@material-ui/lab";
import { useGetRooms } from "../../queries/useGetRooms";
import { withStyles } from "@material-ui/core/styles";
import { Checkbox, TextField } from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { useForm, NestedValue } from "react-hook-form";
import { Options } from "electron";
import { SessionUpdateData } from "../../api/interfaces";
import { updateSession } from "../../api/sessions/sessions.request";
import AddIcon from "@material-ui/icons/Add";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 12,
    padding: "5px 10px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#2A4BA5",
    borderColor: "#2A4BA5",
    borderRadius: "5px",
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

export interface AddRoomForConsecutiveProps {
  ID1: string;
  lecturers1: string[];
  tags1: string;
  group1: string;
  subject1: string;
  sCode1: string;
  noOfStd1: number;
  duration1: number;
  ID2: string;
  lecturers2: string[];
  tags2: string;
  group2: string;
  subject2: string;
  sCode2: string;
  noOfStd2: number;
  duration2: number;
}

const AddRoomForConsecutive: React.SFC<AddRoomForConsecutiveProps> = ({
  ID1,
  lecturers1,
  tags1,
  group1,
  subject1,
  sCode1,
  noOfStd1,
  duration1,
  ID2,
  lecturers2,
  tags2,
  group2,
  subject2,
  sCode2,
  noOfStd2,
  duration2,
}: AddRoomForConsecutiveProps) => {
  const [open, setOpen] = React.useState(false);
  const rooms = useGetRooms().data;
  const [selectedRoom, setSelectedRoom] = React.useState([]);

  const { register, handleSubmit, setValue } = useForm<{
    selectedRoom: NestedValue<Options[]>;
  }>({
    defaultValues: { selectedRoom: [] },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onSubmit = handleSubmit((data) => {
    const Session1: SessionUpdateData = {
      _id: ID1 as string,
      lecturers: lecturers1,
      tags: tags1,
      studentGroup: group1,
      subject: subject1,
      subjectCode: sCode1,
      noOfStudents: noOfStd1,
      duration: duration1,
      rooms: data.selectedRoom,
    };

    const Session2: SessionUpdateData = {
      _id: ID2 as string,
      lecturers: lecturers2,
      tags: tags2,
      studentGroup: group2,
      subject: subject2,
      subjectCode: sCode2,
      noOfStudents: noOfStd2,
      duration: duration2,
      rooms: data.selectedRoom,
    };

    updateSession(Session1)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));

    updateSession(Session2)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
    handleClose();
  });

  React.useEffect(() => {
    register("selectedRoom", {
      validate: (value) => value.length || "This is required.",
    });
  }, [register]);

  return (
    <>
      <BootstrapButton
        size="small"
        onClick={handleClickOpen}
        style={{ color: "white" }}
      >
        <AddIcon />
        <h5
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
          Add Rooms
        </DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <DialogActions>
              <Autocomplete
                fullWidth={true}
                multiple
                id="checkboxes-tags-demo"
                options={rooms || []}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                onChange={(e, rooms) => setValue("selectedRoom", rooms)}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                      size="small"
                      color="primary"
                    />
                    <div style={{ fontSize: "12px" }}> {option.name}</div>
                  </React.Fragment>
                )}
                style={{ width: 500 }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </DialogActions>
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
    </>
  );
};

export default AddRoomForConsecutive;
