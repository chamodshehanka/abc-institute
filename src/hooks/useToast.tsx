import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { SharedProps, useSnackbar } from "notistack";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5),
    },
  })
);

export function useToast() {
  const toasts = useSnackbar();
  const classes = useStyles();
  return function displayMsg(
    msg: string,
    variant: SharedProps["variant"] = "default"
  ) {
    toasts.enqueueSnackbar(msg, {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
      autoHideDuration: 5000,
      variant,
      action: (key: string) => (
        <>
          <IconButton
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={() => toasts.closeSnackbar(key)}
          >
            <CloseIcon />
          </IconButton>
        </>
      ),
    });
  };
}
