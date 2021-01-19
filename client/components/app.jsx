import React from 'react';
import Navbar from './navbar';
import BudgetPage from './budget-page';
import DonutChart from './donut-chart';

export default function App(props) {
  return (
    <>
      <Navbar width="290px"/>
      <BudgetPage left="290px"/>
      <DonutChart/>
    </>
  );
}
