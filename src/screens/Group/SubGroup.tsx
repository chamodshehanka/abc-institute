import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Portal from "@material-ui/core/Portal";
import Box from "@material-ui/core/Box";
import { useForm } from "react-hook-form";
import ManageSubGroupTable from "../../components/Group/SubGroupTable";
import ManageGenerateSubGroupTable from "../../components/Group/GeneratSubGroupTable";
import { useGetSubGroup } from "../../queries/useGetSubGroup";
import { useGetGroup } from "../../queries/useGetGroup";
import { useGetYearSemester } from "../../queries/useGetYearSemester";
import { useGetProgramme } from "../../queries/useGetProgramme";
import { useGenerateSubGroupId } from "../../queries/useGenerateSubGroupId";
import { addSubGroup } from "../../api/student/subGroup.request";
import {
  SubGroupCreateData,
  GenerateSubGroupIdCreateData,
} from "../../api/interfaces";
import { addGenerateSubGroupId } from "../../api/student/GenerateSubGroupId.request";

import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  addbtn: {
    margin: theme.spacing(1),
    backgroundColor: "#0075FF",
    color: "white",
  },
  dropdown: {
    position: "fixed",
    width: 800,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  btnAdd: {
    margin: theme.spacing(1),
    backgroundColor: "#0075FF",
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 18,
  },
  btnCanl: {
    margin: theme.spacing(1),
    backgroundColor: "#EF6E6E",
    borderRadius: 18,
  },
}));

const SubGroup: React.SFC = () => {
  const { data: subgroup = [] } = useGetSubGroup();
  const { data: group = [] } = useGetGroup();
  const { data: year = [] } = useGetYearSemester();
  const { data: programme = [] } = useGetProgramme();
  const { data: generatedId = [] } = useGenerateSubGroupId();

  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClick1 = () => {
    setOpen1((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClickAway1 = () => {
    setOpen1(false);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    const subgroups: SubGroupCreateData = {
      number: data?.number,
    };

    addSubGroup(subgroups)
      .then((res) => {
        console.log(res);
        history.push("student-home-screen");
        history.push("subgroup-screen");
      })
      .catch((err) => console.error(err));
  };

  const onSubmit2 = (data: any) => {
    console.log("id", data);
    const generategroups: GenerateSubGroupIdCreateData = {
      groupId:
        data?.yearSem +
        "." +
        data?.programme +
        "." +
        data?.group +
        "." +
        data?.subgroup,
    };

    addGenerateSubGroupId(generategroups)
      .then((res) => {
        console.log(res);
        history.push("student-home-screen");
        history.push("subgroup-screen");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container>
          <h3 style={{ textAlign: "center" }}>Student management</h3>
          <hr style={{ width: 1000, borderWidth: 10, marginLeft: 60 }} />

          <div>
            <Container fixed>
              <Typography
                component="div"
                style={{
                  backgroundColor: "#cfe8fc",
                  height: 600,
                  borderRadius: 30,
                }}
              >
                <div style={{ width: "100%", marginLeft: 200, marginTop: 20 }}>
                  <Box display="flex" p={1}>
                    <Box
                      p={1}
                      order={1}
                      m={1}
                      flexGrow={0.63}
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <h5 style={{ marginLeft: 20, marginTop: 10 }}>
                        Student Sub Groups
                      </h5>
                    </Box>
                    <Box p={1} order={3} alignItems="flex-start">
                      <ClickAwayListener onClickAway={handleClickAway}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            marginRight: 185,
                          }}
                        >
                          <Fab
                            size="medium"
                            color="secondary"
                            aria-label="add"
                            className={classes.addbtn}
                            onClick={handleClick}
                          >
                            <AddIcon />
                          </Fab>
                          {open ? (
                            <Portal>
                              <div className={classes.dropdown}>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                  }}
                                >
                                  <Box
                                    boxShadow={15}
                                    bgcolor="background.paper"
                                    m={2}
                                    p={2}
                                    style={{
                                      width: "45rem",
                                      height: "15rem",
                                      borderRadius: 8,
                                    }}
                                  >
                                    <div>
                                      <p
                                        style={{
                                          textAlign: "center",
                                          color: "#020202",
                                          fontSize: 15,
                                        }}
                                      >
                                        Add new Groups
                                      </p>
                                    </div>
                                    <div>
                                      <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        style={{
                                          marginTop: 50,
                                          textAlign: "center",
                                        }}
                                        className={classes.root}
                                        noValidate
                                        autoComplete="off"
                                      >
                                        <div>
                                          <input
                                            id="number"
                                            placeholder="Enter Group Number"
                                            style={{ width: 250, height: 30 }}
                                            name="number"
                                            ref={register}
                                          />
                                        </div>
                                        <div style={{ marginTop: 15 }}>
                                          <button
                                            type="submit"
                                            className="btn btn-primary btn-abc"
                                          >
                                            Add
                                          </button>{" "}
                                          <button
                                            type="button"
                                            className="btn btn-danger btn-abc"
                                            onClick={handleClickAway}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </Box>
                                </div>
                              </div>
                            </Portal>
                          ) : null}
                        </div>
                      </ClickAwayListener>
                    </Box>
                  </Box>
                </div>
                <div
                  style={{
                    width: 600,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginLeft: 240,
                  }}
                >
                  <ManageSubGroupTable subgroup={subgroup} />
                </div>

                <div style={{ width: "100%", marginLeft: 200, marginTop: 20 }}>
                  <Box display="flex" p={1}>
                    <Box
                      p={1}
                      order={1}
                      m={1}
                      flexGrow={0.63}
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <h5 style={{ marginLeft: 20, marginTop: 10 }}>
                        Generated Group ID
                      </h5>
                    </Box>
                    <Box p={1} order={3} alignItems="flex-start">
                      <ClickAwayListener onClickAway={handleClickAway1}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            marginRight: 185,
                          }}
                        >
                          <Fab
                            size="medium"
                            color="secondary"
                            aria-label="add"
                            className={classes.addbtn}
                            onClick={handleClick1}
                          >
                            <SettingsIcon />
                          </Fab>
                          {open1 ? (
                            <Portal>
                              <div className={classes.dropdown}>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                  }}
                                >
                                  <Box
                                    boxShadow={15}
                                    bgcolor="background.paper"
                                    m={2}
                                    p={2}
                                    style={{
                                      width: "45rem",
                                      height: "15rem",
                                      borderRadius: 8,
                                    }}
                                  >
                                    <div>
                                      <p
                                        style={{
                                          textAlign: "center",
                                          color: "#020202",
                                          fontSize: 15,
                                        }}
                                      >
                                        Add new Groups
                                      </p>
                                    </div>
                                    <div>
                                      <form
                                        onSubmit={handleSubmit(onSubmit2)}
                                        style={{
                                          marginTop: 50,
                                          textAlign: "center",
                                        }}
                                        className={classes.root}
                                        noValidate
                                        autoComplete="off"
                                      >
                                        <div>
                                          <Grid
                                            container
                                            spacing={2}
                                            className="form-row"
                                          >
                                            <Grid item xs={6}>
                                              <label>
                                                Choose Year & Semester:{" "}
                                              </label>
                                              <select
                                                id="yearSem"
                                                className="form-select"
                                                name="yearSem"
                                                ref={register}
                                              >
                                                {year.map((i) => (
                                                  <option
                                                    key={i._id}
                                                    value={
                                                      i.year + "." + i.semester
                                                    }
                                                  >
                                                    {i.year}.{i.semester}
                                                  </option>
                                                ))}
                                              </select>
                                            </Grid>

                                            <Grid item xs={6}>
                                              <label>Choose Programme : </label>
                                              <select
                                                id="programme"
                                                className="form-select"
                                                name="programme"
                                                ref={register}
                                              >
                                                {programme.map((k) => (
                                                  <option
                                                    key={k._id}
                                                    value={k.name}
                                                  >
                                                    {k.name}
                                                  </option>
                                                ))}
                                              </select>
                                            </Grid>

                                            <Grid item xs={6}>
                                              <label>
                                                Choose Group Number :{" "}
                                              </label>
                                              <select
                                                id="group"
                                                className="form-select"
                                                name="group"
                                                ref={register}
                                              >
                                                {group.map((g) => (
                                                  <option
                                                    key={g._id}
                                                    value={g.number}
                                                  >
                                                    {g.number}
                                                  </option>
                                                ))}
                                              </select>
                                            </Grid>

                                            <Grid item xs={6}>
                                              <label>
                                                Choose Sub Group Number :{" "}
                                              </label>
                                              <select
                                                id="group"
                                                className="form-select"
                                                name="subgroup"
                                                ref={register}
                                              >
                                                {subgroup.map((s) => (
                                                  <option
                                                    key={s._id}
                                                    value={s.number}
                                                  >
                                                    {s.number}
                                                  </option>
                                                ))}
                                              </select>
                                            </Grid>
                                          </Grid>
                                        </div>
                                        <div style={{ marginTop: 15 }}>
                                          <button
                                            type="submit"
                                            className="btn btn-primary btn-abc"
                                          >
                                            Add
                                          </button>{" "}
                                          <button
                                            type="button"
                                            className="btn btn-danger btn-abc"
                                            onClick={handleClickAway1}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </Box>
                                </div>
                              </div>
                            </Portal>
                          ) : null}
                        </div>
                      </ClickAwayListener>
                    </Box>
                  </Box>
                  <div
                    style={{
                      width: 600,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginLeft: 42,
                    }}
                  >
                    <ManageGenerateSubGroupTable
                      generatesubgroup={generatedId}
                    />
                  </div>
                </div>
              </Typography>
            </Container>
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default SubGroup;
