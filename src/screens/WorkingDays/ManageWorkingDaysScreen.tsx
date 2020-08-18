import React from "react";
import { Container, Card, LinearProgress, Toolbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useGetWorkingDays } from "../../queries/useGetWorkingDays";
import ManageWorkingDaysTable from "../../components/WorkingDays/WorkingDaysTable";

const ManageWorkingDaysScreen: React.SFC = () => {
  // const [searchText, setSearchText] = useState("");

  const { data = [], status } = useGetWorkingDays();

  const noData = status === "success" && data?.length === 0;
  const hasData = status === "success" && data?.length !== 0;

  return (
    <>
      <h4 className="title">Manage Working Days</h4>

      <div className="row mb-3">
        <div className="col-1"></div>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search To Filter"
          />
        </div>
        <div className="col-3">
          <button className="btn btn-primary">Create</button>
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
                <Alert severity="info">You have no saved working days.</Alert>
              )}
              {hasData && <ManageWorkingDaysTable workingDays={data} />}
            </div>
          </Toolbar>
        </Card>
      </Container>
    </>
  );
};

export default ManageWorkingDaysScreen;
