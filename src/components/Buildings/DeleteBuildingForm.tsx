import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { Buildings } from "../../models/Buildings";
import { deleteBuilding } from "../../api/buildings/buildings.request";

export interface DeleteBuildingFormProps {
  buildingID: string;
}

const DeleteBuildingForm: React.SFC<DeleteBuildingFormProps> = ({
  buildingID,
}: DeleteBuildingFormProps) => {
  const [open, setOpen] = React.useState(false);

  const history = useHistory();
  const location = useLocation();

  const [update, setUpdate] = React.useState(false);
  const [building, selectBuilding] = React.useState(Object);

  const [editBuilding] = useState<Buildings | undefined>(() => {
    return location?.state as Buildings | undefined;
  });

  const { handleSubmit } = useForm({
    defaultValues: editBuilding,
  });

  const handleUpdateOpen = () => {
    setUpdate(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    setOpen(false);
    console.log(update);
    deleteBuilding(buildingID)
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
      <DeleteOutlinedIcon
        onClick={() => {
          selectBuilding(building);
          handleUpdateOpen();
        }}
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
    </React.Fragment>
  );
};

export default DeleteBuildingForm;
