import {
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
// eslint-disable-next-line import/no-unresolved
import { TransitionProps } from "@material-ui/core/transitions";
import React from "react";
import { Timetable } from "../../../models/Timetable";

const Transition = React.forwardRef(function Transition(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export interface TimetableViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  timetable: Timetable;
}

const TimetableViewModal: React.FC<TimetableViewModalProps> = ({
  isOpen,
  onClose,
  timetable,
}: TimetableViewModalProps) => {
  return (
    <Dialog
      maxWidth="sm"
      TransitionComponent={Transition}
      className="dialog delete-dialog"
      open={isOpen}
      onClose={onClose}
    >
      <div className="dialog-head">
        <Typography variant="h5">{timetable?.name + " Overview"}</Typography>
      </div>

      <DialogContent className="dialog-content">
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{timetable?.name}</TableCell>
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

export default TimetableViewModal;
