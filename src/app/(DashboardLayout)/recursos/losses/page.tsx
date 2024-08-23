'use client';
import { useRef, useState } from 'react';
import { Grid, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import htmlToImage from 'html-to-image';
import { parse } from 'json2csv';

// Dados de exemplo
const dataDay = [{ name: 'Dia', perda: 11367, producao: 884540 }];

const dataMonth = [{ name: 'Mês', perda: 311144, producao: 26536188 }];

const dataYear = [{ name: 'Ano', perda: 4091940, producao: 318434256 }];

const dataLossTypes = [
  { name: 'Mal Cheia (Rejeitadas)', perda: 186522 },
  { name: 'Rejeitadas Stratec 1', perda: 101400 },
  { name: 'Rejeitadas Stratec 2', perda: 23222 },
  { name: 'CRASH', perda: 29851 },
];

// Datas das últimas atualizações
const lastUpdateDay = '22/08/2024';
const lastUpdateMonth = '22/08/2024';
const lastUpdateYear = '22/08/2024';
const lastUpdateLossTypes = '22/08/2024';

type ChartType = 'day' | 'month' | 'year' | 'lossTypes';

const Losses = () => {
  const chartRefs = {
    day: useRef<HTMLDivElement>(null),
    month: useRef<HTMLDivElement>(null),
    year: useRef<HTMLDivElement>(null),
    lossTypes: useRef<HTMLDivElement>(null),
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentChart, setCurrentChart] = useState<ChartType | null>(null);

  const openMenu = (event: React.MouseEvent<HTMLElement>, chartType: ChartType) => {
    setAnchorEl(event.currentTarget);
    setCurrentChart(chartType);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const downloadImage = async (fileName: string) => {
    if (currentChart && chartRefs[currentChart]?.current) {
      try {
        const dataUrl = await htmlToImage.toPng(chartRefs[currentChart].current, {
          backgroundColor: '#ffffff', // Define a cor de fundo branca para evitar fundo transparente
        });
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = fileName;
        document.body.appendChild(link); // Necessário para alguns navegadores
        link.click();
        document.body.removeChild(link); // Remove o link após o download
      } catch (error) {
        console.error('Erro ao gerar imagem:', error);
      }
    }
    closeMenu();
  };

  const downloadCsv = (data: any, fileName: string) => {
    try {
      const csv = parse(data);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error('Erro ao gerar CSV:', error);
    }
    closeMenu();
  };

  return (
    <PageContainer title="Dashboard de Perdas e Produção" description="Visualize as informações de produção e perdas">
      {/* Dashboard 1: Produção e Perdas por Período */}
      <DashboardCard title="Produção e Perdas por Período">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" align="center">
              Produção e Perdas - Dia
            </Typography>
            <Typography variant="caption" align="center" display="block">
              Última atualização: {lastUpdateDay}
            </Typography>
            <IconButton onClick={(event) => openMenu(event, 'day')}>
              <DownloadIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
              <MenuItem onClick={() => downloadImage('grafico-dia.png')}>Baixar PNG</MenuItem>
              <MenuItem onClick={() => downloadCsv(dataDay, 'dados-dia.csv')}>Baixar CSV</MenuItem>
            </Menu>
            <ResponsiveContainer width="100%" height={300} ref={chartRefs.day}>
              <BarChart data={dataDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value: any, name: string) => {
                    // Verifica se o valor é um número antes de formatar
                    const formattedValue =
                      typeof value === 'number' || typeof value === 'bigint'
                        ? new Intl.NumberFormat('pt-BR').format(value)
                        : value;
                    return [formattedValue, name];
                  }}
                />
                <Legend />
                <Bar dataKey="perda" fill="#ff7300" name="Perdas" />
                <Bar dataKey="producao" fill="#387908" name="Produção" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" align="center">
              Produção e Perdas - Mês
            </Typography>
            <Typography variant="caption" align="center" display="block">
              Última atualização: {lastUpdateMonth}
            </Typography>
            <IconButton onClick={(event) => openMenu(event, 'month')}>
              <DownloadIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
              <MenuItem onClick={() => downloadImage('grafico-mes.png')}>Baixar PNG</MenuItem>
              <MenuItem onClick={() => downloadCsv(dataMonth, 'dados-mes.csv')}>Baixar CSV</MenuItem>
            </Menu>
            <ResponsiveContainer width="100%" height={300} ref={chartRefs.month}>
              <BarChart data={dataMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value: any, name: string) => {
                    // Verifica se o valor é um número antes de formatar
                    const formattedValue =
                      typeof value === 'number' || typeof value === 'bigint'
                        ? new Intl.NumberFormat('pt-BR').format(value)
                        : value;
                    return [formattedValue, name];
                  }}
                />
                <Legend />
                <Bar dataKey="perda" fill="#ff7300" name="Perdas" />
                <Bar dataKey="producao" fill="#387908" name="Produção" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" align="center">
              Produção e Perdas - Ano
            </Typography>
            <Typography variant="caption" align="center" display="block">
              Última atualização: {lastUpdateYear}
            </Typography>
            <IconButton onClick={(event) => openMenu(event, 'year')}>
              <DownloadIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
              <MenuItem onClick={() => downloadImage('grafico-ano.png')}>Baixar PNG</MenuItem>
              <MenuItem onClick={() => downloadCsv(dataYear, 'dados-ano.csv')}>Baixar CSV</MenuItem>
            </Menu>
            <ResponsiveContainer width="100%" height={300} ref={chartRefs.year}>
              <BarChart data={dataYear}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value: any, name: string) => {
                    // Verifica se o valor é um número antes de formatar
                    const formattedValue =
                      typeof value === 'number' || typeof value === 'bigint'
                        ? new Intl.NumberFormat('pt-BR').format(value)
                        : value;
                    return [formattedValue, name];
                  }}
                />
                <Legend />
                <Bar dataKey="perda" fill="#ff7300" name="Perdas" />
                <Bar dataKey="producao" fill="#387908" name="Produção" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </DashboardCard>

      {/* Dashboard 2: Tipos de Perda */}
      <DashboardCard title="Tipos de Perda">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              Tipos de Perda
            </Typography>
            <Typography variant="caption" align="center" display="block">
              Última atualização: {lastUpdateLossTypes}
            </Typography>
            <IconButton onClick={(event) => openMenu(event, 'lossTypes')}>
              <DownloadIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
              <MenuItem onClick={() => downloadImage('grafico-tipos-perda.png')}>Baixar PNG</MenuItem>
              <MenuItem onClick={() => downloadCsv(dataLossTypes, 'dados-tipos-perda.csv')}>Baixar CSV</MenuItem>
            </Menu>
            <ResponsiveContainer width="100%" height={300} ref={chartRefs.lossTypes}>
              <BarChart data={dataLossTypes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value: any, name: string) => {
                    // Verifica se o valor é um número antes de formatar
                    const formattedValue =
                      typeof value === 'number' || typeof value === 'bigint'
                        ? new Intl.NumberFormat('pt-BR').format(value)
                        : value;
                    return [formattedValue, name];
                  }}
                />
                <Legend />
                <Bar dataKey="perda" fill="#ff7300" name="Perdas" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default Losses;
