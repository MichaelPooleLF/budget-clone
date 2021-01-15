import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  budgetHeader: {
    boxSizing: 'border-box',
    position: 'fixed',
    top: '0',
    zIndex: '1000',
    width: '700px',
    height: '125px',
    padding: '1rem 0',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f7f8',
    justifyContent: 'center',
    borderBottom: '1px solid #b6bec2'
  },
  date: {
    margin: '0'
  },
  budgetLeft: {
    margin: '0'
  }
});

function BudgetHeader(props) {
  const classes = useStyles(props);
  return (
    <header className={classes.budgetHeader}>
      <h1 className={classes.date}>January 2021</h1>
      <p className={classes.budgetLeft}><strong>$1,700.00</strong> left to budget</p>
    </header>
  );
}

export default BudgetHeader;
