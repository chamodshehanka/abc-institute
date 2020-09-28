import React, { useState } from "react";
import {
  Container,
  Card,
  LinearProgress,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { useGetLecturers } from "../../queries/useGetLecturers";
import { useGenerateGroupId } from "../../queries/useGenerateGroupId";
import { useGenerateSubGroupId } from "../../queries/useGenerateSubGroupId";
import ManageLecturersTable from "../../components/NotAvailable/LecturersDetailsTable";
import ManageGenerateGroupTable from "../../components/NotAvailable/GeneratGroupTable";
import ManageGenerateSubGroupTable from "../../components/NotAvailable/GeneratSubGroupTable";
//import { useForm } from "react-hook-form";
import SearchIcon from "@material-ui/icons/Search";
import { TableSearchInput } from "../../components/Common/TableViewComponents/TableSearchInput";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: "80%",
    textAlign: "center",
  },
}));

const NotAvailableScreen: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const { data: lecturer = [] } = useGetLecturers();
  const { data: groups = [] } = useGenerateGroupId();
  const { data: subgroups = [] } = useGenerateSubGroupId();
  const [addDialog, setAddDialog] = useState(false);
  // const { register, handleSubmit } = useForm();
  // const displayToast = useToast();

  // const handleAddDialogOpen = () => {
  //   setAddDialog(true);
  // };

  const handleAddDialogClose = () => {
    setAddDialog(false);
  };

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <h4 className="title">Allocate Not Available Time</h4>
      <div className="row mb-3">
        <hr
          style={{
            width: 1000,
            borderWidth: 10,
            marginLeft: 60,
            marginTop: 30,
          }}
        />
      </div>

      {status === "loading" && <LinearProgress />}

      <div className={classes.root} style={{ marginTop: 50, marginLeft: 90 }}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Lecturers" {...a11yProps(0)} />
            <Tab label="Sessions" {...a11yProps(1)} />
            <Tab label="Groups" {...a11yProps(2)} />
            <Tab label="Sub-Groups" {...a11yProps(3)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <Container
            className="top-container"
            style={{
              borderStyle: "solid",
              borderColor: "#BABABA",
              borderRadius: "30px",
              width: "95%",
              height: 400,
              borderWidth: 1.5,
              marginLeft: "30px",
              marginTop: 30,
            }}
          >
            <div className="row mb-3">
              <div>
                <h5 style={{ textAlign: "center", marginTop: 15 }}>
                  Lecturers Details
                </h5>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <SearchIcon className="search-icon" />{" "}
                <TableSearchInput onUpdate={setSearchText} />
              </div>
            </div>
            <Card>
              <Toolbar style={{ paddingLeft: 0 }}>
                <div className="container">
                  <ManageLecturersTable
                    lecturers={lecturer}
                    searchVal={searchText}
                  />
                </div>
              </Toolbar>
            </Card>
          </Container>
        </TabPanel>

        <TabPanel value={value} index={1}>
          23
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Container
            className="top-container"
            style={{
              borderStyle: "solid",
              borderColor: "#BABABA",
              borderRadius: "30px",
              width: "95%",
              height: 400,
              borderWidth: 1.5,
              marginLeft: "30px",
              marginTop: 30,
            }}
          >
            <div className="row mb-3">
              <div>
                <h5 style={{ textAlign: "center", marginTop: 15 }}>
                  Group Details
                </h5>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <SearchIcon className="search-icon" />{" "}
                <TableSearchInput onUpdate={setSearchText} />
              </div>
            </div>
            <Card>
              <Toolbar style={{ paddingLeft: 0 }}>
                <div className="container">
                  <ManageGenerateGroupTable generategroup={groups} />
                </div>
              </Toolbar>
            </Card>
          </Container>
        </TabPanel>

        <TabPanel value={value} index={3}>
          <Container
            className="top-container"
            style={{
              borderStyle: "solid",
              borderColor: "#BABABA",
              borderRadius: "30px",
              width: "95%",
              height: 400,
              borderWidth: 1.5,
              marginLeft: "30px",
              marginTop: 30,
            }}
          >
            <div className="row mb-3">
              <div>
                <h5 style={{ textAlign: "center", marginTop: 15 }}>
                  Sub-Group Details
                </h5>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <SearchIcon className="search-icon" />{" "}
                <TableSearchInput onUpdate={setSearchText} />
              </div>
            </div>
            <Card>
              <Toolbar style={{ paddingLeft: 0 }}>
                <div className="container">
                  <ManageGenerateSubGroupTable generatesubgroup={subgroups} />
                </div>
              </Toolbar>
            </Card>
          </Container>
        </TabPanel>
      </div>

      <Dialog
        open={addDialog}
        onClose={handleAddDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Lecturer"}</DialogTitle>

        <DialogContent>
          {/* <form onSubmit={handleSubmit(onSubmit)}>
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

            <div className="mt-3">
              <button className="btn btn-primary" type="submit">
                Save
              </button>{" "}
              <button className="btn btn-danger" onClick={handleAddDialogClose}>
                Cancel
              </button>
            </div>
          </form> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotAvailableScreen;
