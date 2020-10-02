import React from "react";
import { Timeslot } from "../../models/Timeslot";
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

  async function makeLecturerTable() {
    return (
      <tbody>
        <tr>
          <td>08:30</td>
          <td>
            {getTimeslotByTimeAndDate("08:30", "Monday")?._id !== undefined
              ? getTimeslotByTimeAndDate("08:30", "Monday")?._id[0]
              : "X"}
            gggg
          </td>
          <td></td>
        </tr>

        <tr>
          <td>09:30</td>
        </tr>

        <tr>
          <td>10:30</td>
        </tr>

        <tr>
          <td>11:30</td>
        </tr>

        <tr>
          <td>12:30</td>
        </tr>

        <tr>
          <td>13:30</td>
        </tr>

        <tr>
          <td>14:30</td>
        </tr>

        <tr>
          <td>15:30</td>
        </tr>
      </tbody>
    );
  }

  function generateContent() {
    switch (props.type) {
      case "Lecturer":
        makeLecturerTable();
        break;
      case "Group":
        break;
      case "Room":
        break;
      default:
      //  return tempData();
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
        </thead>

        {generateContent()}
      </table>
    </>
  );
};

export default TimetableView;
