import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { Session } from "../../models/Session";
import { useForm } from "react-hook-form";
import { addCSession } from "../../api/sessions/consecutiveSessions.request";
import { CSessionCreateData } from "../../api/interfaces";
import { useGetCSessions } from "../../queries/useGetConsecutive";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ManageCsessiontbl from "./ConsecutiveSessionTbl";

export interface ManageConProps {
  csession: Session[];
}

const ConsecutiveSession: React.SFC<ManageConProps> = ({
  csession,
}: ManageConProps) => {
  const [id, setId] = useState("");
  const [addDialog, setAddDialog] = useState(false);

  const handleAddDialogOpen = () => {
    setAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setAddDialog(false);
  };

  //let l: string[];
  const values = [""];
  values.pop();

  const { register, handleSubmit } = useForm();

  console.log(register);
  const { data = [] } = useGetCSessions();

  const onSubmit = (data: any) => {
    console.log("submit data", data);

    const csession: CSessionCreateData = {
      csessions: values,
    };

    addCSession(csession)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end" }}>
        <button className="btn btn-primary" onClick={handleAddDialogOpen}>
          View Consecutive Sessions <VisibilityIcon />
        </button>
      </div>
      <TableContainer
        className="table-container expandable-table-container"
        style={{ marginTop: 40 }}
      >
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
            {csession?.map((s: Session) => (
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
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="cbSixtyMin"
                    name="check"
                    onClick={() => {
                      setId(s._id);
                      values.push(id);
                      console.log("arry value", values);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog
          open={addDialog}
          onClose={handleAddDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="lg"
        >
          <DialogTitle id="alert-dialog-title">
            {"Consecutive Sessions"}
          </DialogTitle>

          <DialogContent>
            <ManageCsessiontbl csession={data} />
          </DialogContent>
        </Dialog>

        <div>
          <form
            style={{ marginTop: 50, textAlign: "center" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <button type="submit" className="btn btn-primary btn-abc">
              Add
            </button>
          </form>
        </div>
      </TableContainer>
    </div>
  );
};

export default ConsecutiveSession;
