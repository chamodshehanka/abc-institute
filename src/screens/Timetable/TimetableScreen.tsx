import React, { useState } from "react";
import { Container, Card, LinearProgress, Toolbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useGetTimetable } from "../../queries/useGetTimetable";
import TimetableTable from "../../components/Timetable/TimetableTable";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";
import { TableSearchInput } from "../../components/Common/TableViewComponents/TableSearchInput";
import { useHistory } from "react-router-dom";

const TimetableScreen: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const { data = [], status } = useGetTimetable();
  const history = useHistory();

  const noData = status === "success" && data?.length === 0;
  const hasData = status === "success" && data?.length !== 0;

  return (
    <>
      <h4 className="title mb-4">Manage Timetables</h4>

      <div className="row mb-3">
        <div className="col-1"></div>
        <div className="col-8">
          <SearchIcon className="search-icon" />{" "}
          <TableSearchInput onUpdate={setSearchText} />
        </div>
        <div className="col-3">
          <button
            className="btn btn-primary"
            onClick={() => {
              history.push("/generate-timetable");
            }}
          >
            Create <AddCircleIcon />
          </button>
        </div>
      </div>

      {status === "loading" && <LinearProgress />}

      <div className="row mb-3">
        <div className="col-9"></div>
        <div className="col-2">
          <select className="form-select" aria-label="Default select example">
            <option selected>Sort By</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>

      <Container className="top-container">
        <Card>
          <Toolbar style={{ paddingLeft: 0 }}>
            <div className="container">
              {status === "error" && (
                <Alert severity="error">Error loading Working Days Data</Alert>
              )}
              {noData && (
                <Alert severity="info">
                  You have not created any timetables.
                </Alert>
              )}
              {hasData && (
                <TimetableTable timetables={data} searchVal={searchText} />
              )}
            </div>
          </Toolbar>
        </Card>
      </Container>
    </>
  );
};

export default TimetableScreen;
