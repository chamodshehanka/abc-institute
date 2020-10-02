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
import { generateTimetable } from "../../api/timetable/timetable.request";
import { TimetableGenerateData } from "../../api/interfaces";
// import { Page, Text, View, Document, PDFViewer } from "@react-pdf/renderer";

const GenerateTimetableScreen: React.FC = () => {
  const [workingDate, setWorkingDate] = useState("");
  const [group, setGroup] = useState("");
  const [viewTimetable, setViewTimetable] = useState(false);

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

  // Create Document Component
  //   const MyDocument = () => (
  //     <Document>
  //       <Page size="A4" style={{ flexDirection: "row", width: "100%" }}>
  //         <View style={{ margin: 10, padding: 10, flexGrow: 1 }}>
  //           <Text>Section #1</Text>

  //           {timeslotData.map((t) => t?.session)}
  //         </View>
  //         <View>
  //           <Text>Section #2</Text>
  //         </View>
  //       </Page>
  //     </Document>
  //   );

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
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          generateTimetableAction();
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
    </>
  );
};

export default GenerateTimetableScreen;
