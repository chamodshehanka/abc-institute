import {
  Card,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useGenerateGroupId } from "../../queries/useGenerateGroupId";
import React, { useState } from "react";
import { useGetWorkingDays } from "../../queries/useGetWorkingDays";

const GenerateTimetableScreen: React.FC = () => {
  const [workingDate, setWorkingDate] = useState("");
  const [group, setGroup] = useState("");

  const { data: wdData = [], status: wdStatus } = useGetWorkingDays();
  const { data: gData = [], status: gStatus } = useGenerateGroupId();

  const noData = wdStatus === "success" && wdData?.length === 0;
  const hasData = wdStatus === "success" && wdData?.length !== 0;

  const handleWDChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setWorkingDate(event.target.value as string);
  };

  const handleGroupChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGroup(event.target.value as string);
  };

  return (
    <>
      <h4 className="title mb-4">Generate Timetable</h4>

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
                      <button className="btn btn-primary">Generate</button>
                    </Grid>
                  </Grid>
                </>
              )}
            </div>
          </Toolbar>
        </Card>
      </Container>
    </>
  );
};

export default GenerateTimetableScreen;
