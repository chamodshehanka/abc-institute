import React, { useState } from "react";
import {
  Container,
  Card,
  LinearProgress,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useGetLecturers } from "../../queries/useGetLecturers";
import ManageLecturersTable from "../../components/Lecturers/LecturersTable";
import { useForm } from "react-hook-form";
import { LecturerCreateData } from "../../api/interfaces";
import { addLecturer } from "../../api/lecturers/lecturers.request";

const ManageLecturersScreen: React.FC = () => {
  const { data = [], status } = useGetLecturers();
  const [addDialog, setAddDialog] = useState(false);
  const { register, handleSubmit } = useForm();

  const noData = status === "success" && data?.length === 0;
  const hasData = status === "success" && data?.length !== 0;

  const handleAddDialogOpen = () => {
    setAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setAddDialog(false);
  };

  const onSubmit = (data: any) => {
    const lecturer: LecturerCreateData = {
      name: data?.name,
      employeeId: data?.employeeId,
      faculty: data?.faculty,
      department: data?.department,
      centre: data?.centre,
      building: data?.building,
      level: data?.level,
      rank: data?.rank,
    };

    addLecturer(lecturer)
      .then((res) => {
        console.log(res);
        handleAddDialogClose();
      })
      .catch((err) => {
        handleAddDialogClose();
        console.error(err);
      });
  };

  return (
    <>
      <h4 className="title">Manage Lecturers</h4>

      <div className="row mb-3">
        <div className="col-1"></div>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search To Filter"
          />
        </div>
        <div className="col-3">
          <button className="btn btn-primary" onClick={handleAddDialogOpen}>
            Create
          </button>
        </div>
      </div>

      {status === "loading" && <LinearProgress />}

      <div className="row mb-3">
        <div className="col-9"></div>
        <div className="col-2">
          <select className="form-select" aria-label="Default select example">
            <option selected>Sort By</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>

      <Container className="top-container">
        <Card>
          <Toolbar style={{ paddingLeft: 0 }}>
            <div className="container">
              {status === "error" && (
                <Alert severity="error">Error Loading Lecturers Data</Alert>
              )}
              {noData && (
                <Alert severity="info">
                  You have no registries in this project.
                </Alert>
              )}
              {hasData && <ManageLecturersTable lecturers={data} />}
            </div>
          </Toolbar>
        </Card>
      </Container>

      <Dialog
        open={addDialog}
        onClose={handleAddDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Lecturer"}</DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} className="form-row">
              <Grid item xs={6}>
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

              <Grid item xs={6}>
                <div>
                  <label htmlFor="txtName" className="form-label">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="txtName"
                    aria-describedby="emailHelp"
                    name="employeeId"
                    ref={register}
                    value="E003"
                  />
                </div>
              </Grid>
            </Grid>

            <div className="mt-3">
              <button className="btn btn-primary" type="submit">
                Save
              </button>{" "}
              <button className="btn btn-danger" onClick={handleAddDialogClose}>
                Cancel
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageLecturersScreen;
