import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import { useForm } from "react-hook-form";
import { updateBuilding } from "../../api/buildings/buildings.request";
import { BuildingUpdateData } from "../../api/interfaces";
import { useHistory, useLocation } from "react-router-dom";
import { Buildings } from "../../models/Buildings";

export interface UpdateBuildingFormProps {
  buildingName: string;
  buildingID: string;
}

const UpdateBuildingForm: React.SFC<UpdateBuildingFormProps> = ({
  buildingName,
  buildingID,
}: UpdateBuildingFormProps) => {
  const history = useHistory();
  const location = useLocation();

  const [update, setUpdate] = React.useState(false);
  const [building, selectBuilding] = React.useState(Object);

  const [editBuilding] = useState<Buildings | undefined>(() => {
    return location?.state as Buildings | undefined;
  });

  const { register, handleSubmit } = useForm({
    defaultValues: editBuilding,
  });

  const handleUpdateOpen = () => {
    setUpdate(true);
  };

  const handleClose = () => {
    setUpdate(false);
  };

  const onSubmit = (data) => {
    const buildings: BuildingUpdateData = {
      _id: data?._id as string,
      name: data?.name,
    };

    updateBuilding(buildings)
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
        open={update}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle
          id="max-width-dialog-title"
          style={{ textAlign: "center" }}
        >
          {"Update Building"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label htmlFor="txtName" className="form-label">
                Name
              </label>
              <input
                type="hidden"
                name="_id"
                ref={register}
                value={buildingID}
              />
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder={buildingName}
                ref={register}
              />
              <DialogActions>
                <Button type="submit" color="primary">
                  Save
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    handleClose();
                    history.push("/student-home-screen");
                    history.push("/locations-screen");
                  }}
                >
                  Cancel
                </Button>
              </DialogActions>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default UpdateBuildingForm;
