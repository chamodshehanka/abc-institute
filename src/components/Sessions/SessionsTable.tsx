/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Session } from "../../models/Session";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Menu,
  MenuItem,
  IconButton,
  CircularProgress,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  Checkbox,
  TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import {
  deleteSession,
  updateSession,
} from "../../api/sessions/sessions.request";
import Alert from "@material-ui/lab/Alert";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  useFilterRows,
  useFilterRowsSessions,
} from "../Common/TableViewComponents/useFilterData";
import { TableFooterPagination } from "../Common/TableViewComponents/TableFooterPagination";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useDeletePrompt } from "../Common/DeletePrompt/DeletePrompt";
import { useMutation } from "react-query";
import { useToast } from "../../hooks/useToast";
import { useForm } from "react-hook-form";
import { SessionUpdateData } from "../../api/interfaces";
import { useHistory } from "react-router-dom";
import { useGetLecturers } from "../../queries/useGetLecturers";
import { useGetTags } from "../../queries/useGetTags";
import { useGetSubjects } from "../../queries/useGetSubjects";
import { useGenerateGroupId } from "../../queries/useGenerateGroupId";
import { useGenerateSubGroupId } from "../../queries/useGenerateSubGroupId";
import { Lecturer } from "../../models/Lecturer";
import { Autocomplete } from "@material-ui/lab";

export interface ManageSessionsTableProps {
  sessions: Session[];
  searchVal: string;
  sortBy: string;
}

function filterData(tableData: Session[], searchText = "", sortBy = "") {
  console.log(sortBy);
  if (searchText === "") return tableData;
  else {
    if (sortBy === "Subject") {
      return tableData.filter(
        (dataObj) =>
          dataObj.subject &&
          dataObj.subject.toLowerCase().startsWith(searchText)
      );
    }
    if (sortBy === "Tag") {
      return tableData.filter(
        (dataObj) =>
          dataObj.tags && dataObj.tags.toLowerCase().startsWith(searchText)
      );
    }
    if (sortBy === "Group") {
      return tableData.filter(
        (dataObj) =>
          dataObj.studentGroup &&
          dataObj.studentGroup.toLowerCase().startsWith(searchText)
      );
    } else {
      return tableData.filter(
        (dataObj) =>
          dataObj.subject &&
          dataObj.subject.toLowerCase().startsWith(searchText)
      );
    }
  }
}

const ManageSessionsTable: React.SFC<ManageSessionsTableProps> = ({
  sessions,
  searchVal,
  sortBy,
}: ManageSessionsTableProps) => {
  const { pageData, tableFooterProps, noMatchingItems } = useFilterRowsSessions(
    searchVal,
    sortBy,
    sessions,
    filterData
  );
  const history = useHistory();
  return (
    <>
      <TableContainer className="table-container expandable-table-container">
        <Table
          size="small"
          stickyHeader
          aria-label="sticky table"
          className="table-first-cell-padded"
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ fontFamily: "Varela Round" }}>
                Subject Name
              </TableCell>
              <TableCell style={{ fontFamily: "Varela Round" }}>
                Subject Code
              </TableCell>
              <TableCell style={{ fontFamily: "Varela Round" }}>Tag</TableCell>
              <TableCell style={{ fontFamily: "Varela Round" }}>
                Group ID
              </TableCell>
              <TableCell style={{ fontFamily: "Varela Round" }}>
                Student Count
              </TableCell>
              <TableCell style={{ fontFamily: "Varela Round" }}>
                Duration
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageData?.map((s: Session) => (
              <TableRow key={s._id} hover={true}>
                <TableCell style={{ fontFamily: "Varela Round" }}>
                  {s.subject}
                </TableCell>
                <TableCell>{s.subjectCode}</TableCell>
                <TableCell>{s.tags}</TableCell>
                <TableCell>{s.studentGroup}</TableCell>
                <TableCell>{s.noOfStudents}</TableCell>
                <TableCell>{s.duration}</TableCell>
                <TableCell style={{ width: "5rem" }}>
                  <div className="display-flex align-center justify-end">
                    <SessionAction session={s} history={history} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {noMatchingItems && (
        <Alert severity="info">No Matching Sessions Found</Alert>
      )}
      <TableFooterPagination {...tableFooterProps} />
    </>
  );
};

export default ManageSessionsTable;

export interface SessionsActionProps {
  session: Session;
  history: any;
}

const SessionAction: React.FC<SessionsActionProps> = (props) => {
  const displayToast = useToast();
  const lecturers = useGetLecturers().data;
  const tags = useGetTags().data;
  const subjects = useGetSubjects().data;
  const studentGroups = useGenerateGroupId().data;
  const studentSubGroups = useGenerateSubGroupId().data;
  const [groups, setGroups] = useState([""]);
  const [subjectName, setSubject] = useState(props.session.subject);
  const [subjectCode, setSubjectCode] = useState(props.session.subjectCode);
  const [lecs, setLecturers] = useState(props.session.lecturers);
  const [group, setStudentGroup] = useState(props.session.studentGroup);
  const [duration, setDuration] = useState(props.session.duration);
  const [noOfStudents, setNoOfStudents] = useState(props.session.noOfStudents);
  const [tag, setTags] = useState(props.session.tags);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const confirmDelete = useDeletePrompt({
    resourceType: "Session",
    textType: "Code",
    textToMatch: props.session.subject,
  });

  const [view, setView] = React.useState(false);
  const handleViewOpen = () => {
    setView(true);
  };

  const handleViewClose = () => {
    setView(false);
  };

  const [updateDialog, setUpdateDialog] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const handleUpdateDialogOpen = () => {
    setUpdateDialog(true);
  };

  const handleUpdateDialogClose = () => {
    setUpdateDialog(false);
  };

  const handleSubjectChange = (subjectCode: string) => {
    subjects?.forEach((s) => {
      if (s.subjectCode === subjectCode) {
        setSubject(s?.subjectName);
      }
    });
  };

  const handleTagChange = (tag: string) => {
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
          // eslint-disable-next-line no-unused-expressions
          studentGroups?.forEach((g) => {
            if (
              g.groupId.includes("Y" + s.offeredYear + ".S" + s.offeredSemester)
            ) {
              students.push(g.groupId);
            }
          });
        } else if (tag === "Lab") {
          setDuration(Number.parseInt(s.labHours));
          // eslint-disable-next-line no-unused-expressions
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
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [id, setId] = useState(props.session._id);

  const onSubmit = (data: any) => {
    console.log(data);
    const session: SessionUpdateData = {
      _id: id,
      lecturers: data?.lecturers,
      tags: data?.tags,
      studentGroup: data?.studentGroup,
      subject: data?.subject,
      subjectCode: data?.subjectCode,
      noOfStudents: data?.noOfStudents,
      duration: data?.duration,
    };

    updateSession(session)
      .then((res) => {
        console.log(res);
        handleUpdateDialogClose();
        displayToast(
          `Session ${props.session.subject} Succesfully Updated` || "Hi ",
          "default"
        );
        props.history.push("manage-lecturers");
        props.history.push("manage-sessions");
      })
      .catch((err) => {
        handleUpdateDialogClose();
        displayToast(
          `Session ${props.session.subject} Updation Failed` || "Hi ",
          "default"
        );
        console.error(err);
      });
  };

  const [remove, { status: removeStatus }] = useMutation(deleteSession, {
    onError() {
      console.log("errrrrrrrr");
      displayToast(
        `Session ${props.session.subject} Removing Failed` || "Hi ",
        "default"
      );
      props.history.push("manage-lecturers");
      props.history.push("manage-sessions");
    },
    onSuccess() {
      displayToast(`Session ${props.session.subject}  Removed`, "default");
    },
  });

  const showMenuButton = removeStatus === "error" || removeStatus === "idle";

  return (
    <>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <>
            <Dialog
              open={view}
              onClose={handleViewClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Session Details"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <h4>{props.session.lecturers.map((l) => l + ", ")}</h4>
                  <h4>
                    {props.session.subject}({props.session.subjectCode})
                  </h4>
                  <h4>{props.session.tags}</h4>
                  <h4>{props.session.studentGroup}</h4>
                  <h4>
                    {props.session.noOfStudents}({props.session.duration})
                  </h4>
                </DialogContentText>
              </DialogContent>
            </Dialog>

            <Dialog
              open={updateDialog}
              onClose={handleUpdateDialogClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Update Session"}
              </DialogTitle>

              <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} noValidate={false}>
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
                          value={subjectCode}
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
                              <option value={s.subjectCode}>
                                {s.subjectCode}
                              </option>
                            );
                          })}
                        </select>
                        {errors.subjectCode && (
                          <span style={{ color: "red" }}>
                            This Field is Required
                          </span>
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
                          <span style={{ color: "red" }}>
                            This Field is Required
                          </span>
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
                          setLecturers(l);
                          setLecturers(l);
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
                        value={tag}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setTags(e.target.value);
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
                          value={group}
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
                          value={noOfStudents}
                          ref={register({ required: true })}
                        />
                        {errors.noOfStudents && (
                          <span style={{ color: "red" }}>
                            This Field is Required
                          </span>
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
                          <span style={{ color: "red" }}>
                            This Field is Required
                          </span>
                        )}
                      </div>
                    </Grid>
                  </Grid>

                  <div className="mt-3">
                    <button className="btn btn-warning" type="submit">
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={handleUpdateDialogClose}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            {removeStatus === "loading" && <CircularProgress size={25} />}
            {showMenuButton && (
              <IconButton {...bindTrigger(popupState)}>
                <MoreVertIcon />
              </IconButton>
            )}

            <Menu {...bindMenu(popupState)}>
              <MenuItem
                style={{ color: "green" }}
                onClick={() => {
                  popupState.close();
                  console.log(props.session);
                  handleViewOpen();
                }}
              >
                <VisibilityIcon style={{ color: "green" }} />
                View
              </MenuItem>
              <MenuItem
                style={{ color: "red" }}
                onClick={() => {
                  popupState.close();
                  confirmDelete()
                    .then(() => remove(props.session._id))
                    .catch((err) => {
                      console.error(err);
                    });
                }}
              >
                <DeleteIcon style={{ color: "red" }} />
                Delete
              </MenuItem>
            </Menu>
          </>
        )}
      </PopupState>
    </>
  );
};
