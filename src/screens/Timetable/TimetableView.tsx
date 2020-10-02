import React from "react";
import { Timeslot } from "../../models/Timeslot";
import { useGetSessions } from "../../queries/useGetSessions";
import { useGetTimeslots } from "../../queries/useGetTimeslots";

export interface TimetableViewProps {
  timeslotData: Timeslot[];
  type: string;
  selectedData: string;
}

const TimetableView: React.FC<TimetableViewProps> = () => {
  const { data: sessionData = [] } = useGetSessions();
  const { data: timeslotData = [] } = useGetTimeslots();

  function getSessionById(id: string) {
    return sessionData.find((s) => id === s._id);
  }

  getSessionById("");

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

        <tbody>
          <tr>
            <td>08:30</td>
            <td>
              <p>
                IT1010 ITP <br /> Y1.S2.IT.01
                <br />
                Location : 501 A
              </p>
            </td>
            <td>
              <p>
                IT1010 ITP <br /> Y1.S2.IT.01
                <br />
                Location : 501 A
              </p>
            </td>
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
      </table>
    </>
  );
};

export default TimetableView;
