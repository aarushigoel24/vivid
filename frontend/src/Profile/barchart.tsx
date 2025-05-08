


const discrepancyData = [
  { name: 'D≤50%', value: 0, color: '#FFB6C1' },
  { name: '80%<=D≤100%', value: 1, color: '#FFD700' },
  { name: '120%<=D≤180%', value: 43, color: '#228B22' },
  { name: '200%<=D≤210%', value: 4, color: '#1E90FF' },
  { name: 'D>220%', value: 4, color: '#FF4500' },
];

const options = {
  chart: {
    type: 'column',
    options3d: {
      enabled: true,
      alpha: 15,
      beta: 15,
      depth: 50,
      viewDistance: 25,
    },
    backgroundColor: '#F5F5F5',
  },
  title: {
    text: 'Time On Site Discrepency',
    style: {
      color: '#A04000',
      fontSize: '20px',
      fontWeight: 'bold',
    },
  },
  subtitle: {
    text: 'Wednesday 07 May 25',
    style: {
      color: '#CB4335',
      fontSize: '16px',
    },
  },
  xAxis: {
    categories: discrepancyData.map(item => item.name),
    labels: {
      style: {
        fontSize: '13px',
        fontWeight: 'bold',
      },
    },
    title: {
      text: null,
    },
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Number of sites',
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
      },
    },
    gridLineColor: '#CCC',
    tickInterval: 10,
  },
  plotOptions: {
    column: {
      depth: 25,
      colorByPoint: true,
      dataLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          fontSize: '12px',
          color: 'black',
        },
      },
    },
  },
  legend: {
    enabled: false,
  },
  series: [{
    name: 'Sites',
    data: discrepancyData.map(item => ({
      y: item.value,
      color: item.color,
    })),
  }],
};

