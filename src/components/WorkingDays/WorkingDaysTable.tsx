import React, { useState } from "react";
import { WorkingDays } from "../../models/WorkingDays";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Chip,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  deleteWorkingDays,
  updateWorkingDays,
} from "../../api/working-days/working.days.request";
import { useForm } from "react-hook-form";
import { WorkingDaysUpdateData } from "../../api/interfaces";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DateRangeIcon from "@material-ui/icons/DateRange";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import "./WorkingDaysTable.css";
import { useFilterRows } from "../Common/TableViewComponents/useFilterData";
import { TableFooterPagination } from "../Common/TableViewComponents/TableFooterPagination";

export interface ManageWorkingDaysTableProps {
  workingDays: WorkingDays[];
  searchVal: string;
}

function filterData(tableData: WorkingDays[], searchText = "") {
  if (searchText === "") return tableData;
  return tableData.filter(
    (dataObj) =>
      dataObj.name && dataObj.name.toLowerCase().startsWith(searchText)
  );
}

const ManageWorkingDaysTable: React.SFC<ManageWorkingDaysTableProps> = ({
  workingDays,
  searchVal,
}: ManageWorkingDaysTableProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [view, setView] = useState(false);
  const [update, setUpdate] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [workingDay, setWorkingDay] = useState<WorkingDays>(Object);
  const { register, handleSubmit } = useForm();
  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const { pageData, tableFooterProps, noMatchingItems } = useFilterRows(
    searchVal,
    workingDays,
    filterData
  );

  const handleWorkingDay = (i) => {
    setWorkingDay(workingDays[i]);
  };

  const handleViewOpen = () => {
    setView(true);
  };

  const handleViewClose = () => {
    setView(false);
  };

  const handleUpdateOpen = () => {
    setUpdate(true);
  };

  const handleUpdateClose = () => {
    setUpdate(false);
  };

  const handleDeleteDialogOpen = () => {
    setDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialog(false);
  };

  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    handleWorkingDay(event.currentTarget.value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteAction = () => {
    deleteWorkingDays(workingDay?._id)
      .then((res) => {
        handleDeleteDialogClose();
        console.log(res);
      })
      .catch((err) => {
        handleDeleteDialogClose();
        console.error(err);
      });
  };

  const onUpdateAction = (data: any) => {
    console.log(data);

    const workingDaysData: WorkingDaysUpdateData = {
      _id: workingDay._id,
      name: data?.name,
      workingHours: {
        hours: parseInt(data?.hours),
        mins: parseInt(data?.mins),
      },
      selectedDays: {
        monday: data?.monday,
        tuesday: data?.tuesday,
        wednesday: data?.wednesday,
        thursday: data?.thursday,
        friday: data?.friday,
        saturday: data?.saturday,
        sunday: data?.sunday,
      },
      prefferedTimeSlots: {
        thirty: data?.thirty,
        sixty: data?.sixty,
      },
    };

    updateWorkingDays(workingDaysData)
      .then((res) => {
        console.log(res);
        handleUpdateClose();
        handleOpenSnackBar();
      })
      .catch((err) => console.error(err));
  };

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
              <TableCell style={{ fontFamily: "Varela Round" }}>Name</TableCell>
              <TableCell style={{ fontFamily: "Varela Round" }}>
                No of Wokring Days
              </TableCell>
              <TableCell style={{ fontFamily: "Varela Round" }}>
                No of Working Hours
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageData?.map((w: WorkingDays, index: number) => (
              <TableRow key={w._id} hover={true}>
                <TableCell>{w.name}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    color="primary"
                    label={
                      <span>
                        {w.selectedDays.friday ? "3" : "5"} days{" "}
                        <DateRangeIcon />
                      </span>
                    }
                    style={{ backgroundColor: "#0065ff" }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    color="secondary"
                    label={
                      <span>
                        {w?.workingHours?.hours +
                          " hours " +
                          w?.workingHours?.mins +
                          " mins "}

                        <WatchLaterIcon />
                      </span>
                    }
                    style={{ backgroundColor: "#00AD28" }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    value={index}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </Button>
                  <Menu
                    key={index}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={handleViewOpen}
                      style={{ color: "green" }}
                    >
                      <VisibilityIcon style={{ color: "green" }} />
                      &nbsp;&nbsp;View
                    </MenuItem>
                    <MenuItem
                      onClick={handleUpdateOpen}
                      style={{ color: "orange" }}
                    >
                      <EditIcon style={{ color: "orange" }} />
                      &nbsp;&nbsp;Update
                    </MenuItem>
                    <MenuItem
                      onClick={handleDeleteDialogOpen}
                      style={{ color: "red" }}
                    >
                      <DeleteIcon style={{ color: "red" }} />
                      &nbsp;&nbsp;Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog
          open={view}
          onClose={handleViewClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Working Days  Details"}
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <b>Name</b>
                    </TableCell>
                    <TableCell>{workingDay?.name}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <b>Working Hours </b>
                    </TableCell>
                    <TableCell>
                      {workingDay?.workingHours?.hours +
                        " hours and " +
                        workingDay?.workingHours?.mins +
                        "mins"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <button className="btn btn-primary" onClick={handleViewClose}>
              Close
            </button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={update}
          onClose={handleUpdateClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Update Working Day"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <form onSubmit={handleSubmit(onUpdateAction)} autoComplete="off">
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <b>Name </b>
                        </TableCell>

                        <TableCell>
                          <input
                            type="text"
                            className="form-control"
                            id="txtName"
                            aria-describedby="emailHelp"
                            name="name"
                            ref={register}
                            value={workingDay?.name}
                          />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <b>Selected Working Days</b>
                        </TableCell>

                        <TableCell>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="cbMonday"
                              name="monday"
                              ref={register}
                              checked={workingDay?.selectedDays?.monday}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="cbMonday"
                            >
                              Monday
                            </label>
                          </div>

                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="cbTuesday"
                              name="tuesday"
                              ref={register}
                              checked={workingDay?.selectedDays?.tuesday}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="cbTuesday"
                            >
                              Tuesday
                            </label>
                          </div>

                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="cbWednesday"
                              name="wednesday"
                              ref={register}
                              checked={workingDay?.selectedDays?.wednesday}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="cbWednesday"
                            >
                              Wednesday
                            </label>
                          </div>

                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="cbThursday"
                              name="thursday"
                              ref={register}
                              checked={workingDay?.selectedDays?.thursday}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="cbThursday"
                            >
                              Thursday
                            </label>
                          </div>

                          <div className="mt-2"></div>

                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="cbFriday"
                              name="friday"
                              ref={register}
                              checked={workingDay?.selectedDays?.friday}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="cbFriday"
                            >
                              Friday
                            </label>
                          </div>

                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="cbSaturday"
                              name="saturday"
                              ref={register}
                              checked={workingDay?.selectedDays?.saturday}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="cbSaturday"
                            >
                              Saturday
                            </label>
                          </div>

                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="cbSunday"
                              name="sunday"
                              ref={register}
                              checked={workingDay?.selectedDays?.sunday}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="cbSunday"
                            >
                              Sunday
                            </label>
                          </div>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <b>Working Hours per Day</b>
                        </TableCell>
                        <TableCell>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <div>
                                <label htmlFor="txtName" className="form-label">
                                  Hours
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="txtName"
                                  name="hours"
                                  ref={register}
                                  value={workingDay?.workingHours?.hours}
                                />
                              </div>
                            </Grid>

                            <Grid item xs={6}>
                              <div>
                                <label htmlFor="txtName" className="form-label">
                                  Mins
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="txtName"
                                  name="mins"
                                  ref={register}
                                  value={workingDay?.workingHours?.mins}
                                />
                              </div>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <b> Preffered time slots</b>
                        </TableCell>

                        <TableCell>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="cbThirtyMin"
                              name="thirty"
                              ref={register}
                              checked={workingDay?.prefferedTimeSlots?.thirty}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="cbThirtyMin"
                            >
                              30 Min
                            </label>
                          </div>

                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="cbSixtyMin"
                              name="sixty"
                              ref={register}
                              checked={workingDay?.prefferedTimeSlots?.sixty}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="cbSixtyMin"
                            >
                              60 Min
                            </label>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div style={{ alignContent: "center" }}>
                    <button type="submit" className="btn btn-primary btn-abc">
                      Save
                    </button>{" "}
                    <button
                      className="btn btn-danger"
                      onClick={handleUpdateClose}
                    >
                      Cancel
                    </button>
                  </div>
                </TableContainer>
              </form>
            </DialogContentText>
          </DialogContent>
        </Dialog>

        <Dialog
          open={deleteDialog}
          onClose={handleDeleteDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Working Day"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to delete {workingDay?.name} ?
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <button className="btn btn-primary" onClick={handleDeleteAction}>
              Yes
            </button>
            <button className="btn btn-danger" onClick={handleDeleteDialogOpen}>
              Cancel
            </button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={openSnackBar}
          autoHideDuration={600}
          onClose={handleClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            Success message!
          </Alert>
        </Snackbar>
      </TableContainer>

      {noMatchingItems && (
        <Alert severity="info">No matching Working Days</Alert>
      )}
      <TableFooterPagination {...tableFooterProps} />
    </>
  );
};

export default ManageWorkingDaysTable;
