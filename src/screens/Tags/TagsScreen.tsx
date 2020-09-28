import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Portal from "@material-ui/core/Portal";
import Box from "@material-ui/core/Box";
import ManageTagsTable from "../../components/Tags/TagsTable";
import { useGetTags } from "../../queries/useGetTags";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { addTags } from "../../api/student/tags.request";
import { TagsCreateData } from "../../api/interfaces";

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

const TagsScreen: React.SFC = () => {
  const { data = [] } = useGetTags();

  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    const tags: TagsCreateData = {
      name: data?.name,
    };

    addTags(tags)
      .then((res) => {
        console.log(res);
        history.push("/student-home-screen");
        history.push("/tags-screen");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container>
          <h3 style={{ textAlign: "center" }}>Tags</h3>
          <h5 style={{ marginTop: 50, paddingLeft: 30 }}>Manage tags</h5>
          <hr style={{ width: 1000, borderWidth: 10, marginLeft: 60 }} />
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
                            Add Tag
                          </p>
                        </div>
                        <div>
                          <form
                            style={{ marginTop: 50, textAlign: "center" }}
                            className={classes.root}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit(onSubmit)}
                          >
                            <div>
                              <input
                                id="name"
                                placeholder="Programme Name"
                                style={{ width: 300, height: 30 }}
                                name="name"
                                ref={register({ required: true })}
                              />
                              {errors.name && (
                                <span style={{ color: "red" }}>
                                  This Field is Required
                                </span>
                              )}
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
              <Typography
                component="div"
                style={{
                  backgroundColor: "#cfe8fc",
                  height: 550,
                  borderRadius: 30,
                }}
              >
                <ManageTagsTable tags={data} />
              </Typography>
            </Container>
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default TagsScreen;
