import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useForm } from "react-hook-form";
import { addWorkingDays } from "../../api/working-days/working.days.request";
import { WorkingDaysCreateData } from "../../api/interfaces";
import { useHistory } from "react-router-dom";

const WorkingDaysAddEditScreen: React.SFC = () => {
  const [isEdit] = useState(false);
  const [noOfWorkingDays] = useState(0);
  const { register, handleSubmit } = useForm();

  const history = useHistory();

  const onSubmit = (data: any) => {
    console.log(data);
    const workingDays: WorkingDaysCreateData = {
      name: data?.name,
      workingHours: {
        hours: parseInt(data?.hours),
        mins: parseInt(data?.mins),
      },
      selectedDays: {
        monday: data?.monday,
        tuesday: data?.tuesday,
        wednesday: data?.wednesday,
        thursday: data?.thursday,
        friday: data?.friday,
        saturday: data?.saturday,
        sunday: data?.sunday,
      },
      prefferedTimeSlots: {
        thirty: data?.thirty,
        sixty: data?.sixty,
      },
    };

    addWorkingDays(workingDays)
      .then((res) => {
        console.log(res);
        history.push("/manage-working-days");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h4 className="title">{isEdit ? "Update" : "Create"} Working Days</h4>

      <div className="container mt-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} className="form-row">
            <Grid item xs={7}>
              <div>
                <label htmlFor="txtName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="txtName"
                  aria-describedby="emailHelp"
                  name="name"
                  ref={register}
                />
              </div>
            </Grid>
            <Grid item xs={5}>
              <div>
                <label htmlFor="txtNoPerWeek" className="form-label">
                  No of Working Days per week
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="txtNoPerWeek"
                  aria-describedby="help"
                  disabled={true}
                  value={noOfWorkingDays}
                />
                <div id="help" className="form-text">
                  Select your available days below to update this.
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <label htmlFor="">Select Days</label>
              <br />
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="cbMonday"
                  name="monday"
                  ref={register}
                />
                <label className="form-check-label" htmlFor="cbMonday">
                  Monday
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="cbTuesday"
                  name="tuesday"
                  ref={register}
                />
                <label className="form-check-label" htmlFor="cbTuesday">
                  Tuesday
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="cbWednesday"
                  name="wednesday"
                  ref={register}
                />
                <label className="form-check-label" htmlFor="cbWednesday">
                  Wednesday
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="cbThursday"
                  name="thursday"
                  ref={register}
                />
                <label className="form-check-label" htmlFor="cbThursday">
                  Thursday
                </label>
              </div>

              <br />
              <div className="mt-2"></div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="cbFriday"
                  name="friday"
                  ref={register}
                />
                <label className="form-check-label" htmlFor="cbFriday">
                  Friday
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="cbSaturday"
                  name="saturday"
                  ref={register}
                />
                <label className="form-check-label" htmlFor="cbSaturday">
                  Saturday
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="cbSunday"
                  name="sunday"
                  ref={register}
                />
                <label className="form-check-label" htmlFor="cbSunday">
                  Sunday
                </label>
              </div>
            </Grid>

            <div className="container mt-3">
              <label htmlFor="">Working Hours per Day</label>
            </div>
            <Grid item xs={3}>
              <div>
                <label htmlFor="txtName" className="form-label">
                  Hours
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="txtName"
                  name="hours"
                  ref={register}
                />
              </div>
            </Grid>

            <Grid item xs={3}>
              <div>
                <label htmlFor="txtName" className="form-label">
                  Mins
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="txtName"
                  name="mins"
                  ref={register}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                Include lunch time also — <strong>view more!</strong>
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <label htmlFor="">Preffered time slots</label>
              <br />
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="cbThirtyMin"
                  name="thirty"
                  ref={register}
                />
                <label className="form-check-label" htmlFor="cbThirtyMin">
                  30 Min
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="cbSixtyMin"
                  name="sixty"
                  ref={register}
                />
                <label className="form-check-label" htmlFor="cbSixtyMin">
                  60 Min
                </label>
              </div>
            </Grid>

            <Grid item xs={9}></Grid>
            <Grid item xs={3}>
              <div className="align-right" style={{ alignContent: "right" }}>
                <button type="submit" className="btn btn-primary btn-abc">
                  Save
                </button>{" "}
                <button
                  type="button"
                  className="btn btn-danger btn-abc"
                  onClick={() => {
                    history.push("/manage-working-days");
                  }}
                >
                  Cancel
                </button>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default WorkingDaysAddEditScreen;
