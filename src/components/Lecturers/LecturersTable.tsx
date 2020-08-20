import React from "react";
import { Lecturer } from "../../models/Lecturer";
//import { Portal } from "react-portal";
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
  TextField,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export interface ManageLecturersTableProps {
  lecturers: Lecturer[];
}

const ManageLecturersTable: React.SFC<ManageLecturersTableProps> = ({
  lecturers,
}: ManageLecturersTableProps) => {
  //   const getNoOfWorkingDays = (s) => (number) => {
  //     console.log(s);
  //     return 77;
  //   };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [view, setView] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [lecturer, setLecturer] = React.useState<Lecturer>(Object);

  const handleLecturer = (i) => {
    setLecturer(lecturers[i]);
    console.log(lecturer);
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
    handleLecturer(event.currentTarget.value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
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
            <DialogContentText id="alert-dialog-description">
              <form noValidate autoComplete="off">
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <TextField
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            id="outlined-basic"
                            label="Employee Id"
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <FormControl variant="outlined">
                            <InputLabel id="demo-simple-select-outlined-label">
                              Age
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={age}
                              onChange={handleChange}
                              label="Age"
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <TextField
                            id="outlined-basic"
                            label="Department"
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {" "}
                          <FormControl variant="outlined">
                            <InputLabel id="demo-simple-select-outlined-label">
                              Age
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={age}
                              onChange={handleChange}
                              label="Age"
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <FormControl variant="outlined">
                            <InputLabel id="demo-simple-select-outlined-label">
                              Age
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={age}
                              onChange={handleChange}
                              label="Age"
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <FormControl variant="outlined">
                            <InputLabel id="demo-simple-select-outlined-label">
                              Age
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={age}
                              onChange={handleChange}
                              label="Age"
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <TextField
                            id="outlined-basic"
                            label="Rank"
                            variant="outlined"
                          />
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

export default ManageLecturersTable;
