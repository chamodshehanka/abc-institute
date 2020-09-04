import React from "react";
import { Lecturer } from "../../models/Lecturer";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Button,
  Menu,
  MenuItem,
  Grid,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  deleteLecturer,
  updateLecturer,
} from "../../api/lecturers/lecturers.request";
import { useForm } from "react-hook-form";
import { LecturerUpdateData } from "../../api/interfaces";

export interface ManageLecturersTableProps {
  lecturers: Lecturer[];
}

const ManageLecturersTable: React.SFC<ManageLecturersTableProps> = ({
  lecturers,
}: ManageLecturersTableProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [view, setView] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [lecturer, setLecturer] = React.useState<Lecturer>(Object);
  const { register, handleSubmit } = useForm();

  const handleLecturer = (i) => {
    setLecturer(lecturers[i]);
  };

  const handleViewOpen = () => {
    setView(true);
  };

  const handleViewClose = () => {
    setView(false);
  };

  const handleUpdateOpen = () => {
    console.log(lecturer);
    setUpdate(true);
  };

  const handleUpdateClose = () => {
    setUpdate(false);
  };

  const onSubmit = (data: any) => {
    const lecturer: LecturerUpdateData = {
      _id: data?._id,
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
        handleUpdateClose();
      })
      .catch((err) => {
        handleUpdateClose();
        console.error(err);
      });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    handleLecturer(event.currentTarget.value);
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
            <TableCell>Employee Id</TableCell>
            <TableCell>Faculty</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Centre</TableCell>
            <TableCell>Options</TableCell>
          </TableHead>
          <TableBody>
            {lecturers?.map((l: Lecturer, index: number) => (
              <TableRow key={l._id}>
                <TableCell>{l.name}</TableCell>
                <TableCell>{l.employeeId}</TableCell>
                <TableCell>{l.faculty}</TableCell>
                <TableCell>{l.department}</TableCell>
                <TableCell>{l.centre}</TableCell>
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
                    <MenuItem
                      onClick={() => {
                        deleteLecturer(l?._id)
                          .then((res) => {
                            console.log(res);
                            handleClose();
                          })
                          .catch((err) => {
                            console.error(err);
                            handleClose();
                          });
                      }}
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
            {"Lecturer Details"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>{lecturer.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Employee Id</TableCell>
                    <TableCell>{lecturer.employeeId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Faculty</TableCell>
                    <TableCell>{lecturer.faculty}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Department</TableCell>
                    <TableCell>{lecturer.department}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>centre</TableCell>
                    <TableCell>{lecturer.centre}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bulding</TableCell>
                    <TableCell>{lecturer.building}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Level</TableCell>
                    <TableCell>{lecturer.level}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>{lecturer.rank}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <Dialog
          open={update}
          onClose={handleUpdateClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Update Lecturer"}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} className="form-row">
                <Grid item xs={6}>
                  <div>
                    <label htmlFor="txtName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="txtName"
                      aria-describedby="emailHelp"
                      name="name"
                      ref={register}
                    />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div>
                    <label htmlFor="txtName" className="form-label">
                      Employee ID
                    </label>
                    <label style={{ marginLeft: "110px", color: "#C0C0C0" }}>
                      000150
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="txtName"
                      aria-describedby="emailHelp"
                      name="employeeId"
                      ref={register}
                    />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <select
                    className="form-select"
                    aria-label="Faculty"
                    name="faculty"
                    ref={register}
                  >
                    <option selected>Faculty</option>
                    <option value="Computing">Computing</option>
                    <option value="Business">Business</option>
                    <option value="Engineering">Engineering</option>
                  </select>
                </Grid>

                <Grid item xs={6}>
                  <select
                    className="form-select"
                    aria-label="Department"
                    name="department"
                    ref={register}
                  >
                    <option selected>Department</option>
                    <option value="SE">SE</option>
                    <option value="IT">IT</option>
                    <option value="DS">DS</option>
                  </select>
                </Grid>

                <Grid item xs={6}>
                  <select
                    className="form-select"
                    aria-label="Center"
                    name="center"
                    ref={register}
                  >
                    <option selected>Center</option>
                    <option value="Malabe">Malabe</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Matara">Matara</option>
                  </select>
                </Grid>

                <Grid item xs={6}>
                  <select
                    className="form-select"
                    aria-label="Building"
                    name="building"
                    ref={register}
                  >
                    <option selected>Building</option>
                    <option value="New Building">New Building</option>
                    <option value="Main">Main</option>
                  </select>
                </Grid>

                <Grid item xs={6}>
                  <select
                    className="form-select"
                    aria-label="Level"
                    name="level"
                    ref={register}
                  >
                    <option selected>Level</option>
                    <option value="1">Professor</option>
                    <option value="2">Assistant Professor</option>
                    <option value="3">Senior Lecturer(HG)</option>
                    <option value="4">Senior Lecturer</option>
                    <option value="5">Lecturer</option>
                    <option value="6">Assistant Lecturer</option>
                    <option value="7">Instructors</option>
                  </select>
                </Grid>

                <Grid item xs={6}>
                  <div>
                    <label htmlFor="txtName" className="form-label">
                      Rank
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="txtName"
                      aria-describedby="emailHelp"
                      name="rank"
                      ref={register}
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    id="_id"
                    aria-describedby="emailHelp"
                    name="_id"
                    hidden={true}
                    ref={register}
                  />
                </div>
              </Grid>

              <div className="mt-3">
                <button className="btn btn-primary" type="submit">
                  Save
                </button>{" "}
                <button className="btn btn-danger" onClick={handleUpdateClose}>
                  Cancel
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </TableContainer>
    </>
  );
};

export default ManageLecturersTable;
