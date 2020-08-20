import React from "react";
import Divider from "@material-ui/core/Divider";
import { Doughnut } from "react-chartjs-2";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {
  malabe,
  metro,
  kurunegala,
  kandy,
  matara,
  jaffna,
} from "../../components/Rooms/Dataset";

import StudentsTable from "../../components/Rooms/StudentsTable";
import SubjectsTable from "../../components/Rooms/SubjectsTable";

const StatisticScreen: React.SFC = () => {
  return (
    <div>
      <React.Fragment>
        <Container
          style={{
            backgroundColor: "#DEE9FF",
            height: "1250px",
          }}
        >
          <div>
            <Container fixed>
              <br />
              <h3 style={{ textAlign: "center" }}>Dashboard</h3>
              <br />
              <Typography
                component="div"
                style={{
                  backgroundColor: "white",
                  height: 1140,
                  borderRadius: 30,
                }}
              >
                <br />
                <h4 style={{ marginTop: 10, paddingLeft: 30 }}>Lecturers</h4>
                <Divider variant="middle" style={{ color: "black" }} />
                <Container
                  style={{
                    width: "95%",
                    height: "300px",
                    marginLeft: "30px",
                  }}
                >
                  <div style={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={2}>
                        <div>
                          <Doughnut
                            data={malabe}
                            height={180}
                            width={250}
                            options={{ maintainAspectRatio: false }}
                          />
                          <Typography align="center">Malabe</Typography>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div>
                          <Doughnut
                            data={metro}
                            height={180}
                            width={250}
                            options={{ maintainAspectRatio: false }}
                          />
                          <Typography align="center">Metro</Typography>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div>
                          <Doughnut
                            data={kurunegala}
                            height={180}
                            width={250}
                            options={{ maintainAspectRatio: false }}
                          />
                          <Typography align="center">Kurunegala</Typography>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div>
                          <Doughnut
                            data={kandy}
                            height={180}
                            width={250}
                            options={{ maintainAspectRatio: false }}
                          />
                          <Typography align="center">Kandy</Typography>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div>
                          <Doughnut
                            data={matara}
                            height={180}
                            width={250}
                            options={{ maintainAspectRatio: false }}
                          />
                          <Typography align="center">Matara</Typography>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div>
                          <Doughnut
                            data={jaffna}
                            height={180}
                            width={250}
                            options={{ maintainAspectRatio: false }}
                          />
                          <Typography align="center">Jaffna</Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </Container>
                <br />
                <h4 style={{ marginTop: 10, paddingLeft: 30 }}>Students</h4>
                <Container
                  style={{
                    borderStyle: "solid",
                    borderColor: "black",
                    borderRadius: "10px",
                    width: "95%",
                    height: "280px",
                    marginLeft: "30px",
                    borderWidth: "thin",
                  }}
                >
                  <br />
                  <StudentsTable />
                </Container>
                <br />
                <h4 style={{ marginTop: 10, paddingLeft: 30 }}>Subjects</h4>
                <Container
                  style={{
                    borderStyle: "solid",
                    borderColor: "black",
                    borderRadius: "10px",
                    width: "95%",
                    height: "300px",
                    marginLeft: "30px",
                    borderWidth: "thin",
                  }}
                >
                  <br />
                  <SubjectsTable />
                </Container>
              </Typography>
            </Container>
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default StatisticScreen;
