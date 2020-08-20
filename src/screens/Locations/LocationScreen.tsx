import React from "react";
//import { useState } from "react";
//import ManageBuilding from "../../components/Buildings/ManageBuilding";

//import ManageLocations from "../../components/Rooms/ManageLocations";
import Container from "@material-ui/core/Container";
//import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
//import { useGetBuildings } from "../../queries/useGetBuildings";

import AddBuildingForm from "../../components/Buildings/AddBuildingForm";

// import AddRoom from "../../components/Rooms/AddRoom";
// import EditRoom from "../../components/Rooms/EditRoom";
// import DeleteRoom from "../../components/Rooms/DeleteRoom";

const LocationsScreen: React.SFC = () => {
  // const { data = [], status } = useGetBuildings();

  return (
    <div>
      <React.Fragment>
        <Container
          style={{
            backgroundColor: "#DEE9FF",
            height: "800px",
          }}
        >
          <div>
            <Container fixed>
              <br />
              <h3 style={{ textAlign: "center" }}>Locations</h3>
              <br />
              <Typography
                component="div"
                style={{
                  backgroundColor: "white",
                  height: 680,
                  borderRadius: 30,
                }}
              >
                <br />
                <Container
                  style={{
                    borderStyle: "solid",
                    borderColor: "black",
                    borderRadius: "30px",
                    width: "95%",
                    height: "300px",
                    marginLeft: "30px",
                  }}
                >
                  <h4 style={{ marginTop: 10, paddingLeft: 30 }}>
                    Manage Buildings <AddBuildingForm />
                  </h4>

                  {/* <ManageBuilding  buildings = {data} /> */}
                </Container>
                <br />
                <Container
                  style={{
                    borderStyle: "solid",
                    borderColor: "black",
                    borderRadius: "30px",
                    width: "95%",
                    height: "300px",
                    marginLeft: "30px",
                  }}
                >
                  <h4 style={{ marginTop: 10, paddingLeft: 30 }}>
                    Manage Locations
                  </h4>

                  {/* <ManageLocations /> */}
                </Container>
              </Typography>
            </Container>
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default LocationsScreen;
