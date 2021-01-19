import React from 'react';
// import Chart from 'chart.js';
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
    <div className={classes.chart}>
      <h1>Donut Chart</h1>
      <canvas id="budgetChart"></canvas>
    </div>
  );
}
