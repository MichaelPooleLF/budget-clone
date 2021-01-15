import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from './header';
import Item from './item';
import Footer from './footer';

const useStyles = makeStyles({
  paperWrapper: {
    padding: '0 2rem',
    margin: '2rem auto'
  }
});

function BudgetGroup(props) {
  const classes = useStyles(props);
  return (
    <Paper className={classes.paperWrapper} >
      <Header/>
      <Item/>
      <Footer/>
    </Paper>
  );
}

export default BudgetGroup;
