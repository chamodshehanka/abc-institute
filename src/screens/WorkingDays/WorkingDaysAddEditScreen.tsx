import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useForm } from "react-hook-form";
import {
  addWorkingDays,
  updateWorkingDays,
} from "../../api/working-days/working.days.request";
import {
  WorkingDaysCreateData,
  WorkingDaysUpdateData,
} from "../../api/interfaces";
import { useHistory, useLocation } from "react-router-dom";
import {
  days,
  WorkingDays,
  WorkingDaysFormData,
} from "../../models/WorkingDays";

const WorkingDaysAddEditScreen: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const [isEdit] = useState(() => {
    return location.state !== undefined;
  });
  const [noOfWorkingDays] = useState(0);

  const [editWorkingDay] = useState<WorkingDays | undefined>(() => {
    return location?.state as WorkingDays | undefined;
  });

  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: editWorkingDay,
  });

  const onSubmit = (data: WorkingDaysFormData) => {
    // console.log(data);

    // const wh: WORKING_HOURS = Object.entries(data.workingHours).map((d) => {
    //   const [day, { hours, mins }] = d;

    //   return [day as DAYS, { hours: parseInt(hours), mins: parseInt(mins) }];
    // });

    const workingHours: Partial<WorkingDays["workingHours"]> = {};
    days.forEach((day) => {
      const time = data?.workingHours?.[day];
      if (time?.hours && time?.mins)
        workingHours[day] = {
          hours: parseInt(time?.hours),
          mins: parseInt(time?.mins),
        };
    });

    if (isEdit) {
      const workingDays: WorkingDaysUpdateData = {
        _id: editWorkingDay?._id as string,
        name: data?.name,
        workingHours: workingHours as WorkingDays["workingHours"],
        selectedDays: data?.selectedDays,
        prefferedTimeSlots: {
          thirty: data?.prefferedTimeSlots?.thirty,
          sixty: data?.prefferedTimeSlots?.sixty,
        },
      };

      updateWorkingDays(workingDays)
        .then((res) => {
          console.log(res);
          history.push("/manage-working-days");
        })
        .catch((err) => console.error(err));
    } else {
      const workingDays: WorkingDaysCreateData = {
        name: data?.name,
        workingHours: workingHours as WorkingDays["workingHours"],
        selectedDays: data?.selectedDays,
        prefferedTimeSlots: {
          thirty: data?.prefferedTimeSlots?.thirty,
          sixty: data?.prefferedTimeSlots?.sixty,
        },
      };
      addWorkingDays(workingDays)
        .then((res) => {
          console.log(res);
          history.push("/manage-working-days");
        })
        .catch((err) => console.error(err));
    }
  };

  const dayWatch = watch("selectedDays");

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
                  ref={register({ required: true })}
                />
                {errors.name && (
                  <span style={{ color: "red" }}>This Field is Required</span>
                )}
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
                  name="selectedDays.monday"
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
                  name="selectedDays.tuesday"
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
                  name="selectedDays.wednesday"
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
                  name="selectedDays.thursday"
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
                  name="selectedDays.friday"
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
                  name="selectedDays.saturday"
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
                  name="selectedDays.sunday"
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
            <Grid container>
              {days.map((d) => {
                if (!dayWatch?.[d]) return null;
                return (
                  <Grid container item xs={12}>
                    <Grid item xs={3}>
                      <div>
                        <label htmlFor="txtName" className="form-label">
                          Hours
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="txtName"
                          name={`workingHours.${d}.hours`}
                          ref={register({ required: true })}
                        />
                        {errors?.workingHours?.[d]?.hours && (
                          <span style={{ color: "red" }}>
                            This Field is Required
                          </span>
                        )}
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
                          name={`workingHours.${d}.mins`}
                          ref={register({ required: true })}
                        />
                        {errors?.workingHours?.[d]?.mins && (
                          <span style={{ color: "red" }}>
                            This Field is Required
                          </span>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                );
              })}
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
                  id="cbThirtyMin"
                  name="prefferedTimeSlots.thirty"
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
                  id="cbSixtyMin"
                  name="prefferedTimeSlots.sixty"
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
