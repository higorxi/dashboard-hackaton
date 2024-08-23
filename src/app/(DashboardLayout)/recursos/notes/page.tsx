'use client';
import { useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, TablePagination, IconButton } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { ArrowForward } from '@mui/icons-material';

const Notes = () => {
  // Estado para o termo de pesquisa
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para paginação
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Dados da tabela
  const tableData = [
    { lote: '001', sku: 'SK123', latasContratadas: 1000, latasContadas: 950, supervisor: 'João Silva', numeroArea: 'A001' },
    { lote: '002', sku: 'SK456', latasContratadas: 1200, latasContadas: 1150, supervisor: 'Maria Souza', numeroArea: 'A002' },
    { lote: '003', sku: 'SK789', latasContratadas: 1100, latasContadas: 1080, supervisor: 'Carlos Santos', numeroArea: 'A003' },
    { lote: '004', sku: 'SK101', latasContratadas: 1300, latasContadas: 1250, supervisor: 'Ana Oliveira', numeroArea: 'A004' },
    { lote: '005', sku: 'SK102', latasContratadas: 1400, latasContadas: 1380, supervisor: 'Pedro Almeida', numeroArea: 'A005' },
    { lote: '006', sku: 'SK103', latasContratadas: 1500, latasContadas: 1480, supervisor: 'Mariana Lima', numeroArea: 'A006' },
    { lote: '007', sku: 'SK104', latasContratadas: 1600, latasContadas: 1550, supervisor: 'Roberto Costa', numeroArea: 'A007' },
    { lote: '008', sku: 'SK105', latasContratadas: 1700, latasContadas: 1680, supervisor: 'Patrícia Martins', numeroArea: 'A008' },
    { lote: '009', sku: 'SK106', latasContratadas: 1800, latasContadas: 1750, supervisor: 'Ricardo Fernandes', numeroArea: 'A009' },
    { lote: '010', sku: 'SK107', latasContratadas: 1900, latasContadas: 1850, supervisor: 'Juliana Pereira', numeroArea: 'A010' },
    { lote: '011', sku: 'SK108', latasContratadas: 2000, latasContadas: 1950, supervisor: 'Fernanda Costa', numeroArea: 'A011' },
    { lote: '012', sku: 'SK109', latasContratadas: 2100, latasContadas: 2080, supervisor: 'Bruno Silva', numeroArea: 'A012' },
    { lote: '013', sku: 'SK110', latasContratadas: 2200, latasContadas: 2150, supervisor: 'Simone Almeida', numeroArea: 'A013' },
    { lote: '014', sku: 'SK111', latasContratadas: 2300, latasContadas: 2250, supervisor: 'Gustavo Lima', numeroArea: 'A014' },
    { lote: '015', sku: 'SK112', latasContratadas: 2400, latasContadas: 2350, supervisor: 'Sílvia Oliveira', numeroArea: 'A015' },
    { lote: '016', sku: 'SK113', latasContratadas: 2500, latasContadas: 2450, supervisor: 'Ricardo Costa', numeroArea: 'A016' },
    { lote: '017', sku: 'SK114', latasContratadas: 2600, latasContadas: 2550, supervisor: 'Gabriela Martins', numeroArea: 'A017' },
    { lote: '018', sku: 'SK115', latasContratadas: 2700, latasContadas: 2650, supervisor: 'Lucas Silva', numeroArea: 'A018' },
    { lote: '019', sku: 'SK116', latasContratadas: 2800, latasContadas: 2750, supervisor: 'Patrícia Costa', numeroArea: 'A019' },
    { lote: '020', sku: 'SK117', latasContratadas: 2900, latasContadas: 2850, supervisor: 'Renata Almeida', numeroArea: 'A020' },
    { lote: '021', sku: 'SK118', latasContratadas: 3000, latasContadas: 2950, supervisor: 'Thiago Lima', numeroArea: 'A021' },
    { lote: '022', sku: 'SK119', latasContratadas: 3100, latasContadas: 3050, supervisor: 'Juliana Costa', numeroArea: 'A022' },
    { lote: '023', sku: 'SK120', latasContratadas: 3200, latasContadas: 3150, supervisor: 'Eduardo Silva', numeroArea: 'A023' },
    { lote: '024', sku: 'SK121', latasContratadas: 3300, latasContadas: 3250, supervisor: 'Camila Souza', numeroArea: 'A024' },
    { lote: '025', sku: 'SK122', latasContratadas: 3400, latasContadas: 3350, supervisor: 'Marcos Oliveira', numeroArea: 'A025' },
    // Adicione mais dados conforme necessário
  ];
  

  // Função de filtragem
  const filteredData = tableData.filter(row =>
    row.lote.includes(searchTerm) ||
    row.sku.includes(searchTerm) ||
    row.numeroArea.includes(searchTerm)
  );

  // Função para mudar a página
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  // Função para mudar a quantidade de linhas por página
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNavigate = () => {
    window.location.href = `/recursos/losses`;
  };

  return (
    <PageContainer title="Notas" description="Visualize e pesquise notas por área, SKU ou lote">
      <DashboardCard title="Notas">
        <Grid container spacing={3}>
          {/* Campo de Pesquisa */}
          <Grid item xs={12}>
            <TextField
              label="Pesquisar por Área, SKU ou Lote"
              variant="outlined"
              fullWidth
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </Grid>

          {/* Tabela de Notas */}
          <Grid item xs={12}>
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
              <Table aria-label="Tabela de Notas" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Número do Lote</TableCell>
                    <TableCell>Tipo de SKU</TableCell>
                    <TableCell>Valor de Latas Contratadas</TableCell>
                    <TableCell>Valor de Latas Contadas</TableCell>
                    <TableCell>Supervisor da Área</TableCell>
                    <TableCell>Número da Área</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.lote}</TableCell>
                      <TableCell>{row.sku}</TableCell>
                      <TableCell>{row.latasContratadas}</TableCell>
                      <TableCell>{row.latasContadas}</TableCell>
                      <TableCell>{row.supervisor}</TableCell>
                      <TableCell>{row.numeroArea}</TableCell>
                      <IconButton onClick={() => handleNavigate()} aria-label="Acessar">
                          <ArrowForward />
                        </IconButton>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Grid>
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default Notes;
