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
import AddCircleIcon from "@material-ui/icons/AddCircle";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Alert from "@material-ui/lab/Alert";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useFilterRows } from "../Common/TableViewComponents/useFilterData";
import { TableFooterPagination } from "../Common/TableViewComponents/TableFooterPagination";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useMutation } from "react-query";
import { useToast } from "../../hooks/useToast";
import { useForm } from "react-hook-form";
import {
  addNotAvailable,
  deleteNotAvailable,
} from "../../api/student/notAvailable.requets";
import { NotAvailableCreateData } from "../../api/interfaces";
import { useHistory } from "react-router-dom";

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
  const {pageData, tableFooterProps, noMatchingItems } = useFilterRows(
    searchVal,
    lecturers,
    filterData
  );

  return (
    <>
      <TableContainer className="table-container expandable-table-container">
        <Table
          size="small"
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
            {pageData?.map((l: Lecturer) => (
              <TableRow key={l._id}>
                <TableCell>{l.name}</TableCell>
                <TableCell>{l.employeeId}</TableCell>
                <TableCell>{l.faculty}</TableCell>
                <TableCell>{l.department}</TableCell>
                <TableCell>{l.centre}</TableCell>
                <TableCell style={{ width: "5rem" }}>
                  <div className="display-flex align-center justify-end">
                    <SubjectAction lecturer={l} />
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
}

const SubjectAction: React.FC<LecturersActionProps> = (props) => {
  const displayToast = useToast();
  // const confirmDelete = useDeletePrompt({
  //   resourceType: "Lecturer",
  //   textType: "Name",
  //   textToMatch: props.lecturer.name,
  // });

  const [view, setView] = React.useState(false);
  const handleViewOpen = () => {
    setView(true);
  };

  const handleViewClose = () => {
    setView(false);
  };

  const [allocateDialog, setAllocateDialog] = useState(false);

  const handleAllocateDialogOpen = () => {
    setAllocateDialog(true);
  };

  const handleAllocateDialogClose = () => {
    setAllocateDialog(false);
  };

  const history = useHistory();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [id, setId] = useState(props.lecturer._id);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    const programme: NotAvailableCreateData = {
      type: data?.type,
      typeId: data?.typeId,
      name: data?.name,
      day: data?.day,
      stime: data?.stime,
      ltime: data?.ltime,
    };

    addNotAvailable(programme)
      .then((res) => {
        console.log(res);
        history.push("student-year-screen");
        history.push("not-available-screen");
      })
      .catch((err) => console.error(err));
  };

  const [remove, { status: removeStatus }] = useMutation(deleteNotAvailable, {
    onError() {
      console.log("errrrrrrrr", remove);
      displayToast(
        `Lecturer ${props.lecturer.name} Removing Failed` || "Hi ",
        "default"
      );
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
              open={allocateDialog}
              onClose={handleAllocateDialogClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Allocate Not Available Time for Lecturers"}
              </DialogTitle>

              <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} noValidate={false}>
                  <Grid container spacing={2} className="form-row">
                    <input
                      type="hidden"
                      id="type"
                      name="type"
                      value="Lecturer"
                      ref={register}
                    />
                    <input
                      type="hidden"
                      id="typeId"
                      name="typeId"
                      value={props.lecturer.employeeId}
                      ref={register}
                    />
                    <input
                      type="hidden"
                      id="name"
                      name="name"
                      value={props.lecturer.name}
                      ref={register}
                    />
                    <Grid item xs={6}>
                      <div>
                        <label htmlFor="name" className="form-label">
                          Date :{" "}
                        </label>
                        <select
                          id="day"
                          className="form-select"
                          name="day"
                          ref={register}
                        >
                          <option value="Monday">Monday</option>
                          <option value="Tuesday">Tuesday</option>
                          <option value="Wednesday">Wednesday</option>
                          <option value="Thursday">Thursday</option>
                          <option value="Friday">Friday</option>
                          <option value="Saturday">Saturday</option>
                          <option value="Sunday">Sunday</option>
                        </select>
                      </div>
                    </Grid>

                    <Grid item xs={6}>
                      <div>
                        <label htmlFor="employeeId" className="form-label">
                          Not Available time
                        </label>
                        <input
                          type="time"
                          id="stime"
                          name="stime"
                          ref={register}
                          className="form-control"
                        />
                        <label
                          htmlFor="employeeId"
                          style={{ marginLeft: 70 }}
                          className="form-label"
                        >
                          to
                        </label>
                        <input
                          type="time"
                          id="ltime"
                          name="ltime"
                          ref={register}
                          className="form-control"
                        />
                      </div>
                    </Grid>
                  </Grid>

                  <div className="mt-3" style={{ marginLeft: 70 }}>
                    <button className="btn btn-warning" type="submit">
                      Allocate
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={handleAllocateDialogClose}
                      style={{ marginLeft: 10 }}
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
                  handleAllocateDialogOpen();
                }}
                style={{ color: "#2C8AFF" }}
              >
                <AddCircleIcon style={{ color: "#2C8AFF" }} />
                Allocate
              </MenuItem>
            </Menu>
          </>
        )}
      </PopupState>
    </>
  );
};
