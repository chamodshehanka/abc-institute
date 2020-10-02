import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { deletePSession } from "../../api/sessions/parallelSessions.request";
import { useHistory } from "react-router-dom";
import { PSession } from "../../models/parallelSession";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },

  tablerow: {
    fontWeight: "bolder",
    fontSize: 15,
    color: "black",
  },
});

export interface ManagePsessiontblProps {
  psession: PSession[];
}

const ManagePsessiontbl: React.SFC<ManagePsessiontblProps> = ({
  psession,
}: ManagePsessiontblProps) => {
  const classes = useStyles();
  const history = useHistory();

  const handleDeleteAction = (e) => {
    deletePSession(e)
      .then((res) => {
        console.log(res);
        history.push("student-year-screen");
        history.push("SessionManage-screen");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tablerow}>Session Id</TableCell>
              <TableCell className={classes.tablerow} align="right">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {psession.map((w: PSession) => (
              <TableRow key={w._id}>
                <TableCell component="th" scope="row">
                  {w.psessions.map((l) => l + ",")}
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">
                  {" "}
                  <Button onClick={() => handleDeleteAction(w._id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ManagePsessiontbl;
