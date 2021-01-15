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
  item: {
    borderBottom: '1px solid #d5d9db',
    padding: '0.25rem 0'
  }
});

function Item(props) {
  const classes = useStyles(props);
  return (
    <Grid className={classes.item} container>
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
