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
import { useToast } from "../../hooks/useToast";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";
import { TableSearchInput } from "../../components/Common/TableViewComponents/TableSearchInput";
import { useHistory } from "react-router-dom";
import { useGetBuildings } from "../../queries/useGetBuildings";
import { Buildings } from "../../models/Buildings";

const ManageLecturersScreen: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const { data = [], status } = useGetLecturers();
  const buildings = useGetBuildings().data;
  const [addDialog, setAddDialog] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const displayToast = useToast();
  const history = useHistory();
  const [employeeId, setempId] = useState("");
  const [level, setLevel] = useState("");
  const [rank, setRank] = useState("");
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
      centre: data?.center,
      building: data?.building,
      level: data?.level,
      rank: rank,
    };

    addLecturer(lecturer)
      .then((res) => {
        console.log(res);
        handleAddDialogClose();
        displayToast(
          `Lecturer ${lecturer.name} Succesfully Added` || "Hi ",
          "default"
        );
        history.push("manage-subjects");
        history.push("manage-lecturers");
      })
      .catch((err) => {
        handleAddDialogClose();
        displayToast(
          `Lecturer ${lecturer.name} Did Not Added` || "Hi ",
          "default"
        );
        console.error(err);
      });
  };

  return (
    <>
      <h4 className="title">Manage Lecturers</h4>
      <div className="row mb-3">
        <div className="col-1"></div>
        <div className="col-8">
          <SearchIcon className="search-icon" />{" "}
          <TableSearchInput onUpdate={setSearchText} />
        </div>
        <div className="col-3">
          <button className="btn btn-primary" onClick={handleAddDialogOpen}>
            Create <AddCircleIcon />
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
                <Alert severity="info">You haven't added lectures.</Alert>
              )}
              {hasData && (
                <ManageLecturersTable lecturers={data} searchVal={searchText} />
              )}
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
                    ref={register({ required: true })}
                  />
                  {errors.name && (
                    <span style={{ color: "red" }}>This Field is Required</span>
                  )}
                </div>
              </Grid>

              <Grid item xs={6}>
                <div>
                  <label htmlFor="txtName" className="form-label">
                    Employee ID
                  </label>
                  <label style={{ marginLeft: "110px", color: "#C0C0C0" }}>
                    000150
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="txtName"
                    aria-describedby="emailHelp"
                    name="employeeId"
                    ref={register({ required: true })}
                    onChange={(e) => {
                      setempId(e.target.value);
                      setempId(e.target.value);
                      setRank(level + "." + employeeId);
                      setRank(level + "." + employeeId);
                    }}
                  />
                  {errors.employeeId && (
                    <span style={{ color: "red" }}>This Field is Required</span>
                  )}
                </div>
              </Grid>

              <Grid item xs={6}>
                <label htmlFor="faculty" className="form-label">
                  Faculty
                </label>
                <select
                  className="form-select"
                  aria-label="Faculty"
                  name="faculty"
                  ref={register({ required: true })}
                >
                  <option selected value="Computing">
                    Computing
                  </option>
                  <option value="Business">Business</option>
                  <option value="Engineering">Engineering</option>
                </select>
                {errors.faculty && (
                  <span style={{ color: "red" }}>This Field is Required</span>
                )}
              </Grid>

              <Grid item xs={6}>
                <label htmlFor="department" className="form-label">
                  Department
                </label>
                <select
                  className="form-select"
                  aria-label="Department"
                  name="department"
                  ref={register({ required: true })}
                >
                  <option selected value="SE">
                    SE
                  </option>
                  <option value="IT">IT</option>
                  <option value="DS">DS</option>
                </select>
                {errors.department && (
                  <span style={{ color: "red" }}>This Field is Required</span>
                )}
              </Grid>

              <Grid item xs={6}>
                <label htmlFor="center" className="form-label">
                  Center
                </label>
                <select
                  className="form-select"
                  aria-label="Center"
                  name="center"
                  ref={register({ required: true })}
                >
                  <option selected value="Malabe">
                    Malabe
                  </option>
                  <option value="Kandy">Kandy</option>
                  <option value="Matara">Matara</option>
                </select>
                {errors.center && (
                  <span style={{ color: "red" }}>This Field is Required</span>
                )}
              </Grid>

              <Grid item xs={6}>
                <label htmlFor="building" className="form-label">
                  Building
                </label>
                <select
                  className="form-select"
                  aria-label="Building"
                  name="building"
                  ref={register({ required: true })}
                >
                  {buildings?.map((b: Buildings) => (
                    <option value={b.name}>{b.name}</option>
                  ))}
                </select>
                {errors.building && (
                  <span style={{ color: "red" }}>This Field is Required</span>
                )}
              </Grid>

              <Grid item xs={6}>
                <label htmlFor="level" className="form-label">
                  Level
                </label>
                <select
                  className="form-select"
                  aria-label="Level"
                  name="level"
                  ref={register({ required: true })}
                  onChange={(e) => {
                    setLevel(e.target.value);
                    setLevel(e.target.value);
                    setRank(level + "." + employeeId);
                    setRank(level + "." + employeeId);
                  }}
                >
                  <option selected>Level</option>
                  <option value="1">Professor</option>
                  <option value="2">Assistant Professor</option>
                  <option value="3">Senior Lecturer(HG)</option>
                  <option value="4">Senior Lecturer</option>
                  <option value="5">Lecturer</option>
                  <option value="6">Assistant Lecturer</option>
                  <option value="7">Instructors</option>
                </select>
                {errors.level && (
                  <span style={{ color: "red" }}>This Field is Required</span>
                )}
              </Grid>

              <Grid item xs={6}>
                <div>
                  <label htmlFor="txtName" className="form-label">
                    Rank
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="txtName"
                    aria-describedby="emailHelp"
                    name="rank"
                    value={rank}
                    readOnly={true}
                    ref={register({ required: true })}
                  />
                </div>
                {errors.rank && (
                  <span style={{ color: "red" }}>This Field is Required</span>
                )}
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
