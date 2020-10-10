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
import { SubGroupUpdateData } from "../../api/interfaces";
import { updateSubGroup } from "../../api/student/subGroup.request";

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

export interface RoomsForSubGroupProps {
  groupID: string;
  groupNum: string;
}

const RoomsForSubGroup: React.SFC<RoomsForSubGroupProps> = ({
  groupID,
  groupNum,
}: RoomsForSubGroupProps) => {
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
    const Group: SubGroupUpdateData = {
      _id: groupID as string,
      number: groupNum,
      rooms: data.selectedRoom,
    };
    console.log("values2", Group);
    updateSubGroup(Group)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
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
        style={{ color: "white", float: "right" }}
      >
        <h5
          style={{
            color: "white",
            float: "right",
            fontSize: "20",
            backgroundColor: "0075FF",
          }}
        />
        Add Rooms
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

export default RoomsForSubGroup;
