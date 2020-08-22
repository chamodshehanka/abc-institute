import React from "react";
import { WorkingDays } from "../../models/WorkingDays";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Chip,
  Menu,
  MenuItem,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { deleteWorkingDays } from "../../api/working-days/working.days.request";
import Alert from "@material-ui/lab/Alert";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DateRangeIcon from "@material-ui/icons/DateRange";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import "./WorkingDaysTable.css";
import { useFilterRows } from "../Common/TableViewComponents/useFilterData";
import { TableFooterPagination } from "../Common/TableViewComponents/TableFooterPagination";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useDeletePrompt } from "../Common/DeletePrompt/DeletePrompt";
import { useMutation } from "react-query";
import { useToast } from "../../hooks/useToast";

export interface ManageWorkingDaysTableProps {
  workingDays: WorkingDays[];
  searchVal: string;
}

interface SelectedDays {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

function filterData(tableData: WorkingDays[], searchText = "") {
  if (searchText === "") return tableData;
  return tableData.filter(
    (dataObj) =>
      dataObj.name && dataObj.name.toLowerCase().startsWith(searchText)
  );
}

const ManageWorkingDaysTable: React.SFC<ManageWorkingDaysTableProps> = ({
  workingDays,
  searchVal,
}: ManageWorkingDaysTableProps) => {
  const { pageData, tableFooterProps, noMatchingItems } = useFilterRows(
    searchVal,
    workingDays,
    filterData
  );

  const getNoOfWorkingDays = (selectedDays: SelectedDays) => {
    let dayCount = 0;

    if (selectedDays.monday) dayCount++;
    if (selectedDays.tuesday) dayCount++;
    if (selectedDays.wednesday) dayCount++;
    if (selectedDays.thursday) dayCount++;
    if (selectedDays.friday) dayCount++;
    if (selectedDays.saturday) dayCount++;
    if (selectedDays.sunday) dayCount++;

    return dayCount;
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
              <TableCell style={{ fontFamily: "Varela Round" }}>Name</TableCell>
              <TableCell style={{ fontFamily: "Varela Round" }}>
                No of Wokring Days
              </TableCell>
              <TableCell style={{ fontFamily: "Varela Round" }}>
                No of Working Hours
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageData?.map((w: WorkingDays) => (
              <TableRow key={w._id} hover={true}>
                <TableCell>{w.name}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    color="primary"
                    label={
                      <span>
                        {getNoOfWorkingDays(w?.selectedDays)} days{" "}
                        <DateRangeIcon />
                      </span>
                    }
                    style={{ backgroundColor: "#0065ff" }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    color="secondary"
                    label={
                      <span>
                        {w?.workingHours?.hours +
                          " hours " +
                          w?.workingHours?.mins +
                          " mins "}

                        <WatchLaterIcon />
                      </span>
                    }
                    style={{ backgroundColor: "#00AD28" }}
                  />
                </TableCell>
                <TableCell style={{ width: "5rem" }}>
                  <div className="display-flex align-center justify-end">
                    <WorkingDaysAction workingDays={w} />
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

export default ManageWorkingDaysTable;

export interface WorkingDaysActionProps {
  workingDays: WorkingDays;
}

const WorkingDaysAction: React.FC<WorkingDaysActionProps> = (props) => {
  const displayToast = useToast();
  const confirmDelete = useDeletePrompt({
    resourceType: "working days",
    textType: "name",
    textToMatch: props.workingDays.name,
  });

  const [remove, { status: removeStatus }] = useMutation(deleteWorkingDays, {
    onError() {
      console.log("errrrrrrrr");
      displayToast(
        `Working Days ${props.workingDays.name} remove failed` || "Hi ",
        "default"
      );
    },
    onSuccess() {
      console.log("Elaaaaa");
      displayToast(
        `Working Days ${props.workingDays.name}  removed`,
        "default"
      );
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
              <MenuItem
                onClick={() => {
                  popupState.close();
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
                    .then(() => remove(props.workingDays._id))
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
