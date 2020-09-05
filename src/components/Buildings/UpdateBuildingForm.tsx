import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { updateBuilding } from "../../api/buildings/buildings.request";
import { BuildingUpdateData } from "../../api/interfaces";

export interface UpdateBuildingFormProps {
  buildingName: string;
}

const UpdateBuildingForm: React.SFC<UpdateBuildingFormProps> = ({
  buildingName,
}: UpdateBuildingFormProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    const buidling: BuildingUpdateData = {
      _id: data?.id,
      name: data?.name,
    };

    updateBuilding(buidling)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const { register, handleSubmit, reset } = useForm();

  return (
    <React.Fragment>
      <EditIcon
        onClick={handleClickOpen}
        style={{
          float: "right",
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
          Edit Building
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Building Name</DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              name="building"
              inputRef={register}
              variant="outlined"
              fullWidth
              margin="dense"
              placeholder={buildingName}
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

export default UpdateBuildingForm;
