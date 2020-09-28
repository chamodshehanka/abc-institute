import React from "react";
import { GenerateSubGroupId } from "../../models/GenerateSubGroupId";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { deleteGenerateSubGroupId } from "../../api/student/GenerateSubGroupId.request";
import { useHistory } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles({
  table: {
    width: 600,
    borderTopWidth: 0.1,
    borderColor: "#cccccc",
    borderStyle: "solid",
  },

  tablerow: {
    fontWeight: "bolder",
    fontSize: 15,
    color: "black",
  },
});

export interface ManageGenerateSubGroupProps {
  generatesubgroup: GenerateSubGroupId[];
}

const ManageGenerateSubGroupTable: React.SFC<ManageGenerateSubGroupProps> = ({
  generatesubgroup,
}: ManageGenerateSubGroupProps) => {
  const classes = useStyles();
  const history = useHistory();

  const handleDeleteAction = (e) => {
    deleteGenerateSubGroupId(e)
      .then((res) => {
        console.log(res);
        history.push("student-home-screen");
        history.push("subgroup-screen");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <TableContainer className="table-container expandable-table-container">
        <Table
          size="small"
          stickyHeader
          aria-label="sticky table"
          className="table-first-cell-padded"
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.tablerow}>
                Generated Sub Group Id
              </TableCell>
              <TableCell className={classes.tablerow} align="right">
                Allocate
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {generatesubgroup.map((w: GenerateSubGroupId) => (
              <TableRow key={w._id}>
                <TableCell component="th" scope="row">
                  {w.groupId}
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <Button onClick={() => handleDeleteAction(w._id)}>
                    <AddCircleIcon />
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

export default ManageGenerateSubGroupTable;
