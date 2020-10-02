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
import AvatarSection from "../components/Common/Sidebar/AvatarSection/AvatarSection";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import BookIcon from "@material-ui/icons/LibraryBooks";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import AssessmentIcon from "@material-ui/icons/Assessment";

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      React.forwardRef<any, Omit<RouterLinkProps, "to">>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink} style={{ color: "whitesmoke" }}>
        {icon ? (
          <ListItemIcon style={{ color: "whitesmoke" }}>{icon}</ListItemIcon>
        ) : null}
        <ListItemText
          primary={primary}
          style={{ fontFamily: "Varela Round" }}
        />
      </ListItem>
    </li>
  );
}

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#0065ff",
    height: "100vh",
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
          <Paper elevation={0} className={classes.root}>
            <br />
            <Typography
              variant="h6"
              style={{
                textAlign: "center",
                fontFamily: "Varela Round",
                fontWeight: "bold",
                fontSize: "1.6rem",
              }}
              className="logo-text-light"
            >
              ABC Institute
            </Typography>

            <AvatarSection />

            <div className="" style={{ height: "4rem" }}></div>

            <List aria-label="main mailbox folders">
              <ListItemLink to="/home" primary="Home" icon={<HomeIcon />} />
              <ListItemLink
                to="/manage-lecturers"
                primary="Lecturers"
                icon={<SupervisorAccountIcon />}
              />
              <ListItemLink
                to="/manage-subjects"
                primary="Subjects"
                icon={<BookIcon />}
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
                to="/locations-screen"
                primary="Locations"
                icon={<LocationCityIcon />}
              />
              <ListItemLink
                to="/manage-sessions"
                primary="Sessions"
                icon={<WatchLaterIcon />}
              />

              <ListItemLink
                to="/SessionManage-screen"
                primary="Manage Sessions"
                icon={<AssessmentIcon />}
              />

              <ListItemLink
                to="/not-available-screen"
                primary="Not Available"
                icon={<NotificationsOffIcon />}
              />
              <ListItemLink
                to="/manage-working-days"
                primary="Working Days"
                icon={<DateRangeIcon />}
              />
              <ListItemLink
                to="/generate-timetable"
                primary="Timetables"
                icon={<TableChartIcon />}
              />
              <ListItemLink
                to="/statistic-screen"
                primary="Statistics"
                icon={<EqualizerIcon />}
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
