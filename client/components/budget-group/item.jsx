import React from 'react';
import { Grid, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  alignRight: {
    textAlign: 'right',
    '& input': {
      textAlign: 'right'
    }
  },
  centered: {
    display: 'flex',
    alignItems: 'center'
  },
  underlined: {
    borderBottom: '1px solid #d5d9db'
  }
});

function Item(props) {
  const classes = useStyles(props);
  return (
    <Grid className={classes.underlined} container spacing={3}>
      <Grid className={classes.centered} item xs={6}>
        <Input
          value="Paycheck"
          name="Paycheck budget item"
          autoComplete
          disableUnderline
          fullWidth
          />
      </Grid>
      <Grid className={classes.centered} item xs={3}>
        <Input
          className={classes.alignRight}
          value="$1,500.00"
          name="Paycheck planned"
          autoComplete
          disableUnderline
          fullWidth
        />
      </Grid>
      <Grid className={classes.alignRight} item xs={3}>
        <p>$0.00</p>
      </Grid>
    </Grid>
  );
}

export default Item;
