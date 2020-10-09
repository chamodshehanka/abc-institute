import React from "react";
import { TimetableCell } from "../../models/TimetableCell";

export interface TimetableRowProps {
  data: TimetableCell[];
  startTime: string;
}

const TimetableRow: React.FC<TimetableRowProps> = (props) => {
  function loadStyledCell(t: TimetableCell) {
    return (
      <>
        {t.subjectCode}
        {" - "}
        {t.subject}
        <br />
        <span className="badge rounded-pill bg-primary">{t.studentGroup}</span>
        <br />
        <span className="badge rounded-pill bg-secondary"> {t?.room}</span>
      </>
    );
  }

  return (
    <tr>
      {props.data.length === 0 ? (
        <td>{props.startTime}</td>
      ) : (
        props.data.map((t) => (
          <>
            <td>{props.startTime}</td>

            <td>
              {t === null ? "x" : t?.day === "Monday" ? loadStyledCell(t) : "x"}
            </td>
            <td>
              {t === null
                ? "x"
                : t?.day === "Tuesday"
                ? loadStyledCell(t)
                : "x"}
            </td>
            <td>
              {t === null
                ? "x"
                : t?.day === "Wednesday"
                ? loadStyledCell(t)
                : "x"}
            </td>
            <td>
              {t === null
                ? "x"
                : t?.day === "Thursday"
                ? loadStyledCell(t)
                : "x"}
            </td>
            <td>
              {t === null ? "x" : t?.day === "Friday" ? loadStyledCell(t) : "x"}
            </td>
            <td>
              {t === null
                ? "x"
                : t?.day === "Saturday"
                ? loadStyledCell(t)
                : "x"}
            </td>
            <td>
              {t === null ? "x" : t?.day === "Sunday" ? loadStyledCell(t) : "x"}
            </td>
          </>
        ))
      )}
    </tr>
  );
};

export default TimetableRow;
