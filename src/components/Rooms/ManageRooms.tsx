import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Buildings } from "../../models/Buildings";
import CollapsibleTable from "./CollapsibleTable";
import { useGetRooms } from "../../queries/useGetRooms";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    height: "550px",
  },
});

export interface ManageRoomsProps {
  buildings: Buildings[];
}

const ManageRooms: React.SFC<ManageRoomsProps> = ({
  buildings,
}: ManageRoomsProps) => {
  const classes = useStyles();
  const { data = [] } = useGetRooms();

  return (
    <TableContainer className={classes.container}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Building Name</TableCell>
            <TableCell style={{ width: 100 }} align="right">
              Edit
            </TableCell>
            <TableCell style={{ width: 100 }} align="right">
              Delete
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {buildings?.map((b) => (
            // replace with a funtion like below
            // rooms={getRoomsByBuildingID(b?._id)}
            <CollapsibleTable building={b} rooms={data} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManageRooms;
