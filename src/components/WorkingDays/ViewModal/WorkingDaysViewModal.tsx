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
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>

      <DialogActions className="dialog-actions">
        <button className="btn" onClick={onClose}>
          Cancel
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkingDaysViewModal;
