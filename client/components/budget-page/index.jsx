import React from 'react';
import BudgetHeader from '../budget-header';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  budgetPage: {
    position: 'fixed',
    top: '0',
    left: props => props.left ? props.left : '0',
    padding: '0 3rem'
  }
});

function BudgetPage(props) {
  const classes = useStyles(props);
  return (
    <main className={classes.budgetPage}>
      <BudgetHeader/>
    </main>
  );
}

export default BudgetPage;
