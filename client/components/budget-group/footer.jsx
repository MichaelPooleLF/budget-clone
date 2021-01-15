import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  alignRight: {
    textAlign: 'right'
  },
  label: {
    textTransform: 'none'
  },
  centered: {
    display: 'flex',
    alignItems: 'center'
  },
  btn: {
    padding: '0'
  }
});

function Footer(props) {
  const classes = useStyles(props);
  return (
    <Grid container spacing={3}>
      <Grid className={classes.centered} item xs={6}>
        <Button
          className={classes.btn}
          classes={{ label: classes.label }}
          color="primary"
          >
          Add Item
        </Button>
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

export default Footer;
