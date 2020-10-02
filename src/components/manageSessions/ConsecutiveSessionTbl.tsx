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
import { deleteCSession } from "../../api/sessions/consecutiveSessions.request";
import { useHistory } from "react-router-dom";
import { CSession } from "../../models/consecutiveSessions";

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

export interface ManageContblProps {
  csession: CSession[];
}

const ManageCsessiontbl: React.SFC<ManageContblProps> = ({
  csession,
}: ManageContblProps) => {
  const classes = useStyles();
  const history = useHistory();

  const handleDeleteAction = (e) => {
    deleteCSession(e)
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
            {csession.map((w: CSession) => (
              <TableRow key={w._id}>
                <TableCell component="th" scope="row">
                  {w.csessions.map((l) => l + ",")}
                </TableCell>
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

export default ManageCsessiontbl;
