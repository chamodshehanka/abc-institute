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
import { useGetSubGroup } from "../../queries/useGetSubGroup";
import { addSubGroup } from "../../api/student/subGroup.request";
import { SubGroupCreateData } from "../../api/interfaces";
import { useHistory } from "react-router-dom";

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
  const { data = [] } = useGetSubGroup();

  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
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
        history.push("group-screen");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container>
          <ClickAwayListener onClickAway={handleClickAway}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                padding: 10,
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
                            Add new Sub groups
                          </p>
                        </div>
                        <div>
                          <form
                            onSubmit={handleSubmit(onSubmit)}
                            style={{ marginTop: 50, textAlign: "center" }}
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
          <div>
            <Container fixed>
              <h5 style={{ textAlign: "center" }}> Manage Sub Group ID</h5>
              <ManageSubGroupTable subgroup={data} />
            </Container>
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default SubGroup;
