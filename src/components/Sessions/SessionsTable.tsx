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
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  deleteSession,
  updateSession,
} from "../../api/sessions/sessions.request";
import Alert from "@material-ui/lab/Alert";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useFilterRows } from "../Common/TableViewComponents/useFilterData";
import { TableFooterPagination } from "../Common/TableViewComponents/TableFooterPagination";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useDeletePrompt } from "../Common/DeletePrompt/DeletePrompt";
import { useMutation } from "react-query";
import { useToast } from "../../hooks/useToast";
import { useForm } from "react-hook-form";
import { SessionUpdateData } from "../../api/interfaces";
import { useHistory } from "react-router-dom";

export interface ManageSessionsTableProps {
  sessions: Session[];
  searchVal: string;
}

function filterData(tableData: Session[], searchText = "") {
  if (searchText === "") return tableData;
  return tableData.filter(
    (dataObj) =>
      dataObj.subject && dataObj.subject.toLowerCase().startsWith(searchText)
  );
}

const ManageSessionsTable: React.SFC<ManageSessionsTableProps> = ({
  sessions,
  searchVal,
}: ManageSessionsTableProps) => {
  const { pageData, tableFooterProps, noMatchingItems } = useFilterRows(
    searchVal,
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

  const [name, setSubject] = useState(props.session.subject);
  const [code, setSubjectCode] = useState(props.session.subjectCode);
  const [lecturers, setLecturers] = useState(props.session.lecturers);
  const [group, setStudentGroup] = useState(props.session.studentGroup);
  const [duration, setDuration] = useState(props.session.duration);
  const [noOfStudents, setNoOfStudents] = useState(props.session.noOfStudents);
  const [tags, setTags] = useState(props.session.tags);

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
      rooms: [],
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
                {"Update Subject"}
              </DialogTitle>

              <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} noValidate={false}>
                  <Grid container spacing={2} className="form-row">
                    <Grid item xs={6}>
                      <div>
                        <label htmlFor="subjectName" className="form-label">
                          Subject Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="subject"
                          aria-describedby="emailHelp"
                          name="subject"
                          onChange={(e) => setSubject(e.target.value)}
                          ref={register({ required: true })}
                          value={name}
                          onFocus={() => {
                            setSubject("");
                          }}
                        />
                        {errors.subject && (
                          <span style={{ color: "red" }}>
                            This Field is Required
                          </span>
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
                          onChange={(e) => setSubjectCode(e.target.value)}
                          ref={register({ required: true })}
                          value={code}
                          onFocus={() => {
                            setSubjectCode("");
                          }}
                        />
                        {errors.subjectCode && (
                          <span style={{ color: "red" }}>
                            This Field is Required
                          </span>
                        )}
                      </div>
                    </Grid>

                    <Grid item xs={6}>
                      <label htmlFor="lecturers" className="form-label">
                        Lecturers
                      </label>
                      <select
                        className="form-select"
                        aria-label="lecturers"
                        name="lecturers"
                        onChange={(e) => setLecturers([])}
                        ref={register({ required: true })}
                        value={lecturers}
                        onFocus={() => {
                          setLecturers([]);
                        }}
                      >
                        <option selected value="1">
                          1
                        </option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                      {errors.lecturers && (
                        <span style={{ color: "red" }}>
                          This Field is Required
                        </span>
                      )}
                    </Grid>

                    <Grid item xs={6}>
                      <label htmlFor="tags" className="form-label">
                        Tags
                      </label>
                      <select
                        className="form-select"
                        aria-label="tags"
                        name="tags"
                        onChange={(e) => setTags(e.target.value)}
                        ref={register({ required: true })}
                        value={tags}
                        onFocus={() => {
                          setTags("");
                        }}
                      >
                        <option selected value="1">
                          1
                        </option>
                        <option value="2">2</option>
                      </select>
                      {errors.offeredSemester && (
                        <span style={{ color: "red" }}>
                          This Field is Required
                        </span>
                      )}
                    </Grid>

                    <Grid item xs={6}>
                      <div>
                        <label htmlFor="student group" className="form-label">
                          Student Group
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="studentGroup"
                          aria-describedby="emailHelp"
                          name="studentGroup"
                          onChange={(e) => setStudentGroup(e.target.value)}
                          ref={register({ required: true })}
                          value={group}
                          onFocus={() => {
                            setStudentGroup("");
                          }}
                        />
                        {errors.studentGroup && (
                          <span style={{ color: "red" }}>
                            This Field is Required
                          </span>
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
                          onChange={(e) =>
                            setNoOfStudents(parseInt(e.target.value))
                          }
                          ref={register({ required: true })}
                          value={noOfStudents}
                          onFocus={() => {
                            setNoOfStudents(0);
                          }}
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
                          type="number"
                          className="form-control"
                          id="duration"
                          aria-describedby="emailHelp"
                          name="duration"
                          onChange={(e) =>
                            setDuration(parseInt(e.target.value))
                          }
                          ref={register({ required: true })}
                          value={duration}
                          onFocus={() => {
                            setDuration(0);
                          }}
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
                onClick={() => {
                  popupState.close();
                  handleUpdateDialogOpen();
                }}
                style={{ color: "orange" }}
              >
                <EditIcon style={{ color: "orange" }} />
                Edit
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
