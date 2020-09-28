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
  Checkbox,
  TextField,
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { Alert, Autocomplete } from "@material-ui/lab";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";
import { TableSearchInput } from "../../components/Common/TableViewComponents/TableSearchInput";
import ManageSessionsTable from "../../components/Sessions/SessionsTable";
import { useGetSessions } from "../../queries/useGetSessions";
import { SessionCreateData } from "../../api/interfaces";
import { addSession } from "../../api/sessions/sessions.request";
import { useForm } from "react-hook-form";
import { useToast } from "../../hooks/useToast";
import { useHistory } from "react-router-dom";
import { useGetLecturers } from "../../queries/useGetLecturers";
import { useGetTags } from "../../queries/useGetTags";
import { useGetSubjects } from "../../queries/useGetSubjects";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ManageSessionsScreen: React.SFC = () => {
  const [searchText, setSearchText] = useState("");
  const [addDialog, setAddDialog] = useState(false);
  const [subjectName, setSubject] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const displayToast = useToast();
  const lecturers = useGetLecturers().data;
  const tags = useGetTags().data;
  const subjects = useGetSubjects().data;
  const { data = [], status } = useGetSessions();
  const history = useHistory();

  const handleAddDialogOpen = () => {
    setAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setAddDialog(false);
  };

  const onSubmit = (data: any) => {
    const session: SessionCreateData = {
      lecturers: data?.lecturers,
      tags: data?.tags,
      studentGroup: data?.studentGroup,
      subject: data?.subject,
      subjectCode: data?.subjectCode,
      noOfStudents: data?.noOfStudents,
      duration: data?.duration,
    };

    addSession(session)
      .then((res) => {
        console.log(res);
        handleAddDialogClose();
        displayToast(
          `Session ${session.subject} Succesfully Added` || "Hi ",
          "default"
        );
        history.push("manage-lecturers");
        history.push("manage-sessions");
      })
      .catch((err) => {
        handleAddDialogClose();
        displayToast(
          `Session ${session.subject} Did Not Added` || "Hi ",
          "default"
        );
        console.error(err);
      });
  };

  const noData = status === "success" && data?.length === 0;
  const hasData = status === "success" && data?.length !== 0;

  return (
    <>
      <h4 className="title mb-4">Manage Sessions</h4>

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
                <Alert severity="error">Error Loading Session Data</Alert>
              )}
              {noData && (
                <Alert severity="info">You Have No Saved Sessions.</Alert>
              )}
              {hasData && (
                <ManageSessionsTable sessions={data} searchVal={searchText} />
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
                  <label htmlFor="subject" className="form-label">
                    Subject Code
                  </label>
                  <select
                    className="form-select"
                    aria-label="subjectCode"
                    name="subjectCode"
                    onChange={(e) => {
                      setSubjectCode(e.target.value);
                      // eslint-disable-next-line no-unused-expressions
                      subjects?.forEach((s) => {
                        if (s.subjectCode === e.target.value) {
                          setSubject(s.subjectName);
                          console.log(subjectCode);
                        }
                      });
                    }}
                    ref={register({ required: true })}
                  >
                    <option value="">Select A Subject Code</option>
                    {subjects?.map((s) => {
                      return (
                        <option value={s.subjectCode}>{s.subjectCode}</option>
                      );
                    })}
                  </select>
                  {errors.subjectCode && (
                    <span style={{ color: "red" }}>This Field is Required</span>
                  )}
                </div>
              </Grid>

              <Grid item xs={6}>
                <div>
                  <label htmlFor="subject" className="form-label">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    aria-describedby="emailHelp"
                    name="subject"
                    value={subjectName}
                    ref={register({ required: true })}
                  />
                  {errors.subject && (
                    <span style={{ color: "red" }}>This Field is Required</span>
                  )}
                </div>
              </Grid>

              <Grid item xs={12} style={{ width: "100%" }}>
                <label htmlFor="lecturers" className="form-label">
                  Lecturers
                </label>
                <Autocomplete
                  fullWidth={true}
                  multiple
                  id="checkboxes-tags-demo"
                  options={lecturers || []}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </React.Fragment>
                  )}
                  style={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <label htmlFor="tags" className="form-label">
                  Tags
                </label>
                <select
                  className="form-select"
                  aria-label="tags"
                  name="tags"
                  ref={register({ required: true })}
                >
                  {tags?.map((t) => {
                    return <option value={t.name}>{t.name}</option>;
                  })}
                </select>
              </Grid>

              <Grid item xs={6}>
                <div>
                  <label htmlFor="group" className="form-label">
                    Student Group
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="group"
                    aria-describedby="emailHelp"
                    name="group"
                    ref={register({ required: true })}
                  />
                  {errors.group && (
                    <span style={{ color: "red" }}>This Field is Required</span>
                  )}
                </div>
              </Grid>

              <Grid item xs={6}>
                <div>
                  <label htmlFor="noOfStudents" className="form-label">
                    No of Students
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="noOfStudents"
                    aria-describedby="emailHelp"
                    name="noOfStudents"
                    ref={register({ required: true })}
                  />
                  {errors.noOfStudents && (
                    <span style={{ color: "red" }}>This Field is Required</span>
                  )}
                </div>
              </Grid>

              <Grid item xs={6}>
                <div>
                  <label htmlFor="duration" className="form-label">
                    Duration
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="duration"
                    aria-describedby="emailHelp"
                    name="duration"
                    ref={register({ required: true })}
                  />
                  {errors.duration && (
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

export default ManageSessionsScreen;