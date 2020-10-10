import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  Typography,
} from "@material-ui/core";
// eslint-disable-next-line import/no-unresolved
import { TransitionProps } from "@material-ui/core/transitions";
import { Alert } from "@material-ui/lab";

const Transition = React.forwardRef(function Transition(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export interface GeneratedViewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GeneratedViewModal: React.FC<GeneratedViewModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog
      maxWidth="sm"
      TransitionComponent={Transition}
      className="dialog delete-dialog"
      open={isOpen}
      onClose={onClose}
    >
      <div className="dialog-head">
        <Typography variant="h5">{"Timetable Generation"}</Typography>
      </div>

      <DialogContent className="dialog-content">
        <Alert severity="success">Timetable Generated Successfully!</Alert>
      </DialogContent>

      <DialogActions className="dialog-actions">
        <button className="btn btn-primary" onClick={onClose}>
          Close
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default GeneratedViewModal;
