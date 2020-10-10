import React from "react";
import { RoomTimetableCell } from "../../models/RoomTimetableCell";

export interface TimetableRoomRowProps {
  data: RoomTimetableCell[];
  startTime: string;
}

const TimetableRoomRow: React.FC<TimetableRoomRowProps> = (props) => {
  function loadStyledCell(t: RoomTimetableCell) {
    return (
      <>
        {t.subjectCode}
        {" - "}
        {t.subject}
        <br />
        <span className="badge rounded-pill bg-primary">{t.lecturer}</span>
        <br />
        <span className="badge rounded-pill bg-secondary">
          {" "}
          {t?.studentGroup}
        </span>
      </>
    );
  }

  return (
    <tr>
      {props.data.length === 0 ? (
        <td>{props.startTime}</td>
      ) : (
        <>
          <td>{props.startTime}</td>
          {props.data.map((t) => (
            <>
              {t?.day === "Monday" && <td>{loadStyledCell(t)}</td>}
              {t?.day === "Tuesday" && <td>{loadStyledCell(t)}</td>}
              {t?.day === "Wednesday" && <td>{loadStyledCell(t)}</td>}
              {t?.day === "Thursday" && <td>{loadStyledCell(t)}</td>}
              {t?.day === "Friday" && <td>{loadStyledCell(t)}</td>}
              {t?.day === "Saturday" && <td>{loadStyledCell(t)}</td>}
              {t?.day === "Sunday" && <td>{loadStyledCell(t)}</td>}
            </>
          ))}
        </>
      )}
    </tr>
  );
};

export default TimetableRoomRow;
