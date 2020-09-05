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
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";
import { TableSearchInput } from "../../components/Common/TableViewComponents/TableSearchInput";
import ManageSubjectsTable from "../../components/Subjects/SubjectsTable";
import { useGetSubjects } from "../../queries/useGetSubjects";
import { SubjectCreateData } from "../../api/interfaces";
import { addSubject } from "../../api/subjects/subjects.request";
import { useForm } from "react-hook-form";
import { useToast } from "../../hooks/useToast";

const ManageSubjectsScreen: React.SFC = () => {
  const [searchText, setSearchText] = useState("");
  const [addDialog, setAddDialog] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const displayToast = useToast();

  const { data = [], status } = useGetSubjects();

  const handleAddDialogOpen = () => {
    setAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setAddDialog(false);
  };

  const onSubmit = (data: any) => {
    const subject: SubjectCreateData = {
      subjectName: data?.subjectName,
      subjectCode: data?.subjectCode,
      offeredYear: data?.offeredYear,
      offeredSemester: data?.offeredSemester,
      lectureHours: data?.lectureHours,
      labHours: data?.labHours,
      tutorialHours: data?.tutorialHours,
      evaluationHours: data?.evaluationHours,
    };

    addSubject(subject)
      .then((res) => {
        console.log(res);
        handleAddDialogClose();
        displayToast(
          `Subject ${subject.subjectCode} Succesfully Added` || "Hi ",
          "default"
        );
      })
      .catch((err) => {
        handleAddDialogClose();
        displayToast(
          `Subject ${subject.subjectCode} Did Not Added` || "Hi ",
          "default"
        );
        console.error(err);
      });
  };

  const noData = status === "success" && data?.length === 0;
  const hasData = status === "success" && data?.length !== 0;

  return (
    <>
      <h4 className="title mb-4">Manage Subject</h4>

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
                <Alert severity="error">Error Loading Subjects Data</Alert>
              )}
              {noData && (
                <Alert severity="info">You Have No Saved Subjects.</Alert>
              )}
              {hasData && (
                <ManageSubjectsTable subjects={data} searchVal={searchText} />
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
                  <label htmlFor="subjectName" className="form-label">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subjectName"
                    aria-describedby="emailHelp"
                    name="subjectName"
                    ref={register({ required: true })}
                  />
                  {errors.subjectName && (
                    <span style={{ color: "red" }}>This Field is Required</span>
                  )}
                </div>
              </Grid>

              <Grid item xs={6}>
                <div>
                  <label htmlFor="subjectCode" className="form-label">
                    Subject Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subjectCode"
                    aria-describedby="emailHelp"
                    name="subjectCode"
                    ref={register({ required: true })}
                  />
                  {errors.subjectCode && (
                    <span style={{ color: "red" }}>This Field is Required</span>
                  )}
                </div>
              </Grid>

              <Grid item xs={6}>
                <label htmlFor="offeredYear" className="form-label">
                  Offered Year
                </label>
                <select
                  className="form-select"
                  aria-label="offeredYear"
                  name="offeredYear"
                  ref={register({ required: true })}
                >
                  <option selected value="1">
                    1
                  </option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </Grid>

              <Grid item xs={6}>
                <label htmlFor="offeredSemester" className="form-label">
                  Offered Semester
                </label>
                <select
                  className="form-select"
                  aria-label="offeredSemester"
                  name="offeredSemester"
                  ref={register({ required: true })}
                >
                  <option selected value="1">
                    1
                  </option>
                  <option value="2">2</option>
                </select>
              </Grid>

              <Grid item xs={6}>
                <div>
                  <label htmlFor="lectureHours" className="form-label">
                    Lecture Hours
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lectureHours"
                    aria-describedby="emailHelp"
                    name="lectureHours"
                    ref={register({ required: true })}
                  />
                  {errors.lectureHours && (
                    <span style={{ color: "red" }}>This Field is Required</span>
                  )}
                </div>
              </Grid>

              <Grid item xs={6}>
                <div>
                  <label htmlFor="labHours" className="form-label">
                    Lab Hours
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="labHours"
                    aria-describedby="emailHelp"
                    name="labHours"
                    ref={register({ required: true })}
                  />
                  {errors.labHours && (
                    <span style={{ color: "red" }}>This Field is Required</span>
                  )}
                </div>
              </Grid>

              <Grid item xs={6}>
                <div>
                  <label htmlFor="tutorialHours" className="form-label">
                    Tutorial Hours
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tutorialHours"
                    aria-describedby="emailHelp"
                    name="tutorialHours"
                    ref={register({ required: true })}
                  />
                  {errors.tutorialHours && (
                    <span style={{ color: "red" }}>This Field is Required</span>
                  )}
                </div>
              </Grid>

              <Grid item xs={6}>
                <div>
                  <label htmlFor="evaluationHours" className="form-label">
                    Evaluation Hours
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="evaluationHours"
                    aria-describedby="emailHelp"
                    name="evaluationHours"
                    ref={register({ required: true })}
                  />
                  {errors.evaluationHours && (
                    <span style={{ color: "red" }}>This Field is Required</span>
                  )}
                </div>
              </Grid>
            </Grid>

            <div className="mt-3">
              <button className="btn btn-primary" type="submit">
                Add
              </button>{" "}
              <button
                className="btn btn-danger"
                type="button"
                onClick={handleAddDialogClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageSubjectsScreen;
