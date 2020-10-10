import {
  Card,
  Container,
  Grid,
  InputLabel,
  LinearProgress,
  makeStyles,
  MenuItem,
  Select,
  Toolbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useGenerateGroupId } from "../../queries/useGenerateGroupId";
import React, { useState } from "react";
import { useGetWorkingDays } from "../../queries/useGetWorkingDays";
import { generateTimetable } from "../../api/timetable/timetable.request";
import { TimetableGenerateData } from "../../api/interfaces";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import GeneratedViewModal from "../../components/Timetable/GeneratedViewModal/GeneratedViewModal";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const GenerateTimetableScreen: React.FC = () => {
  const [workingDate, setWorkingDate] = useState("");
  const [group, setGroup] = useState("");
  const [viewTimetable, setViewTimetable] = useState(false);
  const history = useHistory();

  const { data: wdData = [], status: wdStatus } = useGetWorkingDays();
  const { data: gData = [], status: gStatus } = useGenerateGroupId();

  const noData = wdStatus === "success" && wdData?.length === 0;
  const hasData = wdStatus === "success" && wdData?.length !== 0;

  const handleWDChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setWorkingDate(event.target.value as string);
  };

  const handleGroupChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log(viewTimetable);
    setGroup(event.target.value as string);
  };

  const [openView, setOpenView] = React.useState(false);

  const handleViewClose = () => {
    setOpenView(false);
  };

  const handleViewOpen = () => {
    setOpenView(true);
  };

  const [viewSpinner, setViewSpinner] = useState(false);
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
        setViewSpinner(false);
        handleViewOpen();

        history.push("/manage-timetables");
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const generateTimetableAction = async () => {
    const requestData: TimetableGenerateData = {
      workingDay: workingDate,
      groups: [group],
    };
    const isGenerated = await generateTimetable(requestData);
    if (isGenerated) {
      setViewTimetable(true);
    }
  };

  return (
    <>
      <h4 className="title mb-4">Generate Timetable</h4>

      <Grid container>
        <Grid item xs={12}>
          <div className="container mb-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                history.push("/manage-timetables");
              }}
            >
              Back <ArrowBackIcon />
            </button>
          </div>
        </Grid>
      </Grid>

      <Container className="top-container">
        <Card>
          <Toolbar style={{ paddingLeft: 0 }}>
            <div className="container">
              {(wdStatus === "error" || gStatus === "error") && (
                <Alert severity="error">
                  Error loading Working Days Data/ Rooms
                </Alert>
              )}
              {noData && (
                <Alert severity="info">
                  You have not created any timetables.
                </Alert>
              )}
              {hasData && (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <InputLabel id="demo-simple-select-label">
                        Select Working Day
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={workingDate}
                        placeholder="Select Working Day"
                        label="Select Working Day"
                        onChange={handleWDChange}
                        style={{ minWidth: 180 }}
                      >
                        {wdData?.map((wd) => (
                          <MenuItem value={wd?._id} key={wd?._id}>
                            {wd?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>

                    <Grid item xs={4}>
                      <InputLabel id="demo-simple-select-label">
                        Select Student Group
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={group}
                        placeholder="Select Working Day"
                        label="Select Working Day"
                        onChange={handleGroupChange}
                        style={{ minWidth: 180 }}
                      >
                        {gData?.map((g) => (
                          <MenuItem value={g._id} key={g?._id}>
                            {g?.groupId}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>

                    <Grid item xs={4}>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          generateTimetableAction();

                          setProgress(0);
                          setBuffer(10);
                          setViewSpinner(true);
                        }}
                      >
                        Generate
                      </button>
                    </Grid>
                  </Grid>
                </>
              )}
            </div>
          </Toolbar>
        </Card>
      </Container>

      <div className="container">
        <br />
        {viewSpinner && (
          <div className={classes.root}>
            <LinearProgress
              variant="buffer"
              value={progress}
              valueBuffer={buffer}
            />
          </div>
        )}
      </div>

      <GeneratedViewModal isOpen={openView} onClose={handleViewClose} />
    </>
  );
};

export default GenerateTimetableScreen;
