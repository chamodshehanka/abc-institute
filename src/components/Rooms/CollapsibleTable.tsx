import React from "react";
import { Buildings } from "../../models/Buildings";
import {
  makeStyles,
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Table,
  TableBody,
} from "@material-ui/core";
import { Rooms } from "../../models/Rooms";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import AddRoom from "../../components/Rooms/AddRoom";
import EditRoom from "../../components/Rooms/EditRoom";
import DeleteRoom from "../../components/Rooms/DeleteRoom";
import UpdateBuildingForm from "../../components/Buildings/UpdateBuildingForm";
import DeleteBuildingForm from "../../components/Buildings/DeleteBuildingForm";

export interface CollapsibleTableProps {
  building: Buildings;
  rooms: Rooms[];
}

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const CollapsibleTable: React.SFC<CollapsibleTableProps> = ({
  building,
  rooms,
}: CollapsibleTableProps) => {
  const [open, setOpen] = React.useState(false);

  const classes = useRowStyles();

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {building?.name}
        </TableCell>
        <TableCell>
          <UpdateBuildingForm
            buildingName={building.name}
            buildingID={building._id}
          />
        </TableCell>
        <TableCell>
          <DeleteBuildingForm
            buildingName={building.name}
            buildingID={building._id}
          />
        </TableCell>
        <TableCell style={{ width: 200 }} align="right">
          <AddRoom buildingName={building.name} />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
              ></Typography>

              <Table size="small" aria-label="purchases">
                <TableBody>
                  {rooms?.map((r: Rooms) => (
                    <TableRow>
                      <TableCell>{r?.name}</TableCell>
                      <TableCell>
                        <EditRoom
                          buildingName={building.name}
                          roomName={r.name}
                          roomID={r._id}
                        />
                      </TableCell>
                      <TableCell>
                        <DeleteRoom _id={r._id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CollapsibleTable;
