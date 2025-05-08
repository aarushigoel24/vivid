import { PieChart, Pie, Cell, Legend } from 'recharts';

const complianceData = [
  { name: 'Cleaned', value: 91.4 },
  { name: 'Incomplete Scan', value: 5.7 },
  { name: 'No Scan Received - Adj. Made', value: 2.9 },
];

const COLORS = ['#28a745', '#f0ad4e', '#b190db'];

export const CompliancePieChart = () => (
  <PieChart width={400} height={300}>
    <Pie data={complianceData} cx="50%" cy="50%" label outerRadius={100} dataKey="value">
      {complianceData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index]} />
      ))}
    </Pie>
    
  </PieChart>
);
