import React from "react";
import { Timeslot } from "../../models/Timeslot";
import { TimetableCell } from "../../models/TimetableCell";
import { useGetSessions } from "../../queries/useGetSessions";
import { useGetTimeslots } from "../../queries/useGetTimeslots";

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

  function getTimeslotByTimeAndDate(startTime: string, day: string) {
    console.log(
      "Result",
      timeslotData?.find((t) => startTime === t?.startTime && day === t?.day)
    );
    return timeslotData?.find(
      (t) => startTime === t?.startTime && day === t?.day
    );
  }

  getSessionById("");

  // function generateContent() {
  //   switch (props.type) {
  //     case "Lecturer":
  //       break;
  //     case "Group":
  //       break;
  //     case "Room":
  //       break;
  //     default:
  //   }
  // }

  function loadLecturerTable() {
    const timePeriods: string[] = [
      "08:30",
      "09:30",
      "10:30",
      "11:30",
      "12:30",
      "13:30",
      "14:30",
      "15:30",
      "16:30",
    ];

    const lecturerTimeslots: Timeslot[] = getTimeslotsByLecturerName(
      props?.selectedData
    );

    // TODO: Remove this later
    // console.log("Lectures Timeslots : ", lecturerTimeslots);

    let timetableData: TimetableCell[] = [];

    lecturerTimeslots.forEach((t) => {
      //  Without condtions
      const ttData: TimetableCell = {
        id: "1",
        day: t.day,
        subject: getSessionById(t.session)?.subject as string,
        subjectCode: getSessionById(t.session)?.subjectCode as string,
        room: getSessionById(t.session)?.rooms[0] || "N/A",
        startTime: t.startTime,
        endTime: t.endTime,
        studentGroup: getSessionById(t.session)?.studentGroup || "N/A",
      };

      timetableData.push(ttData);
    });

    console.log("TT DATA : ", timetableData);

    return (
      <>
        {timetableData?.map((t) => (
          <tbody>
            <tr>
              <td>
                {timePeriods.map((p) => (
                  <b>{p}</b>
                ))}
              </td>
              <td>{t?.day === "Monday" && t?.subject}</td>
              <td>{t?.day === "Tuesday" && t?.subject}</td>
              <td>{t?.day === "Wednesday" && t?.subject}</td>
              <td>{t?.day === "Thursday" && t?.subject}</td>
              <td>{t?.day === "Friday" && t?.subject}</td>
              <td>{t?.day === "Saturday" && t?.subject}</td>
              <td>{t?.day === "Sunday" && t?.subject}</td>
            </tr>
          </tbody>
        ))}
      </>
    );
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

        {loadLecturerTable()}
      </table>
    </>
  );
};

export default TimetableView;
