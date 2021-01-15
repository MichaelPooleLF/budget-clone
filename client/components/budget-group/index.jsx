import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from './header';
import Item from './item';

const useStyles = makeStyles({
  paperWrapper: {
    padding: '0 2rem'
  }
});

function BudgetGroup(props) {
  const classes = useStyles(props);
  return (
    <Paper className={classes.paperWrapper} >
      <Header/>
      <Item/>
    </Paper>
  );
}

export default BudgetGroup;
