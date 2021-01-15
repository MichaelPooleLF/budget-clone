import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  alignRight: {
    textAlign: 'right'
  }
});

function Header(props) {
  const classes = useStyles(props);
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <p><strong>Income</strong> for January</p>
      </Grid>
      <Grid className={classes.alignRight} item xs={3}>
        <p>Planned</p>
      </Grid>
      <Grid className={classes.alignRight} item xs={3}>
        <p>Received</p>
      </Grid>
    </Grid>
  );
}

export default Header;
