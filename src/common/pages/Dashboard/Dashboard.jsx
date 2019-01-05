import React from 'react';
import { Chart } from 'react-google-charts';

const labels = [
  'Master Bedroom',
  'Enyi Room',
  'Family Room',
  'Guest Room',
  'Dining Room',
  'Kitchen',
  'Office',
  'Nursery',
  'Living Room',
  'Mudroom'
];

const data = [...Array(40).values()].map((v, i) => {
  return [i].concat(labels.map(() => Math.random() * 100));
});

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <Chart
      width="600px"
      height="400px"
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={[['x', ...labels], ...data]}
      options={{
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Temperature (Celsius)'
        }
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  </div>
);

export default Dashboard;
