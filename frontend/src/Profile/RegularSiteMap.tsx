import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import mapDataAU from '@highcharts/map-collection/countries/au/au-all.geo.json';



const data: [string, number | null][] = [
  ['au-vic', 49],
  ['au-nsw', 1],
  ['au-nt', 3],
  ['au-tas', 0],
  ['au-qld', 0],
  ['au-wa', 0],
  ['au-sa', 0],
  ['au-act', 0],
];

const options: Highcharts.Options = {
  chart: {
    map: mapDataAU as any,
  },
  title: {
    text: 'Current Regular Clean Sites by State',
    align: 'center',
    style: {
      color: '#d2691e',
      fontWeight: 'bold',
    },
  },
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: 'bottom',
    },
  },
  colorAxis: {
    min: 0,
    stops: [
      [0, '#EFEFFF'],
      [0.5, '#FFDD00'],
      [1, '#FF0000'],
    ],
  },
  series: [
    {
      type: 'map',
      name: 'Clean Sites',
      data: data,
      dataLabels: {
        enabled: true,
        format: '{point.name}, {point.value}',
      },
      tooltip: {
        pointFormat: '{point.name}: {point.value}',
      },
    },
  ],
};

const RegularCleanSitesMap: React.FC = () => {
  return <HighchartsReact highcharts={Highcharts} constructorType={'mapChart'} options={options} />;
};

export default RegularCleanSitesMap;
