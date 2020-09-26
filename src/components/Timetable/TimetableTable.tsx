import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import { Timetable } from "../../models/Timetable";
import { useFilterRows } from "../Common/TableViewComponents/useFilterData";
import { Alert } from "@material-ui/lab";
import { TableFooterPagination } from "../Common/TableViewComponents/TableFooterPagination";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import GetAppIcon from "@material-ui/icons/GetApp";
import PrintIcon from "@material-ui/icons/Print";
import { useToast } from "../../hooks/useToast";
import { useDeletePrompt } from "../Common/DeletePrompt/DeletePrompt";
import { useMutation } from "react-query";
import { deleteTimetable } from "../../api/timetable/timetable.request";

export interface TimetableTableProps {
  timetables: Timetable[];
  searchVal: string;
}

function filterData(tableData: Timetable[], searchText = "") {
  if (searchText === "") return tableData;
  return tableData.filter(
    (dataObj) =>
      dataObj.name && dataObj.name.toLowerCase().startsWith(searchText)
  );
}

const TimetableTable: React.FC<TimetableTableProps> = ({
  timetables,
  searchVal,
}: TimetableTableProps) => {
  const { pageData, tableFooterProps, noMatchingItems } = useFilterRows(
    searchVal,
    timetables,
    filterData
  );
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
              <TableCell style={{ fontFamily: "Varela Round" }}>Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pageData?.map((t: Timetable) => (
              <TableRow key={t._id}>
                <TableCell>{t.name}</TableCell>

                <TableCell style={{ width: "5rem" }}>
                  <div className="display-flex align-center justify-end">
                    <TimetableAction timetable={t} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {noMatchingItems && (
        <Alert severity="info">No matching Working Days</Alert>
      )}
      <TableFooterPagination {...tableFooterProps} />
    </>
  );
};

export default TimetableTable;

export interface TimetableActionProps {
  timetable: Timetable;
}

const TimetableAction: React.FC<TimetableActionProps> = (props) => {
  const displayToast = useToast();
  // const history = useHistory();

  const confirmDelete = useDeletePrompt({
    resourceType: "timetable",
    textType: "name",
    textToMatch: props.timetable.name,
  });

  const [remove, { status: removeStatus }] = useMutation(deleteTimetable, {
    onError() {
      displayToast(
        `Timetable ${props.timetable.name} remove failed`,
        "default"
      );
    },
    onSuccess() {
      displayToast(`Working Days ${props.timetable.name}  removed`, "default");
    },
  });

  const showMenuButton = removeStatus === "error" || removeStatus === "idle";

  return (
    <>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <>
            {removeStatus === "loading" && <CircularProgress size={25} />}
            {showMenuButton && (
              <IconButton {...bindTrigger(popupState)}>
                <MoreVertIcon />
              </IconButton>
            )}

            <Menu {...bindMenu(popupState)}>
              <MenuItem style={{ color: "green" }}>
                <VisibilityIcon style={{ color: "green" }} /> View
              </MenuItem>
              <MenuItem style={{ color: "blue" }}>
                <GetAppIcon /> Download
              </MenuItem>

              <MenuItem style={{ color: "purple" }}>
                <PrintIcon /> Print
              </MenuItem>

              <MenuItem
                onClick={() => {
                  popupState.close();
                  console.log("props", props.timetable);
                }}
                style={{ color: "orange" }}
              >
                <EditIcon style={{ color: "orange" }} />
                Edit
              </MenuItem>
              <MenuItem
                style={{ color: "red" }}
                onClick={() => {
                  popupState.close();
                  confirmDelete()
                    .then(() => remove(props.timetable._id))
                    .catch((err) => {
                      console.error(err);
                    });
                }}
              >
                <DeleteIcon style={{ color: "red" }} />
                Delete
              </MenuItem>
            </Menu>
          </>
        )}
      </PopupState>
    </>
  );
};
