import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@material-ui/core";
import { Session } from "../../models/Session";
import { useForm } from "react-hook-form";
import { addPSession } from "../../api/sessions/parallelSessions.request";
import { PSessionCreateData } from "../../api/interfaces";

export interface ManageParallelProps {
  psession: Session[];
}

const ParallelSession: React.SFC<ManageParallelProps> = ({
  psession,
}: ManageParallelProps) => {
  let values: string[];

  const [id, setId] = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("submit data", data);

    const psession: PSessionCreateData = {
      psessions: data?.psessions,
    };

    addPSession(psession)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <TableContainer className="table-container expandable-table-container">
        <Table
          size="small"
          stickyHeader
          aria-label="sticky table"
          className="table-first-cell-padded"
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ fontFamily: "Varela Round" }}>
                Subject Name
              </TableCell>
              <TableCell style={{ fontFamily: "Varela Round" }}>
                Subject Code
              </TableCell>
              <TableCell style={{ fontFamily: "Varela Round" }}>Tag</TableCell>
              <TableCell style={{ fontFamily: "Varela Round" }}>
                Group ID
              </TableCell>
              <TableCell style={{ fontFamily: "Varela Round" }}>
                Student Count
              </TableCell>
              <TableCell style={{ fontFamily: "Varela Round" }}>
                Duration
              </TableCell>
              <TableCell>Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {psession?.map((s: Session) => (
              <TableRow key={s._id} hover={true}>
                <TableCell style={{ fontFamily: "Varela Round" }}>
                  {s.subject}
                </TableCell>
                <TableCell>{s.subjectCode}</TableCell>
                <TableCell>{s.tags}</TableCell>
                <TableCell>{s.studentGroup}</TableCell>
                <TableCell>{s.noOfStudents}</TableCell>
                <TableCell>{s.duration}</TableCell>
                <TableCell style={{ width: "5rem" }}>
                  <button
                    onClick={() => {
                      setId(s._id);
                      values.push(id);
                    }}
                  >
                    add
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div>
          <form
            style={{ marginTop: 50, textAlign: "center" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="hidden"
              id="name"
              name="psessions"
              ref={register}
              value={id}
            />

            <button type="submit" className="btn btn-primary btn-abc">
              Add
            </button>
          </form>
        </div>
      </TableContainer>
      <ul>
        {/* {values?.map((value, index) => (
          <li key={index}>{value}</li>
        ))}

        {  console.log("array1 ", values[0])}
        {  console.log("array2 ", values[1])} */}
      </ul>
    </div>
  );
};

export default ParallelSession;
