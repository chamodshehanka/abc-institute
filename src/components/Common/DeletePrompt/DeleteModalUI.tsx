import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { DeletePromptInfo } from "./DeletePrompt";
// eslint-disable-next-line import/no-unresolved
import { TransitionProps } from "@material-ui/core/transitions";

const Transition = React.forwardRef(function Transition(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface DeleteModalUIProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  info: DeletePromptInfo;
}

export function DeleteModalUI({
  isOpen,
  onClose,
  onConfirm,
  info: { textToMatch, resourceType, textType },
}: DeleteModalUIProps) {
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
        <Typography variant="h4">Confirm Delete</Typography>
      </div>

      <DialogContent className="dialog-content">
        <div className="detail">
          <Typography variant="h5" gutterBottom>
            Are you sure you want to delete {resourceType} <b>{textToMatch}</b>?
          </Typography>

          <Typography variant="h5" gutterBottom>
            <small>
              This action will be irreversible and all related details will be
              lost. Please type in the {resourceType} {textType} below to
              confirm.
            </small>
          </Typography>
        </div>

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
        <Button variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onConfirm}
          disabled={textToMatch !== input}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
