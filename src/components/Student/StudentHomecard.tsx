import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(3),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    alignItems:'center',
    justifyContent:'center'
  },
  
  card1:{
    backgroundColor:'#F5C000',
    width: 300,
    height:180
  },
  card2:{
    backgroundColor:'#0489D6',
    width: 300,
    height:180
  },
  card3:{
    backgroundColor:'#00AD28',
    width: 300,
    height:180
  },
  }));


export default function StudentHomecard() {

    const classes = useStyles();

    return (
      <div className={classes.root} >
      <Paper elevation={3} className={classes.card1}>
        <h4>sadfsdfsdf</h4>
      </Paper>
      <Paper elevation={3} className={classes.card2}>
        <h4>sadfsdfsdf</h4>
      </Paper>
      <Paper elevation={3} className={classes.card3}>
        <h4>sadfsdfsdf</h4>
      </Paper>
    </div>
    )
}
