import React from "react";
import { Doughnut } from "react-chartjs-2";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { malabe } from "../../components/Rooms/Dataset";
import StudentsTable from "../../components/Rooms/StudentsTable";
import SubjectsTable from "../../components/Rooms/SubjectsTable";

const StatisticScreen: React.SFC = () => {
  return (
    <div>
      <>
        <div>
          <Container>
            <h3 style={{ textAlign: "center" }}>Dashboard</h3>

            <Typography
              component="div"
              style={{
                backgroundColor: "white",
                height: 700,
                borderRadius: 30,
              }}
            >
              <br />

              <Container
                style={{
                  width: "95%",
                  height: "300px",
                  marginLeft: "30px",
                }}
              >
                <div style={{ flexGrow: 1 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <h4 style={{ marginTop: 10, paddingLeft: 30 }}>
                        Lecturers
                      </h4>
                      <Container
                        style={{
                          borderWidth: "0.25px",
                          width: "100%",
                          height: "280px",
                          borderStyle: "solid",
                          borderColor: "#e4e3e3",
                          borderRadius: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "240px",
                          }}
                        >
                          <Doughnut
                            data={malabe}
                            height={180}
                            width={200}
                            options={{ maintainAspectRatio: false }}
                          />
                          <Typography align="center">
                            Faculty Distribution
                          </Typography>
                        </div>
                      </Container>
                    </Grid>

                    <Grid item xs={6}>
                      <h4 style={{ marginTop: 10 }}>Students</h4>
                      <Container
                        style={{
                          borderWidth: "0.25px",
                          width: "100%",
                          height: "280px",
                          borderStyle: "solid",
                          borderColor: "#e4e3e3",
                          borderRadius: "10px",
                        }}
                      >
                        <br />
                        <StudentsTable />
                      </Container>
                    </Grid>
                  </Grid>
                </div>
              </Container>
              <br />
              <br />
              <h4 style={{ marginTop: 10, paddingLeft: 30 }}>Subjects</h4>
              <Container
                style={{
                  borderStyle: "solid",
                  borderColor: "#e4e3e3",
                  borderRadius: "10px",
                  width: "95%",
                  height: "280px",
                  marginLeft: "30px",
                  borderWidth: "0.25px",
                }}
              >
                <br />
                <SubjectsTable />
              </Container>
            </Typography>
          </Container>
        </div>
      </>
    </div>
  );
};

export default StatisticScreen;
