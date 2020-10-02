import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useGetSessions } from "../../queries/useGetSessions";
import { withStyles } from "@material-ui/core/styles";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      borderStyle: "solid",
      borderColor: "#e4e3e3",
      borderRadius: "5px",
      borderWidth: "1px",
      height: "100%",
    },
    containerRight: {
      borderStyle: "solid",
      borderColor: "#e4e3e3",
      borderRadius: "5px",
      borderWidth: "1px",
      height: "100%",
    },
    divStyle: {
      width: "570px",
      height: "560px",
    },
  })
);

const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 12,
    padding: "5px 10px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#2A4BA5",
    borderColor: "#2A4BA5",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#0075FF",
      borderColor: "#0075FF",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0075FF",
      borderColor: "#0075FF",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
})(Button);

export default function RoomsForSession() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const sessions = useGetSessions().data;
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <BootstrapButton
        size="small"
        onClick={handleClickOpen}
        style={{ color: "white" }}
      >
        <h5
          style={{
            color: "white",
            float: "right",
            fontSize: "20",
            backgroundColor: "0075FF",
          }}
        />
        Add Room
      </BootstrapButton>

      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle
          id="max-width-dialog-title"
          style={{ textAlign: "center" }}
        >
          Rooms For Session
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={6}>
              <div className={classes.divStyle}>
                <Container className={classes.container}>
                  <h5 style={{ fontFamily: "Roboto", marginTop: "10px" }}>
                    Sessions
                  </h5>

                  <TableContainer className={classes.container}>
                    <Table aria-label="collapsible table">
                      <TableHead>
                        <TableRow>
                          <TableCell />
                          <TableCell>Lecturer</TableCell>
                          <TableCell style={{ width: 100 }} align="right">
                            Subject
                          </TableCell>
                          <TableCell style={{ width: 100 }} align="right">
                            GroupID
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sessions?.map((s) => (
                          <TableRow>
                            <TableCell>"Hello"{s.lecturers}</TableCell>
                            <TableCell>{s.subject}</TableCell>
                            <TableCell>{s.studentGroup}</TableCell>
                            <TableCell>Add Room</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Container>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.divStyle}>
                <Container className={classes.containerRight}>
                  <h5 style={{ fontFamily: "Roboto", marginTop: "10px" }}>
                    Consecutive Sessions
                  </h5>
                </Container>
              </div>
            </Grid>
          </Grid>

          <DialogActions></DialogActions>
          <DialogActions>
            <Button type="submit" color="primary">
              Save
            </Button>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
