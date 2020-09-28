import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SchoolIcon from "@material-ui/icons/School";
import GroupIcon from "@material-ui/icons/Group";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(3),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },

    alignItems: "center",
    justifyContent: "center",
  },

  card1: {
    backgroundColor: "#F5C000",
    width: 280,
    height: 160,
  },
  card2: {
    backgroundColor: "#0489D6",
    width: 280,
    height: 160,
  },
  card3: {
    backgroundColor: "#00AD28",
    width: 280,
    height: 160,
  },
  card4: {
    backgroundColor: "#FF6241",
    width: 280,
    height: 160,
  },
  card5: {
    backgroundColor: "#41B9FF",
    width: 280,
    height: 160,
  },
  text: {
    fontSize: 28,
    color: "white",
    padding: 10,
  },
}));

export default function StudentHomecard() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Paper
        elevation={3}
        className={classes.card1}
        onClick={() => {
          history.push("student-year-screen");
        }}
      >
        <h3 className={classes.text}>Acedemic Year & Semester</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginRight: 10,
          }}
        >
          <DateRangeIcon htmlColor="#f5f5f5" style={{ fontSize: 50 }} />
        </div>
      </Paper>

      <Paper
        elevation={3}
        className={classes.card2}
        onClick={() => {
          history.push("programme-screen");
        }}
      >

        <h3 className={classes.text}>Programme</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginTop: 40,
            marginRight: 10,
          }}
        >
          <SchoolIcon htmlColor="#f5f5f5" style={{ fontSize: 50 }} />
        </div>
      </Paper>

      <Paper
        elevation={3}
        className={classes.card3}
        onClick={() => {
          history.push("group-screen");
        }}
      >
        <h3 className={classes.text}>Student Groups</h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginTop: 40,
            marginRight: 10,
          }}
        >
          <GroupIcon htmlColor="#f5f5f5" style={{ fontSize: 50 }} />
        </div>
      </Paper>

      <Paper
        elevation={3}
        className={classes.card4}
        onClick={() => {
          history.push("subgroup-screen");
        }}
      >
        <h3 className={classes.text}>Student Sub Groups</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginTop: 3,
            marginRight: 10,
          }}
        >
          <GroupAddIcon htmlColor="#f5f5f5" style={{ fontSize: 50 }} />
        </div>
      </Paper>

      <Paper
        elevation={3}
        className={classes.card5}
        onClick={() => {
          history.push("group-screen");
        }}
      >
        <h3 className={classes.text}>View Details</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginTop: 38,
            marginRight: 10,
          }}
        >
          <EqualizerIcon htmlColor="#f5f5f5" style={{ fontSize: 50 }} />
        </div>
      </Paper>
    </div>
  );
}
