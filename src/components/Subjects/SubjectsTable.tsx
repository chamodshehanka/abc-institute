/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Subject } from "../../models/Subject";
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
  deleteSubject,
  updateSubject,
} from "../../api/subjects/subjects.request";
import Alert from "@material-ui/lab/Alert";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useFilterRows } from "../Common/TableViewComponents/useFilterData";
import { TableFooterPagination } from "../Common/TableViewComponents/TableFooterPagination";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useDeletePrompt } from "../Common/DeletePrompt/DeletePrompt";
import { useMutation } from "react-query";
import { useToast } from "../../hooks/useToast";
import { useForm } from "react-hook-form";
import { SubjectUpdateData } from "../../api/interfaces";

export interface ManageSubjectsTableProps {
  subjects: Subject[];
  searchVal: string;
}

function filterData(tableData: Subject[], searchText = "") {
  if (searchText === "") return tableData;
  return tableData.filter(
    (dataObj) =>
      dataObj.subjectName &&
      dataObj.subjectName.toLowerCase().startsWith(searchText)
  );
}

const ManageSubjectsTable: React.SFC<ManageSubjectsTableProps> = ({
  subjects,
  searchVal,
}: ManageSubjectsTableProps) => {
  const { pageData, tableFooterProps, noMatchingItems } = useFilterRows(
    searchVal,
    subjects,
    filterData
  );

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
              <TableCell style={{ fontFamily: "Varela Round" }}>
                Offered Year
              </TableCell>
              <TableCell style={{ fontFamily: "Varela Round" }}>
                Offered Semester
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageData?.map((s: Subject) => (
              <TableRow key={s._id} hover={true}>
                <TableCell style={{ fontFamily: "Varela Round" }}>
                  {s.subjectName}
                </TableCell>
                <TableCell>{s.subjectCode}</TableCell>
                <TableCell>{s.offeredYear}</TableCell>
                <TableCell>{s.offeredSemester}</TableCell>
                <TableCell style={{ width: "5rem" }}>
                  <div className="display-flex align-center justify-end">
                    <SubjectAction subject={s} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {noMatchingItems && (
        <Alert severity="info">No Matching Subject Found</Alert>
      )}
      <TableFooterPagination {...tableFooterProps} />
    </>
  );
};

export default ManageSubjectsTable;

export interface SubjectsActionProps {
  subject: Subject;
}

const SubjectAction: React.FC<SubjectsActionProps> = (props) => {
  const displayToast = useToast();
  const confirmDelete = useDeletePrompt({
    resourceType: "Subject",
    textType: "Code",
    textToMatch: props.subject.subjectCode,
  });

  const [view, setView] = React.useState(false);
  const handleViewOpen = () => {
    setView(true);
  };

  const handleViewClose = () => {
    setView(false);
  };

  const [updateDialog, setUpdateDialog] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleUpdateDialogOpen = () => {
    setUpdateDialog(true);
  };

  const handleUpdateDialogClose = () => {
    setUpdateDialog(false);
  };

  const [name, setName] = useState(props.subject.subjectName);
  const [code, setCode] = useState(props.subject.subjectCode);
  const [year, setYear] = useState(props.subject.offeredYear);
  const [semester, setSemester] = useState(props.subject.offeredSemester);
  const [lecture, setLecture] = useState(props.subject.lectureHours);
  const [lab, setLab] = useState(props.subject.labHours);
  const [tutorial, setTutorial] = useState(props.subject.tutorialHours);
  const [evaluation, setEvaluation] = useState(props.subject.evaluationHours);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [id, setId] = useState(props.subject._id);

  const onSubmit = (data: any) => {
    console.log(data);
    const subject: SubjectUpdateData = {
      _id: id,
      subjectName: data?.subjectName,
      subjectCode: data?.subjectCode,
      offeredYear: data?.offeredYear,
      offeredSemester: data?.offeredSemester,
      lectureHours: data?.lectureHours,
      labHours: data?.labHours,
      tutorialHours: data?.tutorialHours,
      evaluationHours: data?.evaluationHours,
    };

    updateSubject(subject)
      .then((res) => {
        console.log(res);
        handleUpdateDialogClose();
        displayToast(
          `Subject ${props.subject.subjectCode} Succesfully Updated` || "Hi ",
          "default"
        );
      })
      .catch((err) => {
        handleUpdateDialogClose();
        displayToast(
          `Subject ${props.subject.subjectCode} Updation Failed` || "Hi ",
          "default"
        );
        console.error(err);
      });
  };

  const [remove, { status: removeStatus }] = useMutation(deleteSubject, {
    onError() {
      console.log("errrrrrrrr");
      displayToast(
        `Subject ${props.subject.subjectCode} Removing Failed` || "Hi ",
        "default"
      );
    },
    onSuccess() {
      displayToast(`Subject ${props.subject.subjectCode}  Removed`, "default");
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
                {"Subject Details"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Table aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell>Subject Name</TableCell>
                        <TableCell>{props.subject.subjectName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Subject Code</TableCell>
                        <TableCell>{props.subject.subjectCode}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Offered Year</TableCell>
                        <TableCell>{props.subject.offeredYear}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Offered Semester</TableCell>
                        <TableCell>{props.subject.offeredSemester}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Lecture Hours</TableCell>
                        <TableCell>{props.subject.lectureHours}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Lab Hours</TableCell>
                        <TableCell>{props.subject.labHours}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Tutorial Hours</TableCell>
                        <TableCell>{props.subject.tutorialHours}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Evaluation Hours</TableCell>
                        <TableCell>{props.subject.evaluationHours}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
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
                          id="subjectName"
                          aria-describedby="emailHelp"
                          name="subjectName"
                          onChange={(e) => setName(e.target.value)}
                          ref={register}
                          value={name}
                          onFocus={() => {
                            setName("");
                          }}
                        />
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
                          onChange={(e) => setCode(e.target.value)}
                          ref={register}
                          value={code}
                          onFocus={() => {
                            setCode("");
                          }}
                        />
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
                        onChange={(e) => setYear(e.target.value)}
                        ref={register}
                        value={year}
                        onFocus={() => {
                          setYear("");
                        }}
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
                        onChange={(e) => setSemester(e.target.value)}
                        ref={register}
                        value={semester}
                        onFocus={() => {
                          setSemester("");
                        }}
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
                          onChange={(e) => setLecture(e.target.value)}
                          ref={register}
                          value={lecture}
                          onFocus={() => {
                            setLecture("");
                          }}
                        />
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
                          onChange={(e) => setLab(e.target.value)}
                          ref={register}
                          value={lab}
                          onFocus={() => {
                            setLab("");
                          }}
                        />
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
                          onChange={(e) => setTutorial(e.target.value)}
                          ref={register}
                          value={tutorial}
                          onFocus={() => {
                            setTutorial("");
                          }}
                        />
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
                          onChange={(e) => setEvaluation(e.target.value)}
                          ref={register}
                          value={evaluation}
                          onFocus={() => {
                            setEvaluation("");
                          }}
                        />
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
                  console.log(props.subject);
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
                    .then(() => remove(props.subject._id))
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
