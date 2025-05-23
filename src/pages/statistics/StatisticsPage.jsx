import React, { useContext, useMemo } from 'react';
import { UsersContext } from '../../context/usersContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsPage = () => {
  const { state } = useContext(UsersContext);

  const countryCounts = useMemo(() => {
    const counts = {};
    state.users.forEach(({ country }) => {
      if (country) counts[country] = (counts[country] || 0) + 1;
    });
    return counts;
  }, [state.users]);

  const data = {
    labels: Object.keys(countryCounts),
    datasets: [
      {
        label: '# of Users',
        data: Object.values(countryCounts),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#9C27B0',
          '#FF9800',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 32 }}>
      <h2>User Distribution by Country</h2>
      <Pie data={data} />
    </div>
  );
};

export default StatisticsPage;
