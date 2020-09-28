import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    height: "230px",
  },
});

const StudentsTable = () => {
  const classes = useStyles();
  return (
    <div>
      <>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Paper>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      align="center"
                    >
                      Year And Semester
                    </Typography>
                    <br />
                    <Typography variant="h1" align="center" component="h2">
                      8
                    </Typography>
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography
                      color="textSecondary"
                      align="center"
                      gutterBottom
                    >
                      Programmes
                    </Typography>
                    <br />

                    <Typography variant="h1" align="center" component="h2">
                      4
                    </Typography>
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography
                      align="center"
                      color="textSecondary"
                      gutterBottom
                    >
                      Groups
                    </Typography>
                    <br />

                    <Typography align="center" variant="h1" component="h2">
                      4
                    </Typography>
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography
                      align="center"
                      color="textSecondary"
                      gutterBottom
                    >
                      Sub-Groups
                    </Typography>
                    <br />

                    <Typography align="center" variant="h1" component="h2">
                      4
                    </Typography>
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </>
    </div>
  );
};

export default StudentsTable;
