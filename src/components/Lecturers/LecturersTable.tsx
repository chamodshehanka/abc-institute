/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Lecturer } from "../../models/Lecturer";
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
  deleteLecturer,
  updateLecturer,
} from "../../api/lecturers/lecturers.request";
import Alert from "@material-ui/lab/Alert";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useFilterRows } from "../Common/TableViewComponents/useFilterData";
import { TableFooterPagination } from "../Common/TableViewComponents/TableFooterPagination";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useDeletePrompt } from "../Common/DeletePrompt/DeletePrompt";
import { useMutation } from "react-query";
import { useToast } from "../../hooks/useToast";
import { useForm } from "react-hook-form";
import { LecturerUpdateData } from "../../api/interfaces";
import { useHistory } from "react-router-dom";
import { useGetBuildings } from "../../queries/useGetBuildings";

export interface ManageLecturerTableProps {
  lecturers: Lecturer[];
  searchVal: string;
}

function filterData(tableData: Lecturer[], searchText = "") {
  if (searchText === "") return tableData;
  return tableData.filter(
    (dataObj) =>
      dataObj.name && dataObj.name.toLowerCase().startsWith(searchText)
  );
}

const ManageLecturersTable: React.SFC<ManageLecturerTableProps> = ({
  lecturers,
  searchVal,
}: ManageLecturerTableProps) => {
  const { pageData, tableFooterProps, noMatchingItems } = useFilterRows(
    searchVal,
    lecturers,
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
            <TableCell>Name</TableCell>
            <TableCell>Employee Id</TableCell>
            <TableCell>Faculty</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Centre</TableCell>
            <TableCell>Options</TableCell>
          </TableHead>
          <TableBody>
            {lecturers?.map((l: Lecturer) => (
              <TableRow key={l._id}>
                <TableCell>{l.name}</TableCell>
                <TableCell>{l.employeeId}</TableCell>
                <TableCell>{l.faculty}</TableCell>
                <TableCell>{l.department}</TableCell>
                <TableCell>{l.centre}</TableCell>
                <TableCell style={{ width: "5rem" }}>
                  <div className="display-flex align-center justify-end">
                    <SubjectAction lecturer={l} history={history} />
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

export default ManageLecturersTable;

export interface LecturersActionProps {
  lecturer: Lecturer;
  history: any;
}

const SubjectAction: React.FC<LecturersActionProps> = (props) => {
  const displayToast = useToast();
  const confirmDelete = useDeletePrompt({
    resourceType: "Lecturer",
    textType: "Name",
    textToMatch: props.lecturer.name,
  });

  const [view, setView] = React.useState(false);
  const buildings = useGetBuildings().data;
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

  const [name, setName] = useState(props.lecturer.name);
  const [code, setempId] = useState(props.lecturer.employeeId);
  const [faculty, setFaculty] = useState(props.lecturer.faculty);
  const [department, setDepartment] = useState(props.lecturer.department);
  const [centre, setCentre] = useState(props.lecturer.centre);
  const [building, setBuilding] = useState(props.lecturer.building);
  const [level, setLevel] = useState(props.lecturer.level);
  const [rank, setRank] = useState(props.lecturer.rank);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [id, setId] = useState(props.lecturer._id);

  const onSubmit = (data: any) => {
    console.log(data);
    const lecturer: LecturerUpdateData = {
      _id: id,
      name: data?.name,
      employeeId: data?.employeeId,
      faculty: data?.faculty,
      department: data?.department,
      centre: data?.center,
      building: data?.building,
      level: data?.level,
      rank: data?.rank,
    };

    updateLecturer(lecturer)
      .then((res) => {
        console.log(res);
        handleUpdateDialogClose();
        displayToast(
          `Lecturer ${props.lecturer.name} Succesfully Updated` || "Hi ",
          "default"
        );
        props.history.push("manage-subjects");
        props.history.push("manage-lecturers");
      })
      .catch((err) => {
        handleUpdateDialogClose();
        displayToast(
          `Lecturer ${props.lecturer.name} Updation Failed` || "Hi ",
          "default"
        );
        console.error(err);
      });
  };

  const [remove, { status: removeStatus }] = useMutation(deleteLecturer, {
    onError() {
      console.log("errrrrrrrr");
      displayToast(
        `Lecturer ${props.lecturer.name} Removing Failed` || "Hi ",
        "default"
      );
      props.history.push("manage-subjects");
      props.history.push("manage-lecturers");
    },
    onSuccess() {
      displayToast(`Lecturer ${props.lecturer.name}  Removed`, "default");
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
                {"Lecturer Details"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Table aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>{props.lecturer.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Employee Id</TableCell>
                        <TableCell>{props.lecturer.employeeId}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Faculty</TableCell>
                        <TableCell>{props.lecturer.faculty}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Department</TableCell>
                        <TableCell>{props.lecturer.department}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>centre</TableCell>
                        <TableCell>{props.lecturer.centre}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Bulding</TableCell>
                        <TableCell>{props.lecturer.building}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Level</TableCell>
                        <TableCell>{props.lecturer.level}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell>{props.lecturer.rank}</TableCell>
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
                {"Update Lecturer"}
              </DialogTitle>

              <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} noValidate={false}>
                  <Grid container spacing={2} className="form-row">
                    <Grid item xs={6}>
                      <div>
                        <label htmlFor="name" className="form-label">
                          Lecturer Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          aria-describedby="emailHelp"
                          name="name"
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
                        <label htmlFor="employeeId" className="form-label">
                          Employee Id
                        </label>
                        <label
                          style={{ marginLeft: "110px", color: "#C0C0C0" }}
                        >
                          000150
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="employeeId"
                          aria-describedby="emailHelp"
                          name="employeeId"
                          onChange={(e) => setempId(e.target.value)}
                          ref={register}
                          value={code}
                          onFocus={() => {
                            setempId("");
                          }}
                        />
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
                        ref={register}
                        onChange={(e) => setFaculty(e.target.value)}
                        value={faculty}
                        onFocus={() => {
                          setFaculty("");
                        }}
                      >
                        <option selected value="Computing">
                          Computing
                        </option>
                        <option value="Business">Business</option>
                        <option value="Engineering">Engineering</option>
                      </select>
                    </Grid>

                    <Grid item xs={6}>
                      <label htmlFor="department" className="form-label">
                        Department
                      </label>
                      <select
                        className="form-select"
                        aria-label="Department"
                        name="department"
                        onChange={(e) => setDepartment(e.target.value)}
                        ref={register}
                        value={department}
                        onFocus={() => {
                          setDepartment("");
                        }}
                      >
                        <option selected value="SE">
                          SE
                        </option>
                        <option value="IT">IT</option>
                        <option value="DS">DS</option>
                      </select>
                    </Grid>

                    <Grid item xs={6}>
                      <div>
                        <label htmlFor="center" className="form-label">
                          Centre
                        </label>
                        <select
                          className="form-select"
                          aria-label="Center"
                          name="center"
                          onChange={(e) => setCentre(e.target.value)}
                          ref={register}
                          value={centre}
                          onFocus={() => {
                            setCentre("");
                          }}
                        >
                          <option selected value="Malabe">
                            Malabe
                          </option>
                          <option value="Kandy">Kandy</option>
                          <option value="Matara">Matara</option>
                        </select>
                      </div>
                    </Grid>

                    <Grid item xs={6}>
                      <div>
                        <label htmlFor="building" className="form-label">
                          Building
                        </label>
                        <select
                          className="form-select"
                          aria-label="Building"
                          name="building"
                          onChange={(e) => setBuilding(e.target.value)}
                          ref={register}
                          value={building}
                          onFocus={() => {
                            setBuilding("");
                          }}
                        >
                          {buildings?.map((b: Buildings) => (
                            <option value={b.name}>{b.name}</option>
                          ))}
                        </select>
                      </div>
                    </Grid>

                    <Grid item xs={6}>
                      <div>
                        <label htmlFor="level" className="form-label">
                          Level
                        </label>
                        <select
                          className="form-select"
                          aria-label="Level"
                          name="level"
                          onChange={(e) => setLevel(e.target.value)}
                          ref={register}
                          value={level}
                          onFocus={() => {
                            setLevel("");
                          }}
                        >
                          <option selected value="1">
                            Professor
                          </option>
                          <option value="2">Assistant Professor</option>
                          <option value="3">Senior Lecturer(HG)</option>
                          <option value="4">Senior Lecturer</option>
                          <option value="5">Lecturer</option>
                          <option value="6">Assistant Lecturer</option>
                          <option value="7">Instructors</option>
                        </select>
                      </div>
                    </Grid>

                    <Grid item xs={6}>
                      <div>
                        <label htmlFor="rank" className="form-label">
                          Rank
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="txtName"
                          aria-describedby="emailHelp"
                          name="rank"
                          onChange={(e) => setRank(e.target.value)}
                          ref={register}
                          value={rank}
                          onFocus={() => {
                            setRank("");
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
                    .then(() => remove(props.lecturer._id))
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
