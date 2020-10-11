import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { useGetRooms } from "../../queries/useGetRooms";
import { Rooms } from "../../models/Rooms";
import { withStyles } from "@material-ui/core/styles";

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { useForm } from "react-hook-form";
import {
  addNotAvailable,
} from "../../api/student/notAvailable.requets";
import { NotAvailableCreateData } from "../../api/interfaces";
import { useHistory } from "react-router-dom";

import { DialogTitle, Dialog, DialogContent, Grid } from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "auto",
    },
    paper: {
      width: 200,
      height: 230,
      overflow: "auto",
    },
    button: {
      margin: theme.spacing(0.5, 0),
    },
  })
);

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

export interface RoomsNotAvailableTimeProps {}

const RoomsNotAvailableTime: React.SFC<RoomsNotAvailableTimeProps> = ({}: RoomsNotAvailableTimeProps) => {
  const { data: rooms = [] } = useGetRooms();
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const [allocateDialog, setAllocateDialog] = useState(false);

  const handleAllocateDialogOpen = () => {
    setAllocateDialog(true);
  };

  const handleAllocateDialogClose = () => {
    setAllocateDialog(false);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    const room: NotAvailableCreateData = {
      type: data?.type,
      typeId: data?.typeId,
      name: data?.name,
      day: data?.day,
      stime: data?.stime,
      ltime: data?.ltime,
    };

    addNotAvailable(room)
      .then((res) => {
        console.log(res);
        history.push("student-year-screen");
        history.push("rooms-screen");
      })
      .catch((err) => console.error(err));
  };

  // React.useEffect(() => {
  //   register("selectedRoom", {
  //     validate: (value) => value.length || "This is required.",
  //   });
  // }, [register]);



  return (
    <>
      <BootstrapButton
        size="small"
        onClick={() => {
          handleAllocateDialogOpen();
        }}
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
        Add Time
      </BootstrapButton>

      <>
        <Dialog
          open={allocateDialog}
          onClose={handleAllocateDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Allocate Not Available Time for Rooms"}
          </DialogTitle>

          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)} noValidate={false}>
              <Grid container spacing={2} className="form-row">
                <input
                  type="hidden"
                  id="type"
                  name="type"
                  value="Room"
                  ref={register}
                />

              <select
                  id="room"
                  className="form-select"
                  name="typeId"
                  ref={register}
                >
                  {rooms.map((g) => (
                    <option
                      key={g._id}
                      value={g._id}
                    >
                      {g.name}
                    </option>
                  ))}
                </select>

                <input type="hidden" id="name" name="name" ref={register} />

                <Grid item xs={6}>
                  <div>
                    <label htmlFor="name" className="form-label">
                      Date :{" "}
                    </label>
                    <select
                      id="day"
                      className="form-select"
                      name="day"
                      ref={register}
                    >
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div>
                    <label htmlFor="employeeId" className="form-label">
                      Not Available time
                    </label>
                    <input
                      type="time"
                      id="stime"
                      name="stime"
                      ref={register}
                      className="form-control"
                    />
                    <label
                      htmlFor="employeeId"
                      style={{ marginLeft: 70 }}
                      className="form-label"
                    >
                      to
                    </label>
                    <input
                      type="time"
                      id="ltime"
                      name="ltime"
                      ref={register}
                      className="form-control"
                    />
                  </div>
                </Grid>
              </Grid>

              <div className="mt-3" style={{ marginLeft: 70 }}>
                <button className="btn btn-warning" type="submit">
                  Allocate
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleAllocateDialogClose}
                  style={{ marginLeft: 10 }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </>
    </>
  );
};

export default RoomsNotAvailableTime;
