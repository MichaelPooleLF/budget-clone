import React, { useState } from 'react';
import { dataSet } from './dataset.json';
import { PieChart, Pie, Tooltip, Label } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';

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
