import React from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '../components/Avatar';
import ProfileUpdatePopup from '../components/ProfileUpdatePopup';
import { Divider, Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  primary: {
    color: '#2196f3',
    fontWeight: 'bold',
  },
  divider: {
    margin: theme.spacing(10, 0),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1), //grid padding
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));



const myFeed = () => {
  const classes = useStyles();
  function FormRow() {
    return ( //return renders the grid
      <React.Fragment>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
      </React.Fragment>
    );
  }
  return (
    <div style={{ padding: 20 }}>
      <Grid
        container direction='column'
        justify='center'
        alignItems='center'
      >
        <Avatar />
      
      {/*<Grid
        container direction='column'
        justify='center'
        alignItems='center'
      >*/}
        <Grid container direction='column'>
            <Grid container direction='row' justify='center' alignItems='center'>
              계정 아이디(DB 연동 예정)
            </Grid>
            <Grid container direction='row' justify='center' alignItems='center'>
              프로필 설명(DB 연동 예정)
            </Grid>
            <Button variant="contained" color="primary" onClick={()=>{}}>
              프로필 수정하기
            </Button>
        </Grid>        
      {/*</Grid>*/}
      </Grid>
      <Divider variant='middle' light className={classes.divider}/>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
};

export default myFeed;
