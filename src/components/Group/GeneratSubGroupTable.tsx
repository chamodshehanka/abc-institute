import React from "react";
import { GenerateSubGroupId } from "../../models/GenerateSubGroupId";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useFilterRows } from "../Common/TableViewComponents/useFilterData";
import { TableFooterPagination } from "../Common/TableViewComponents/TableFooterPagination";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { deleteGenerateSubGroupId } from "../../api/student/GenerateSubGroupId.request";
import { useHistory } from "react-router-dom";

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
  searchVal: string;
}

function filterData(tableData: GenerateSubGroupId[], searchText = "") {
  if (searchText === "") return tableData;
  return tableData.filter(
    (dataObj) =>
      dataObj._id &&
      dataObj.groupId.toLowerCase().startsWith(searchText)
  );
}

const ManageGenerateSubGroupTable: React.SFC<ManageGenerateSubGroupProps> = ({
  generatesubgroup,
  searchVal,
}: ManageGenerateSubGroupProps) => {

  const { pageData, tableFooterProps, noMatchingItems } = useFilterRows(
    searchVal,
    generatesubgroup,
    filterData
  );

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
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tablerow}>
                Generated Sub Group Id
              </TableCell>
              <TableCell className={classes.tablerow} align="right">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageData.map((w: GenerateSubGroupId) => (
              <TableRow key={w._id}>
                <TableCell component="th" scope="row">
                  {w.groupId}
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
      {noMatchingItems && (
        <Alert severity="info">No Matching Subject Found</Alert>
      )}
      <TableFooterPagination {...tableFooterProps} />
    </>
  );
};

export default ManageGenerateSubGroupTable;
