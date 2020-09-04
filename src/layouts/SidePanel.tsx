import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { MemoryRouter } from "react-router";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  useHistory,
  Route,
} from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import TableChartIcon from "@material-ui/icons/TableChart";
import DateRangeIcon from "@material-ui/icons/DateRange";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, "to">>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

const useStyles = makeStyles({
  root: {
    width: 290,
  },
});

const SidePanel: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <MemoryRouter initialEntries={["/manage-working-days"]} initialIndex={0}>
        <div className={classes.root}>
          <Route>{({ location }) => history.push(location.pathname)}</Route>
          <Paper elevation={0}>
            <Typography variant="h6" style={{ textAlign: "center" }}>
              ABC Institute
            </Typography>
            <List aria-label="main mailbox folders">
              <ListItemLink to="/home" primary="Home" icon={<HomeIcon />} />
              <ListItemLink
                to="/manage-lecturers"
                primary="Lecturers"
                icon={<SupervisorAccountIcon />}
              />
              <ListItemLink
                to="/student-home-screen"
                primary="Students"
                icon={<LocalLibraryIcon />}
              />
              <ListItemLink
                to="/tags-screen"
                primary="Tags"
                icon={<LocalOfferIcon />}
              />
              <ListItemLink
                to="/manage-lecturers"
                primary="Locations"
                icon={<LocationCityIcon />}
              />
              <ListItemLink
                to="/manage-lecturers"
                primary="Sessions"
                icon={<WatchLaterIcon />}
              />
              <ListItemLink
                to="/manage-working-days"
                primary="Working Days"
                icon={<DateRangeIcon />}
              />
              <ListItemLink
                to="/manage-timetables"
                primary="Timetables"
                icon={<TableChartIcon />}
              />
            </List>
            {/* <Divider />
            <List aria-label="secondary mailbox folders">
              <ListItemLink to="/trash" primary="Trash" />
              <ListItemLink to="/spam" primary="Spam" />
            </List> */}
          </Paper>
        </div>
      </MemoryRouter>
    </>
  );
};

export default SidePanel;
