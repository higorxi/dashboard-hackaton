'use client';
import { Grid } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';

// Registrar os elementos necessários do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const Shadow = () => {
  // Dados do gráfico de rosca - Produtos Mais Vendidos
  const doughnutData = {
    labels: ['BC', 'AP', 'SK', 'PEPSI', 'ORIG', 'GCA'],
    datasets: [
      {
        label: 'Vendas',
        data: [4985264, 8448649, 424278, 538506, 1305470, 1101491],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)', // BC
          'rgba(54, 162, 235, 0.2)', // AP
          'rgba(255, 206, 86, 0.2)', // SK
          'rgba(75, 192, 192, 0.2)', // PEPSI
          'rgba(153, 102, 255, 0.2)', // ORIG
          'rgba(255, 159, 64, 0.2)',  // GCA
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Dados do gráfico de linhas - Produtos Mais Consumidos no Brasil
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Produto X',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
      {
        label: 'Produto Y',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
      },
    ],
  };

  // Dados do gráfico de barras - Consumo Médio do Brasileiro
  const barData = {
    labels: ['Produto A', 'Produto B', 'Produto C', 'Produto D'],
    datasets: [
      {
        label: 'Consumo Médio (kg)',
        data: [3.2, 1.8, 2.5, 4.0],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Permite customizar o tamanho
  };

  return (
    <PageContainer title="Dashboard de Produtos" description="Análise dos produtos e consumo no Brasil">
      <Grid container spacing={2}>
        {/* Card de Produtos Mais Vendidos */}
        <Grid item xs={12} md={6}>
          <DashboardCard title="Produtos Mais Vendidos">
            <div style={{ height: '300px', width: '300px' }}>
              <Doughnut data={doughnutData} options={options} />
            </div>
          </DashboardCard>
        </Grid>

        {/* Card de Produtos Mais Consumidos no Brasil */}
        <Grid item xs={12} md={6}>
          <DashboardCard title="Produtos Mais Consumidos no Brasil">
            <div style={{ height: '300px', width: '100%' }}>
              <Line data={lineData} options={options} />
            </div>
          </DashboardCard>
        </Grid>

        {/* Card de Consumo Médio do Brasileiro */}
        <Grid item xs={12}>
          <DashboardCard title="Consumo Médio do Brasileiro">
            <div style={{ height: '300px', width: '100%' }}>
              <Bar data={barData} options={options} />
            </div>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Shadow;
