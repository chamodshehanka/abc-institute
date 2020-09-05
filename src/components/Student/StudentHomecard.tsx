import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SchoolIcon from "@material-ui/icons/School";
import GroupIcon from "@material-ui/icons/Group";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";


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
      <Paper elevation={3} className={classes.card1}>
        <h3 className={classes.text}>Acedemic Year & Semester</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Button
            onClick={() => {
              history.push("student-year-screen");
            }}
          >
            <DateRangeIcon htmlColor="#f5f5f5" style={{ fontSize: 50 }} />
          </Button>
        </div>
      </Paper>


      <Paper elevation={3} className={classes.card2}>
        <h3 className={classes.text}>Programme</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginTop: 40,
          }}
        >
          <Button
            onClick={() => {
              history.push("programme-screen");
            }}
          >
            <SchoolIcon htmlColor="#f5f5f5" style={{ fontSize: 50 }} />
          </Button>
        </div>
      </Paper>


      <Paper elevation={3} className={classes.card3}>
        <h3 className={classes.text}>Student Group</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginTop: 40,
          }}
        >
          <button
            onClick={() => {
              history.push("group-screen");
            }}
          >
            <GroupIcon htmlColor="#f5f5f5" style={{ fontSize: 50 }} />
          </button>
        </div>
      </Paper>
    </div>
  );
}
