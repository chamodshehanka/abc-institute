import React from "react";
import { WorkingDays } from "../../../models/WorkingDays";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
// eslint-disable-next-line import/no-unresolved
import { TransitionProps } from "@material-ui/core/transitions";
import Chip from "@material-ui/core/Chip";

const Transition = React.forwardRef(function Transition(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export interface WorkingDaysViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  workingDays: WorkingDays;
}

const WorkingDaysViewModal: React.SFC<WorkingDaysViewModalProps> = ({
  isOpen,
  onClose,
  workingDays,
}: WorkingDaysViewModalProps) => {
  return (
    <Dialog
      maxWidth="sm"
      TransitionComponent={Transition}
      className="dialog delete-dialog"
      open={isOpen}
      onClose={onClose}
    >
      <div className="dialog-head">
        <Typography variant="h5">{workingDays?.name + " Overview"}</Typography>
      </div>

      <DialogContent className="dialog-content">
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{workingDays?.name}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Working Hours</TableCell>
              <TableCell>
                {workingDays?.workingHours?.hours +
                  " hours " +
                  workingDays?.workingHours?.mins +
                  " mins"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Selected Working Days</TableCell>
              <TableCell>
                {workingDays?.selectedDays?.monday && (
                  <Chip label="Monday" variant="outlined" size="small" />
                )}{" "}
                {workingDays?.selectedDays?.tuesday && (
                  <Chip label="Tuesday" variant="outlined" size="small" />
                )}{" "}
                {workingDays?.selectedDays?.wednesday && (
                  <Chip label="Wednesday" variant="outlined" size="small" />
                )}{" "}
                {workingDays?.selectedDays?.thursday && (
                  <Chip label="Thursday" variant="outlined" size="small" />
                )}{" "}
                {workingDays?.selectedDays?.friday && (
                  <Chip label="Friday" variant="outlined" size="small" />
                )}{" "}
                {workingDays?.selectedDays?.saturday && (
                  <Chip label="Saturday" variant="outlined" size="small" />
                )}{" "}
                {workingDays?.selectedDays?.sunday && (
                  <Chip label="Sunday" variant="outlined" size="small" />
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Preferred Time Slots</TableCell>
              <TableCell>
                {workingDays?.prefferedTimeSlots?.thirty && "30"}{" "}
                {workingDays?.prefferedTimeSlots?.sixty && "60"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>

      <DialogActions className="dialog-actions">
        <button className="btn btn-primary" onClick={onClose}>
          Close
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkingDaysViewModal;
