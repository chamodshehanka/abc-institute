import * as React from "react";
import {
  Avatar,
  Grid,
  withStyles,
  Theme,
  createStyles,
  Badge,
  makeStyles,
} from "@material-ui/core";

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "$ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: "",
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  })
)(Badge);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(0),
      },
    },
  })
);

const AvatarSection: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <div className="container mt-4">
        <Grid container spacing={1}>
          <Grid item xs={1}></Grid>
          <Grid item xs={2}>
            <div className={classes.root}>
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <Avatar
                  alt="Chamod Perera"
                  src="https://avatars1.githubusercontent.com/u/19349315?s=460&u=0c5e235d9529fccdbfb37a31ed69655a6cd8dbb0&v=4"
                />
              </StyledBadge>
            </div>
          </Grid>
          <Grid item xs={8}>
            <span style={{ color: "whitesmoke", fontSize: "1rem" }}>
              Chamod Perera
            </span>{" "}
            <br />
            <span style={{ color: "whitesmoke", fontSize: "0.7rem" }}>
              Admin
            </span>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AvatarSection;
