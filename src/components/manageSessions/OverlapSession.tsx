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
import { addOSession } from "../../api/sessions/overlapSessions.request";
import { OSessionCreateData } from "../../api/interfaces";
import { useGetOSessions } from "../../queries/useGetOverlap";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ManageOsessiontbl from "./OverlapSessionTbl";
import { useHistory } from "react-router-dom";

export interface ManageOverlapProps {
  osession: Session[];
}

const OverlapSession: React.SFC<ManageOverlapProps> = ({
  osession,
}: ManageOverlapProps) => {

  const [addDialog, setAddDialog] = useState(false);
  const history = useHistory();

  const handleAddDialogOpen = () => {
    setAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setAddDialog(false);
  };

  var values:string[]; 
  values = [];

  const { register, handleSubmit } = useForm();
  console.log(register);
  const { data = [] } = useGetOSessions();

  const onSubmit = (data: any) => {
    console.log("submit data", data);

    const osession: OSessionCreateData = {
      osessions: values,
    };

    addOSession(osession)
      .then((res) => {
        console.log(res);
        history.push("student-home-screen");
        history.push("SessionManage-screen");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end" }}>
        <button className="btn btn-primary" onClick={handleAddDialogOpen}>
          View Overlap Sessions <VisibilityIcon />
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
            {osession?.map((s: Session) => (
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
                      values.push(s._id);
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
            {"Overlap Sessions"}
          </DialogTitle>

          <DialogContent>
            <ManageOsessiontbl osession={data} />
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

export default OverlapSession;
