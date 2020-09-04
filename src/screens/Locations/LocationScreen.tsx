import React from "react";
import ManageBuilding from "../../components/Buildings/ManageBuilding";
import ManageRooms from "../../components/Rooms/ManageRooms";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useGetBuildings } from "../../queries/useGetBuildings";
import AddBuildingForm from "../../components/Buildings/AddBuildingForm";

// import AddRoom from "../../components/Rooms/AddRoom";
// import EditRoom from "../../components/Rooms/EditRoom";
// import DeleteRoom from "../../components/Rooms/DeleteRoom";

const LocationsScreen: React.SFC = () => {
  const { data = [] } = useGetBuildings();

  return (
    <>
      <h3 style={{ textAlign: "center" }}>Locations</h3>
      <div
        style={{
          paddingLeft: "40px",
          paddingRight: "40px",
          paddingTop: "10px",
        }}
      >
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

            <ManageBuilding buildings={data} />
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
            <h4 style={{ marginTop: 10, paddingLeft: 30 }}>Manage Locations</h4>

            <ManageRooms buildings={data} />
          </Container>
        </Typography>
      </div>
    </>
  );
};

export default LocationsScreen;
