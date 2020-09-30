/* eslint-disable no-unused-expressions */
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
import { useGenerateSubGroupId } from "../../queries/useGenerateSubGroupId";
import { useGenerateGroupId } from "../../queries/useGenerateGroupId";
import { Lecturer } from "../../models/Lecturer";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ManageSessionsScreen: React.SFC = () => {
  const [searchText, setSearchText] = useState("");
  const [addDialog, setAddDialog] = useState(false);
  const [subjectName, setSubject] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [groups, setGroups] = useState([""]);
  const [lecs, setLecs] = useState([""]);
  const [tag, setTag] = useState("");
  const [duration, setDuration] = useState(0);
  const { register, handleSubmit, errors } = useForm();
  const displayToast = useToast();
  const lecturers = useGetLecturers().data;
  const tags = useGetTags().data;
  const subjects = useGetSubjects().data;
  const studentGroups = useGenerateGroupId().data;
  const studentSubGroups = useGenerateSubGroupId().data;
  const { data = [], status } = useGetSessions();
  const history = useHistory();

  const handleAddDialogOpen = () => {
    setAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setAddDialog(false);
    setSubject("");
    setSubjectCode("");
    setDuration(0);
    console.log(tag);
  };
  function handleSubjectChange(subjectCode: string) {
    subjects?.forEach((s) => {
      if (s.subjectCode === subjectCode) {
        setSubject(s?.subjectName);
      }
    });
  }

  function handleTagChange(tag: string) {
    // eslint-disable-next-line prefer-const
    let students = [""];
    subjects?.forEach((s) => {
      if (subjectCode === s.subjectCode) {
        if (tag === "Lecture") {
          setDuration(Number.parseInt(s.lectureHours));
          studentGroups?.forEach((g) => {
            console.log(
              g.groupId.includes("Y" + s.offeredYear + ".S" + s.offeredSemester)
            );
            if (
              g.groupId.includes("Y" + s.offeredYear + ".S" + s.offeredSemester)
            ) {
              students.push(g.groupId);
            }
          });
        } else if (tag === "Tute") {
          setDuration(Number.parseInt(s.tutorialHours));
          studentGroups?.forEach((g) => {
            if (
              g.groupId.includes("Y" + s.offeredYear + ".S" + s.offeredSemester)
            ) {
              students.push(g.groupId);
            }
          });
        } else if (tag === "Lab") {
          setDuration(Number.parseInt(s.labHours));
          studentSubGroups?.forEach((g) => {
            if (
              g.groupId.includes("Y" + s.offeredYear + ".S" + s.offeredSemester)
            ) {
              students.push(g.groupId);
            }
          });
        }
      }
    });
    setGroups(students);
    console.log(groups);
  }

  const onSubmit = (data: any) => {
    const session: SessionCreateData = {
      lecturers: lecs,
      tags: data?.tags,
      studentGroup: data?.studentGroup,
      subject: data?.subjectName,
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
        <DialogTitle id="alert-dialog-title">{"Add Session"}</DialogTitle>

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
                      console.log(e.target.value);
                      setSubjectCode(e.target.value);
                      handleSubjectChange(e.target.value);
                      // eslint-disable-next-line no-unused-expressions

                      handleSubjectChange(e.target.value);
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
                  <label htmlFor="subjectName" className="form-label">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subjectName"
                    aria-describedby="emailHelp"
                    name="subjectName"
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
                  id="lecturers"
                  onChange={(event, value: Lecturer[]) => {
                    // eslint-disable-next-line prefer-const
                    let l = [""];
                    l.pop();
                    value.forEach((v) => {
                      l.push(v.name);
                    });
                    setLecs(l);
                    setLecs(l);
                  }}
                  options={lecturers || []}
                  ref={register({ required: true })}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  defaultValue={[]}
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
                  onChange={(e) => {
                    console.log(e.target.value);
                    setTag(e.target.value);
                    handleTagChange(e.target.value);
                    // eslint-disable-next-line no-unused-expressions

                    handleTagChange(e.target.value);
                  }}
                  ref={register({ required: true })}
                >
                  <option value="">Select A Tag</option>
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
                  <select
                    className="form-select"
                    aria-label="tags"
                    name="studentGroup"
                    ref={register({ required: true })}
                  >
                    {groups?.map((g) => {
                      return <option value={g}>{g}</option>;
                    })}
                  </select>
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
                    value={duration}
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
