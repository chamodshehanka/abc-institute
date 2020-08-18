import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Portal from '@material-ui/core/Portal';
import StudentYearTable from '../../components/Student/StudentYearTable';

const useStyles = makeStyles((theme) => ({
    root: {
        width:300
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      addbtn: {
        margin: theme.spacing(1),
      },
  }));

const StudentYearScreen = () => {
    const classes = useStyles();

    return (
        <div>

<React.Fragment>
        <CssBaseline />
            <Container >
                <h3 style={{textAlign:'center'}}>
                    Student management
                </h3>
                <h5 style={{marginTop:50, paddingLeft:30}}>Acedemic year & Semester</h5>
                <hr style={{width:1000, borderWidth:10, marginLeft: 60}}/> 
                <div style={{ display: 'flex',flexDirection: 'column',alignItems: 'flex-end', padding:10}}>
                    <Fab size="medium" color="secondary" aria-label="add" className={classes.addbtn}>
                    <AddIcon />
                    </Fab>
                </div>
                       <div>
                       <Container fixed>
                            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: 550, borderRadius: 30 }} >
                              <StudentYearTable />
                            </Typography>
                    </Container>

                       </div>
            </Container>
        </React.Fragment>
            
        </div>
    );
}

export default StudentYearScreen;