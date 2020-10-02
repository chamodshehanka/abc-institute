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
import { useNotAvailable } from "../../queries/useNotAvailable";
import ManageLecturersTable from "../../components/NotAvailable/LecturersDetailsTable";
import ManageGenerateGroupTable from "../../components/NotAvailable/GeneratGroupTable";
import ManageGenerateSubGroupTable from "../../components/NotAvailable/GeneratSubGroupTable";
import ManageNotAvailabletbl from "../../components/NotAvailable/notAvailabletable";
import SearchIcon from "@material-ui/icons/Search";
import { TableSearchInput } from "../../components/Common/TableViewComponents/TableSearchInput";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import VisibilityIcon from "@material-ui/icons/Visibility";

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
  const { data: notavl = [] } = useNotAvailable();
  const [addDialog, setAddDialog] = useState(false);
  // const { register, handleSubmit } = useForm();
  // const displayToast = useToast();

  const handleAddDialogOpen = () => {
    setAddDialog(true);
  };

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
        <div className="row mb-3">
          <div className="col-8"></div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button className="btn btn-primary" onClick={handleAddDialogOpen}>
              View <VisibilityIcon />
            </button>
          </div>
        </div>
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
            <Tab label="Groups" {...a11yProps(1)} />
            <Tab label="Sub-Groups" {...a11yProps(2)} />
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
                  <ManageGenerateGroupTable
                    generategroup={groups}
                    searchVal={searchText}
                  />
                </div>
              </Toolbar>
            </Card>
          </Container>
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
                  <ManageGenerateSubGroupTable
                    generatesubgroup={subgroups}
                    searchVal={searchText}
                  />
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
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">
          {"Not Available Time"}
        </DialogTitle>

        <DialogContent>
          <ManageNotAvailabletbl notabl={notavl} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotAvailableScreen;
