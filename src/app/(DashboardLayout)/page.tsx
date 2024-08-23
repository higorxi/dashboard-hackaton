'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
import RecentTransactions from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions';
import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';
import DashboardCard from './components/shared/DashboardCard';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';

// Registrar os elementos necessários do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const Dashboard = () => {
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

  const options = {
    maintainAspectRatio: false, 
  };

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
            <Box mt={3}>
              <DashboardCard title="Produtos Mais Vendidos">
                <div style={{ height: '300px' }}>
                  <Doughnut data={doughnutData} options={options} />
                </div>
              </DashboardCard>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3} direction="column">
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
              <Grid item xs={12}>
                <RecentTransactions />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

export default Dashboard;
