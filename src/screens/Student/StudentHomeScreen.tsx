import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StudentHomecard from '../../components/Student/StudentHomecard';

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
  }));


export default function StudentHomeScreen() {
   
    const classes = useStyles();

        return (
            <div>
        <React.Fragment>
        <CssBaseline />
            <Container >
                <h3 style={{textAlign:'center'}}>
                    Student management
                </h3>

                <h5 style={{marginTop:10, paddingLeft:30}}>Dashboard</h5>
                <hr style={{width:1000, borderWidth:10, marginLeft: 60}}/> 
                       <div>
                       <Container fixed>
                            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: 600, borderRadius: 30 }} >
                     
                              <StudentHomecard />  
                              <hr style={{width:1000, borderWidth:10, marginLeft: 60}}/> 

                            </Typography>
                    </Container>

                       </div>
            </Container>
        </React.Fragment>
            </div>
        );
}



