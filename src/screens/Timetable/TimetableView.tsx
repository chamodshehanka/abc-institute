import React from "react";
import { Timeslot } from "../../models/Timeslot";
import { TimetableCell } from "../../models/TimetableCell";
import { useGetSessions } from "../../queries/useGetSessions";
import { useGetTimeslots } from "../../queries/useGetTimeslots";
import TimetableRow from "../../components/Timetable/TimetableRow";
import { Rooms } from "../../models/Rooms";
import { Session } from "../../models/Session";
import { RoomTimetableCell } from "../../models/RoomTimetableCell";
import TimetableRoomRow from "../../components/Timetable/TimetableRoomRow";

export interface TimetableViewProps {
  timeslotData: Timeslot[];
  type: string;
  selectedData: string;
}

const TimetableView: React.FC<TimetableViewProps> = (props) => {
  const { data: sessionData = [] } = useGetSessions();
  const { data: timeslotData = [] } = useGetTimeslots();

  function getSessionById(id: string) {
    return sessionData.find((s) => id === s._id);
  }

  function getTimeslotsByLecturerName(lecturerName: string) {
    const filteredTimeslots: Timeslot[] = [];

    timeslotData.forEach((t) => {
      if (getSessionById(t?.session)?.lecturers.includes(lecturerName))
        filteredTimeslots.push(t);
    });

    return filteredTimeslots;
  }

  function getTimeslotsByStudentGroup(studentGroup: string) {
    const filteredTimeslots: Timeslot[] = [];

    timeslotData.forEach((t) => {
      if (getSessionById(t?.session)?.studentGroup === studentGroup)
        filteredTimeslots.push(t);
    });

    return filteredTimeslots;
  }

  function loadLecturerTable() {
    const lecturerTimeslots: Timeslot[] = getTimeslotsByLecturerName(
      props?.selectedData
    );

    const timetableData830: TimetableCell[] = [];
    const timetableData930: TimetableCell[] = [];
    const timetableData1030: TimetableCell[] = [];
    const timetableData1130: TimetableCell[] = [];
    const timetableData1230: TimetableCell[] = [];
    const timetableData1330: TimetableCell[] = [];
    const timetableData1430: TimetableCell[] = [];
    const timetableData1530: TimetableCell[] = [];
    const timetableData1630: TimetableCell[] = [];
    const timetableData1730: TimetableCell[] = [];

    lecturerTimeslots.forEach((t) => {
      const session: Session = getSessionById(t.session) as Session;
      const room: Rooms = session.rooms[0];

      //  Without condtions
      const ttData: TimetableCell | null = {
        id: t._id,
        day: t.day,
        subject: session?.subject as string,
        subjectCode: session?.subjectCode as string,
        room: room?.name || "N/A",
        startTime: t.startTime,
        endTime: t.endTime,
        studentGroup: session?.studentGroup || "N/A",
      };

      switch (t.startTime) {
        case "08:30":
          timetableData830.push(ttData);
          break;
        case "09:30":
          timetableData930.push(ttData);
          break;
        case "10:30":
          timetableData1030.push(ttData);
          break;
        case "11:30":
          timetableData1130.push(ttData);
          break;
        case "12:30":
          timetableData1230.push(ttData);
          break;
        case "13:30":
          timetableData1330.push(ttData);
          break;
        case "14:30":
          timetableData1430.push(ttData);
          break;
        case "15:30":
          timetableData1530.push(ttData);
          break;
        case "16:30":
          timetableData1630.push(ttData);
          break;
        case "17:30":
          timetableData1730.push(ttData);
          break;
      }
    });

    return (
      <tbody>
        <TimetableRow data={timetableData830} startTime={"08:30"} />
        <TimetableRow data={timetableData930} startTime={"09:30"} />
        <TimetableRow data={timetableData1030} startTime={"10:30"} />
        <TimetableRow data={timetableData1130} startTime={"11:30"} />
        <TimetableRow data={timetableData1230} startTime={"12:30"} />
        <TimetableRow data={timetableData1330} startTime={"13:30"} />
        <TimetableRow data={timetableData1430} startTime={"14:30"} />
        <TimetableRow data={timetableData1530} startTime={"15:30"} />
        <TimetableRow data={timetableData1630} startTime={"16:30"} />
        <TimetableRow data={timetableData1730} startTime={"17:30"} />
      </tbody>
    );
  }

  function loadGroupTable() {
    return <></>;
  }

  function loadRoomTable() {
    const lecturerTimeslots: Timeslot[] = getTimeslotsByStudentGroup(
      props?.selectedData
    );

    const timetableData830: RoomTimetableCell[] = [];
    const timetableData930: RoomTimetableCell[] = [];
    const timetableData1030: RoomTimetableCell[] = [];
    const timetableData1130: RoomTimetableCell[] = [];
    const timetableData1230: RoomTimetableCell[] = [];
    const timetableData1330: RoomTimetableCell[] = [];
    const timetableData1430: RoomTimetableCell[] = [];
    const timetableData1530: RoomTimetableCell[] = [];
    const timetableData1630: RoomTimetableCell[] = [];
    const timetableData1730: RoomTimetableCell[] = [];

    lecturerTimeslots.forEach((t) => {
      const session: Session = getSessionById(t.session) as Session;
      const room: Rooms = session.rooms[0];

      const ttData: RoomTimetableCell | null = {
        id: t._id,
        day: t.day,
        subject: session.subject as string,
        subjectCode: session?.subjectCode as string,
        room: room?.name || "N/A",
        startTime: t.startTime,
        endTime: t.endTime,
        lecturer: session.lecturers[0],
      };

      switch (t.startTime) {
        case "08:30":
          timetableData830.push(ttData);
          break;
        case "09:30":
          timetableData930.push(ttData);
          break;
        case "10:30":
          timetableData1030.push(ttData);
          break;
        case "11:30":
          timetableData1130.push(ttData);
          break;
        case "12:30":
          timetableData1230.push(ttData);
          break;
        case "13:30":
          timetableData1330.push(ttData);
          break;
        case "14:30":
          timetableData1430.push(ttData);
          break;
        case "15:30":
          timetableData1530.push(ttData);
          break;
        case "16:30":
          timetableData1630.push(ttData);
          break;
        case "17:30":
          timetableData1730.push(ttData);
          break;
      }
    });

    return (
      <tbody>
        <TimetableRoomRow data={timetableData830} startTime={"08:30"} />
        <TimetableRoomRow data={timetableData930} startTime={"09:30"} />
        <TimetableRoomRow data={timetableData1030} startTime={"10:30"} />
        <TimetableRoomRow data={timetableData1130} startTime={"11:30"} />
        <TimetableRoomRow data={timetableData1230} startTime={"12:30"} />
        <TimetableRoomRow data={timetableData1330} startTime={"13:30"} />
        <TimetableRoomRow data={timetableData1430} startTime={"14:30"} />
        <TimetableRoomRow data={timetableData1530} startTime={"15:30"} />
        <TimetableRoomRow data={timetableData1630} startTime={"16:30"} />
        <TimetableRoomRow data={timetableData1730} startTime={"17:30"} />
      </tbody>
    );
  }

  function generateContent() {
    switch (props.type) {
      case "Lecturer":
        return loadLecturerTable();
      case "Group":
        return loadGroupTable();
      case "Room":
        return loadRoomTable();
      default:
    }
  }

  return (
    <>
      <table className="table table-striped">
        <thead>
          <td></td>
          <td>Monday</td>
          <td>Tuesday</td>
          <td>Wednesday</td>
          <td>Thursday</td>
          <td>Friday</td>
          <td>Saturday</td>
          <td>Sunday</td>
        </thead>

        {generateContent()}
      </table>
    </>
  );
};

export default TimetableView;
