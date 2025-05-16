import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const TimeOnSiteDiscrepancyChart: React.FC = () => {
  const options: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Time On Site Discrepency',
      style: { color: '#cc6600', fontWeight: 'bold' },
    },
    subtitle: {
      text: 'Thursday 08 May 25',
       style: {
      color: '#c75f00', // Title color
     
    },
    },
    xAxis: {
      categories: ['D<=50%', '80%<=D>50%', '120%<=D>90%', '200%<=D>120%', 'D>200%'],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of sites',
      },
    },
    tooltip: {
      valueSuffix: ' sites',
    },
    series: [
      {
        name: 'Sites',
        type: 'column',
        data: [0, 1, 28, 5, 0],
        colorByPoint: true,
        colors: ['#f4c2c2', '#ffe599', '#4CAF50', '#4a86e8', '#e06666'],
      },
    ],
    legend: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default TimeOnSiteDiscrepancyChart;
