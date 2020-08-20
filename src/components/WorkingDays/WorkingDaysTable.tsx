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
  TextField,
  DialogActions,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";

export interface ManageWorkingDaysTableProps {
  workingDays: WorkingDays[];
}

const ManageWorkingDaysTable: React.SFC<ManageWorkingDaysTableProps> = ({
  workingDays,
}: ManageWorkingDaysTableProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [view, setView] = useState(false);
  const [update, setUpdate] = useState(false);
  const [workingDay, setWorkingDay] = useState<WorkingDays>(Object);

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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    handleWorkingDay(event.currentTarget.value);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            <TableCell>Name</TableCell>
            <TableCell>No of Wokring Days</TableCell>
            <TableCell>No of Working Hours</TableCell>
            <TableCell></TableCell>
          </TableHead>
          <TableBody>
            {workingDays?.map((w: WorkingDays, index: number) => (
              <TableRow key={w._id}>
                <TableCell>{w.name}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    color="primary"
                    label={<span>{w.selectedDays.friday ? "3" : "5"}</span>}
                  />
                </TableCell>
                <TableCell>
                  <Chip size="small" color="secondary" label={<span>5</span>} />
                </TableCell>
                <TableCell>
                  <Button
                    value={index}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MenuIcon />
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
                    <MenuItem onClick={handleClose} style={{ color: "red" }}>
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
              <form noValidate autoComplete="off">
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <TextField></TextField>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </form>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </TableContainer>
    </>
  );
};

export default ManageWorkingDaysTable;
