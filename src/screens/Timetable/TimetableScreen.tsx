import React, { useState } from "react";
import { Container, Card, Toolbar } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useHistory } from "react-router-dom";
import { useGetLecturers } from "../../queries/useGetLecturers";
import { useGenerateGroupId } from "../../queries/useGenerateGroupId";
import { useGetRooms } from "../../queries/useGetRooms";
import TimetableView from "./TimetableView";

const TimetableScreen: React.FC = () => {
  const [viewBy, setViewBy] = useState("");
  const [selectedLecturer, setSelectedLecturer] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedRoom, setselectedRoom] = useState("");
  const [viewTimetable, setViewTimetable] = useState(false);
  const history = useHistory();

  const { data: lecturersData = [] } = useGetLecturers();
  const { data: groupData = [] } = useGenerateGroupId();
  const { data: roomsData = [] } = useGetRooms();

  const handleViewChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setViewBy(event.target.value as string);
    setSelectedLecturer("");
    setSelectedGroup("");
    setselectedRoom("");
  };

  const handleLecturerChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedLecturer(event.target.value as string);
  };

  const handleGroupChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedGroup(event.target.value as string);
  };

  const handleRoomChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setselectedRoom(event.target.value as string);
  };

  function getSelectedData() {
    let value = "";
    if (selectedLecturer !== "") {
      value = selectedLecturer;
    } else if (selectedGroup !== "") {
      value = selectedGroup;
    } else if (selectedRoom !== "") {
      value = selectedRoom;
    }

    return value;
  }

  return (
    <>
      <h4 className="title mb-4">Manage Timetables</h4>

      <div className="row mb-3">
        <div className="col-1"></div>
        <div className="col-11">
          <button
            className="btn btn-primary"
            onClick={() => {
              history.push("/generate-timetable");
            }}
          >
            Generate <AddCircleIcon />
          </button>
        </div>
      </div>

      <Container className="top-container">
        <Card>
          <Toolbar style={{ paddingLeft: 0 }}>
            <div className="container">
              <div className="row">
                <div className="col">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={viewBy}
                    onChange={handleViewChange}
                  >
                    <option selected>View By</option>
                    <option value="Lecturer">Lecturer</option>
                    <option value="Group">Group</option>
                    <option value="Room">Room</option>
                  </select>
                </div>

                <div className="col">
                  {viewBy === "Lecturer" && (
                    <>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={selectedLecturer}
                        onChange={handleLecturerChange}
                      >
                        <option selected>Select Lecturer</option>
                        {lecturersData?.map((l) => (
                          <option value={l?.name}> {l?.name}</option>
                        ))}
                      </select>
                    </>
                  )}

                  {viewBy === "Group" && (
                    <>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={selectedGroup}
                        onChange={handleGroupChange}
                      >
                        <option selected>Select Group</option>
                        {groupData?.map((g) => (
                          <option value={g?.groupId}>{g?.groupId}</option>
                        ))}
                      </select>
                    </>
                  )}

                  {viewBy === "Room" && (
                    <>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={selectedRoom}
                        onChange={handleRoomChange}
                      >
                        <option selected>Select Room</option>
                        {roomsData?.map((r) => (
                          <option value={r?.name}>{r?.name}</option>
                        ))}
                      </select>
                    </>
                  )}
                </div>

                <div className="col">
                  {viewBy !== "" && (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setViewTimetable(true);
                      }}
                    >
                      View
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Toolbar>
        </Card>

        {viewBy !== "" &&
          viewTimetable &&
          (selectedGroup !== "" ||
            selectedLecturer !== "" ||
            selectedRoom !== "") && (
            <Card>
              <TimetableView
                timeslotData={[]}
                type={viewBy}
                selectedData={getSelectedData()}
              />
            </Card>
          )}

        <div className="container">
          {viewTimetable && (
            <>
              <button className="btn btn-primary">Download</button>{" "}
              <button className="btn btn-primary">Print</button>
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default TimetableScreen;
