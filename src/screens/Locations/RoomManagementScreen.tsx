import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { useGetTags } from "../../queries/useGetTags";
import { useGetSubjects } from "../../queries/useGetSubjects";
import { useGetLecturers } from "../../queries/useGetLecturers";
import { useGetGroup } from "../../queries/useGetGroup";
import { useGetSubGroup } from "../../queries/useGetSubGroup";
import RoomsForSession from "../../components/RoomManagement/RoomsForSession";
import RoomsForTags from "../../components/RoomManagement/RoomsForTags";
import { Tags } from "../../models/Tags";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    height: "10px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  container: {
    borderStyle: "solid",
    borderColor: "#e4e3e3",
    borderRadius: "5px",
    borderWidth: "1px",
    width: "90%",
    height: "90%",
    marginLeft: "25px",
    marginRight: "100px",
  },
  containerRight: {
    borderStyle: "solid",
    borderColor: "#e4e3e3",
    borderRadius: "5px",
    borderWidth: "1px",
    width: "90%",
    height: "90%",
    marginRight: "100px",
  },
}));

const RoomManagementScreen: React.SFC = () => {
  const classes = useStyles();

  const tags = useGetTags().data;
  const subjects = useGetSubjects().data;
  const lecturers = useGetLecturers().data;
  const groups = useGetGroup().data;
  const subgroup = useGetSubGroup().data;

  const [tag, setTag] = React.useState<Tags>({ _id: "", name: "", rooms: [] });

  const { register, handleSubmit, errors } = useForm();

  return (
    <>
      <h3 style={{ textAlign: "center" }}>Room Management</h3>
      <div
        style={{
          paddingLeft: "40px",
          paddingRight: "40px",
          paddingTop: "5px",
        }}
      >
        <br />
        <Typography
          component="div"
          style={{
            backgroundColor: "white",
            height: 680,
            borderRadius: 10,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <div style={{ width: "540px", height: "230px" }}>
                <Container className={classes.container}>
                  <h5 style={{ fontFamily: "Roboto", marginTop: "10px" }}>
                    Tags
                  </h5>
                  <br />
                  <h6 style={{ color: "gray", fontSize: "12px" }}>Tag Name</h6>
                  <Grid item xs={8}>
                    <select
                      className="form-select"
                      aria-label="tags"
                      name="tags"
                      ref={register({ required: true })}
                      // value={tag}
                      onChange={() => {
                        //  setTag(event.target.value as Tags);
                      }}
                    >
                      {tags?.map((t) => {
                        return <option value={t.name}>{t.name}</option>;
                        {
                        }
                      })}
                    </select>

                    <div style={{ float: "right" }}>
                      <br />
                      <RoomsForTags />
                    </div>
                  </Grid>
                </Container>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ width: "540px", height: "230px" }}>
                <Container className={classes.containerRight}>
                  <h5 style={{ fontFamily: "Roboto", marginTop: "10px" }}>
                    Subjects
                  </h5>

                  <h6
                    style={{
                      color: "gray",
                      fontSize: "12px",
                      marginTop: "15px",
                    }}
                  >
                    Tag Name
                  </h6>
                  <Grid item xs={8}>
                    <select
                      className="form-select"
                      aria-label="tags"
                      name="tags"
                      ref={register({ required: true })}
                    >
                      {tags?.map((t) => {
                        return <option value={t.name}>{t.name}</option>;
                      })}
                    </select>
                  </Grid>
                  <Grid item xs={8}>
                    <h6 style={{ color: "gray", fontSize: "12px" }}>
                      Subject Name
                    </h6>
                    <select
                      className="form-select"
                      aria-label="tags"
                      name="tags"
                      ref={register({ required: true })}
                    >
                      {subjects?.map((s) => {
                        return (
                          <option value={s.subjectName}>{s.subjectName}</option>
                        );
                      })}
                    </select>
                  </Grid>
                </Container>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <div style={{ width: "540px", height: "230px" }}>
                <Container className={classes.container}>
                  <h5 style={{ fontFamily: "Roboto", marginTop: "10px" }}>
                    Lecturers
                  </h5>
                  <br />
                  <h6 style={{ color: "gray", fontSize: "12px" }}>
                    Lecturer Name
                  </h6>
                  <Grid item xs={8}>
                    <select
                      className="form-select"
                      aria-label="lecturer"
                      name="leturer"
                      ref={register({ required: true })}
                    >
                      {lecturers?.map((l) => {
                        return <option value={l.name}>{l.name}</option>;
                      })}
                    </select>
                  </Grid>
                </Container>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ width: "540px", height: "230px" }}>
                <Container className={classes.containerRight}>
                  <h5 style={{ fontFamily: "Roboto", marginTop: "10px" }}>
                    Groups/Sub-groups
                  </h5>

                  <Grid item xs={8}>
                    <h6
                      style={{
                        color: "gray",
                        fontSize: "12px",
                        marginTop: "15px",
                      }}
                    >
                      Group Name
                    </h6>
                    <select
                      className="form-select"
                      aria-label="group"
                      name="group"
                      ref={register({ required: true })}
                    >
                      {groups?.map((g) => {
                        return <option value={g.number}>{g.number}</option>;
                      })}
                    </select>
                  </Grid>
                  <Grid item xs={8}>
                    <h6 style={{ color: "gray", fontSize: "12px" }}>
                      Sub-group Name
                    </h6>
                    <select
                      className="form-select"
                      aria-label="subgroup"
                      name="subgroup"
                      ref={register({ required: true })}
                    >
                      {subgroup?.map((s) => {
                        return <option value={s.number}>{s.number}</option>;
                      })}
                    </select>
                  </Grid>
                </Container>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <div style={{ width: "540px", height: "180px" }}>
                <Container className={classes.container}>
                  <h5 style={{ fontFamily: "Roboto", marginTop: "10px" }}>
                    Sessions
                  </h5>
                  <br />
                  <h6 style={{ color: "gray", fontSize: "14px" }}>
                    Add Rooms for sessions
                  </h6>
                  <RoomsForSession />
                </Container>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ width: "540px", height: "180px" }}>
                <Container className={classes.containerRight}>
                  <h5 style={{ fontFamily: "Roboto", marginTop: "10px" }}>
                    Unavailable Room Period
                  </h5>
                  <br />
                  <h6 style={{ color: "gray", fontSize: "14px" }}>
                    Add time period that con not be reserved
                  </h6>
                </Container>
              </div>
            </Grid>
          </Grid>
        </Typography>
      </div>
    </>
  );
};

export default RoomManagementScreen;
