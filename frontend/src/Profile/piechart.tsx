import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3D from 'highcharts/highcharts-3d';
// Enable the 3D module for Highcharts

const options = {
  chart: {
    type: 'pie',
    options3d: {
      enabled: true,
      alpha: 45, // Tilt angle of the pie
      beta: 0,   // Rotation angle of the pie
      depth: 50, // Depth of the pie (how 3D it looks)
      viewDistance: 25, // Distance of the pie from the viewer
    }
  },
  title: {
    text: 'CleanTrak Compliance',
    style: {
      color: '#c75f00', // Title color
      fontSize: '20px',  // Title font size
    },
  },
  subtitle: {
    text: 'Wednesday 07 May 25',
  },
  plotOptions: {
    pie: {
      innerSize: 0, // 0 for a full pie, you can adjust to make it a donut chart
      depth: 45, // Depth of the 3D pie
      dataLabels: {
        enabled: true,
        format: '{point.y:.1f}%', // Display percentages
        style: {
          color: 'black',
          fontWeight: 'bold',
          fontSize: '12px',
        }
      }
    }
  },
  series: [{
    name: 'Compliance',
    data: [
      { name: 'Cleaned', y: 91.4, color: '#28a745' },
      { name: 'Incomplete Scan', y: 5.7, color: '#f0ad4e' },
      { name: 'No Scan Received - Adj. Made', y: 2.9, color: '#b190db' },
    ]
  }]
};

const Compliance3DPieChart = () => (
  <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
);

export default Compliance3DPieChart;
