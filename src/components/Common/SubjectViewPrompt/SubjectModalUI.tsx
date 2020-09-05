import {
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { SubjectViewPromptInfo } from "./SubjectViewPrompt";
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

interface SubjectViewModalUIProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  info: SubjectViewPromptInfo;
}

export function SubjectViewModalUI({
  isOpen,
  onClose,
  onConfirm,
  info: { textToMatch, resourceType, textType },
}: SubjectViewModalUIProps) {
  const [input, setInput] = useState("");

  return (
    <Dialog
      maxWidth="sm"
      TransitionComponent={Transition}
      className="dialog delete-dialog"
      open={isOpen}
      onClose={onClose}
    >
      <div className="dialog-head">
        <Typography variant="h5">Confirm Delete</Typography>
      </div>

      <DialogContent className="dialog-content">
        <div className="detail">
          <p>
            Are you sure you want to delete {resourceType} <b>{textToMatch}</b>?
          </p>

          <Alert severity="warning">
            <small>
              This action will be irreversible and all related details will be
              lost. Please type in the {resourceType} {textType} below to
              confirm.
            </small>
          </Alert>
        </div>

        <br />

        <div className="form-field">
          <TextField
            variant="outlined"
            fullWidth
            label={`Enter ${resourceType} ${textType} to confirm`}
            value={input}
            onChange={(e: React.SyntheticEvent) =>
              setInput((e.target as HTMLInputElement).value)
            }
          />
        </div>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <button className="btn" onClick={onClose}>
          Cancel
        </button>
        <button
          className="btn btn-danger"
          onClick={onConfirm}
          disabled={textToMatch !== input}
        >
          Delete
        </button>
      </DialogActions>
    </Dialog>
  );
}
