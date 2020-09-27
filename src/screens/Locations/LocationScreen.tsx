import React from "react";
//import ManageBuilding from "../../components/Buildings/ManageBuilding";
import ManageRooms from "../../components/Rooms/ManageRooms";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useGetBuildings } from "../../queries/useGetBuildings";
import AddBuildingForm from "../../components/Buildings/AddBuildingForm";

const LocationsScreen: React.SFC = () => {
  const { data = [] } = useGetBuildings();

  return (
    <>
      <h3 style={{ textAlign: "center" }}>Locations</h3>
      <div
        style={{
          paddingLeft: "40px",
          paddingRight: "40px",
          paddingTop: "5px",
        }}
      >
        <Typography
          component="div"
          style={{
            backgroundColor: "white",
            height: 680,
            borderRadius: 10,
          }}
        >
          <br />
          <Container
            style={{
              borderStyle: "solid",
              borderColor: "black",
              borderRadius: "5px",
              width: "95%",
              height: "630px",
              marginLeft: "25px",
              marginRight: "100px",
            }}
          >
            <h4 style={{ marginTop: 10, paddingLeft: 30 }}>
              Manage Locations <AddBuildingForm />
            </h4>
            <br />

            <ManageRooms buildings={data} />
          </Container>
        </Typography>
      </div>
    </>
  );
};

export default LocationsScreen;
