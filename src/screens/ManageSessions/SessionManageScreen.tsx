import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useGetSessions } from "../../queries/useGetSessions";
import ParallelSession from "../../components/manageSessions/ParallelSession";
import OverlapSession from "../../components/manageSessions/OverlapSession";
import ConsecutiveSession from "../../components/manageSessions/ConsecutiveSession";

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

const SessionManageScreen: React.SFC = () => {
  const [value, setValue] = React.useState(0);

  const { data = [] } = useGetSessions();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  console.log("data session", data.length);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <h3 style={{ textAlign: "center" }}>Manage Sessions</h3>
        <hr style={{ width: 1000, borderWidth: 10, marginLeft: 60 }} />

        <div style={{ marginTop: 60 }}>
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
              <Tab label="Parallel Session" {...a11yProps(0)} />
              <Tab label="Consecutive Session" {...a11yProps(1)} />
              <Tab label="Overlap Session" {...a11yProps(2)} />
            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0}>
            <ParallelSession psession={data} />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <ConsecutiveSession csession={data} />
          </TabPanel>

          <TabPanel value={value} index={2}>
            <OverlapSession osession={data} />
          </TabPanel>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default SessionManageScreen;
