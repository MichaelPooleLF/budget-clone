import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  chart: {
    position: 'fixed',
    top: '0',
    left: '1086px',
    right: '0',
    textAlign: 'center'
  }
});

export default function DonutChart(props) {
  const classes = useStyles();
  return (
    <h1 className={classes.chart}>Donut Chart</h1>
  );
}
