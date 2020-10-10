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
    width: "130%",
    height: "100px",
  },
  // container: {
  //   height: "30px",
  // },
});

const StudentsTable = () => {
  const classes = useStyles();
  return (
    <div>
      <>
        <div>
          <Grid container>
            <Grid item xs={6}>
              <Grid
                item
                xs={6}
                style={{ marginTop: "-15px", marginLeft: "20px" }}
              >
                <Typography color="textSecondary" gutterBottom align="center">
                  Year & Sem
                </Typography>
                <Paper className={classes.root}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography variant="h2" align="center" component="h2">
                        8
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </Paper>
              </Grid>
              <Grid item xs={6} style={{ marginLeft: "20px" }}>
                <Typography color="textSecondary" align="center" gutterBottom>
                  Programmes
                </Typography>
                <Paper className={classes.root}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography variant="h2" align="center" component="h2">
                        4
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </Paper>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid
                item
                xs={6}
                style={{ marginTop: "-15px", marginLeft: "20px" }}
              >
                <Typography align="center" color="textSecondary" gutterBottom>
                  Groups
                </Typography>
                <Paper className={classes.root}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography align="center" variant="h2" component="h2">
                        4
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </Paper>
              </Grid>
              <Grid item xs={6} style={{ marginLeft: "20px" }}>
                <Typography align="center" color="textSecondary" gutterBottom>
                  Sub-Groups
                </Typography>
                <Paper className={classes.root}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography align="center" variant="h2" component="h2">
                        4
                      </Typography>
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </>
    </div>
  );
};

export default StudentsTable;
