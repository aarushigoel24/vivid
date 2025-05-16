import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CleaningStatisticChart: React.FC = () => {
  const options: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Cleaning Statistic',
      style: { color: '#cc6600', fontWeight: 'bold' },
    },
    subtitle: {
      text: '01 May 2025 - 08 May 2025',
       style: {
      color: '#c75f00', // Title color
     
    },
    },
    xAxis: {
      categories: [
        '01 May Thu', '02 May Fri', '03 May Sat',
        '04 May Sun', '05 May Mon', '06 May Tue',
        '07 May Wed', '08 May Thu',
      ],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of sites',
      },
    },
    tooltip: {
      shared: true,
    },
    plotOptions: {
      column: {
        stacking: 'normal',
      },
    },
    series: [
      {
        name: 'Cleaned',
        type: 'column',
        data: [20, 22, 6, 3, 22, 22, 30, 0],
        color: '#4CAF50',
      },
      {
        name: 'No Scan Received',
        type: 'column',
        data: [0, 2, 1, 0, 4, 0, 2, 0],
        color: '#fff200',
      },
      {
        name: 'Incomplete Scan',
        type: 'column',
        data: [0, 1, 0, 0, 2, 1, 1, 0],
        color: '#f6b26b',
      },
      {
        name: 'No Scan Received - Adj. Made',
        type: 'column',
        data: [0, 1, 0, 0, 2, 2, 1, 0],
        color: '#a64dff',
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default CleaningStatisticChart;
