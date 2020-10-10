import React from "react";
import { SGTimetableCell } from "../../models/SGTimetableCell";

export interface TimetableStudentGroupRowProps {
  data: SGTimetableCell[];
  startTime: string;
}

const TimetableStudentGroupRow: React.FC<TimetableStudentGroupRowProps> = (
  props
) => {
  function loadStyledCell(t: SGTimetableCell) {
    return (
      <>
        {t.subjectCode}
        {" - "}
        {t.subject}
        <br />
        <span className="badge rounded-pill bg-primary">{t.lecturer}</span>
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

export default TimetableStudentGroupRow;
