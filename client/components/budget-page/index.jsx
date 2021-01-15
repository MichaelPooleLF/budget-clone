import React from 'react';
import BudgetHeader from '../budget-header';
import BudgetGroup from '../budget-group';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  budgetPage: {
    position: 'absolute',
    top: '0',
    left: props => props.left ? props.left : '0',
    marginTop: '9rem',
    padding: '0 3rem',
    width: '700px'
  }
});

function BudgetPage(props) {
  const classes = useStyles(props);
  return (
    <main className={classes.budgetPage}>
      <BudgetHeader />
      <BudgetGroup />
      <BudgetGroup />
      <BudgetGroup />
      <BudgetGroup />
      <BudgetGroup />
      <BudgetGroup />
    </main>
  );
}

export default BudgetPage;
