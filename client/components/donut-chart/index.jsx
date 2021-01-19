import React, { useState } from 'react';
import { PieChart, Pie, Tooltip, Label } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';

const dataSet = [
  {
    name: 'test one',
    value: 100.00
  },
  {
    name: 'test two',
    value: 200.00
  },
  {
    name: 'test three',
    value: 300.00
  },
  {
    name: 'test four',
    value: 400.00
  },
  {
    name: 'test five',
    value: 500.00
  }
];

const useStyles = makeStyles({
  chart: {
    position: 'fixed',
    top: '0',
    left: '1086px',
    right: '0',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  }
});

export default function DonutChart(props) {
  const [sliceName, updateName] = useState(dataSet[0].name);
  const [sliceValue, updateValue] = useState(dataSet[0].value);
  const chartTitle = `${sliceName} ${sliceValue}`;
  const classes = useStyles();

  function updateTitle(event) {
    updateName(event.name);
    updateValue(event.value);
  }

  return (
    <div className={classes.chart}>
      <h1>Donut Chart</h1>
      <PieChart
        width={300}
        height={190}
        >
        <Pie
          data={dataSet}
          innerRadius={80}
          outerRadius={90}
          fill="#82ca9d"
          isAnimationActive={false}
          onMouseOver={e => updateTitle(e)}
          >
            <Label
              value={chartTitle}
              position="center"
              />
          </Pie>
          <Tooltip/>
      </PieChart>
    </div>
  );
}
