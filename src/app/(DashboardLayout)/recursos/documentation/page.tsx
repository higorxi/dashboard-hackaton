'use client';
import { useState } from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  TablePagination,
  IconButton,
  Modal,
  Box,
  Tooltip
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import XmlIcon from '@mui/icons-material/Code'; // Substitua por um ícone adequado para XML
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

const DocumentationPage = () => {
  // Estado para o termo de pesquisa
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para paginação
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Estado para o modal
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // Dados da tabela
  const tableData = [
    { lote: '001', sku: 'SK123', latasContratadas: 1000, latasContadas: 950, supervisor: 'João Silva', numeroArea: 'A001', pdf: '/docs/001.pdf', xml: '/docs/001.xml' },
    { lote: '002', sku: 'SK456', latasContratadas: 1200, latasContadas: 1150, supervisor: 'Maria Souza', numeroArea: 'A002', pdf: '/docs/002.pdf', xml: '/docs/002.xml' },
    { lote: '003', sku: 'SK789', latasContratadas: 1100, latasContadas: 1080, supervisor: 'Carlos Santos', numeroArea: 'A003', pdf: '/docs/003.pdf', xml: '/docs/003.xml' },
    { lote: '004', sku: 'SK101', latasContratadas: 1300, latasContadas: 1250, supervisor: 'Ana Oliveira', numeroArea: 'A004', pdf: '/docs/004.pdf', xml: '/docs/004.xml' },
    { lote: '005', sku: 'SK102', latasContratadas: 1400, latasContadas: 1380, supervisor: 'Pedro Almeida', numeroArea: 'A005', pdf: '/docs/005.pdf', xml: '/docs/005.xml' },
    { lote: '006', sku: 'SK103', latasContratadas: 1500, latasContadas: 1480, supervisor: 'Mariana Lima', numeroArea: 'A006', pdf: '/docs/006.pdf', xml: '/docs/006.xml' },
    { lote: '007', sku: 'SK104', latasContratadas: 1600, latasContadas: 1550, supervisor: 'Roberto Costa', numeroArea: 'A007', pdf: '/docs/007.pdf', xml: '/docs/007.xml' },
    { lote: '008', sku: 'SK105', latasContratadas: 1700, latasContadas: 1680, supervisor: 'Patrícia Martins', numeroArea: 'A008', pdf: '/docs/008.pdf', xml: '/docs/008.xml' },
    { lote: '009', sku: 'SK106', latasContratadas: 1800, latasContadas: 1750, supervisor: 'Ricardo Fernandes', numeroArea: 'A009', pdf: '/docs/009.pdf', xml: '/docs/009.xml' },
    { lote: '010', sku: 'SK107', latasContratadas: 1900, latasContadas: 1850, supervisor: 'Juliana Pereira', numeroArea: 'A010', pdf: '/docs/010.pdf', xml: '/docs/010.xml' },
    { lote: '011', sku: 'SK108', latasContratadas: 2000, latasContadas: 1950, supervisor: 'Fernanda Costa', numeroArea: 'A011', pdf: '/docs/011.pdf', xml: '/docs/011.xml' },
    { lote: '012', sku: 'SK109', latasContratadas: 2100, latasContadas: 2080, supervisor: 'Bruno Silva', numeroArea: 'A012', pdf: '/docs/012.pdf', xml: '/docs/012.xml' },
    { lote: '013', sku: 'SK110', latasContratadas: 2200, latasContadas: 2150, supervisor: 'Simone Almeida', numeroArea: 'A013', pdf: '/docs/013.pdf', xml: '/docs/013.xml' },
    { lote: '014', sku: 'SK111', latasContratadas: 2300, latasContadas: 2250, supervisor: 'Gustavo Lima', numeroArea: 'A014', pdf: '/docs/014.pdf', xml: '/docs/014.xml' },
    { lote: '015', sku: 'SK112', latasContratadas: 2400, latasContadas: 2350, supervisor: 'Sílvia Oliveira', numeroArea: 'A015', pdf: '/docs/015.pdf', xml: '/docs/015.xml' },
    { lote: '016', sku: 'SK113', latasContratadas: 2500, latasContadas: 2480, supervisor: 'Luiz Santos', numeroArea: 'A016', pdf: '/docs/016.pdf', xml: '/docs/016.xml' },
    { lote: '017', sku: 'SK114', latasContratadas: 2600, latasContadas: 2550, supervisor: 'Julia Almeida', numeroArea: 'A017', pdf: '/docs/017.pdf', xml: '/docs/017.xml' },
    { lote: '018', sku: 'SK115', latasContratadas: 2700, latasContadas: 2650, supervisor: 'Eduardo Costa', numeroArea: 'A018', pdf: '/docs/018.pdf', xml: '/docs/018.xml' },
    { lote: '019', sku: 'SK116', latasContratadas: 2800, latasContadas: 2750, supervisor: 'Laura Rodrigues', numeroArea: 'A019', pdf: '/docs/019.pdf', xml: '/docs/019.xml' },
    { lote: '020', sku: 'SK117', latasContratadas: 2900, latasContadas: 2850, supervisor: 'Marcelo Silva', numeroArea: 'A020', pdf: '/docs/020.pdf', xml: '/docs/020.xml' },
    { lote: '021', sku: 'SK118', latasContratadas: 3000, latasContadas: 2950, supervisor: 'Tatiane Ferreira', numeroArea: 'A021', pdf: '/docs/021.pdf', xml: '/docs/021.xml' },
    { lote: '022', sku: 'SK119', latasContratadas: 3100, latasContadas: 3050, supervisor: 'Guilherme Oliveira', numeroArea: 'A022', pdf: '/docs/022.pdf', xml: '/docs/022.xml' },
    { lote: '023', sku: 'SK120', latasContratadas: 3200, latasContadas: 3150, supervisor: 'Aline Martins', numeroArea: 'A023', pdf: '/docs/023.pdf', xml: '/docs/023.xml' },
    { lote: '024', sku: 'SK121', latasContratadas: 3300, latasContadas: 3250, supervisor: 'Renato Almeida', numeroArea: 'A024', pdf: '/docs/024.pdf', xml: '/docs/024.xml' },
    { lote: '025', sku: 'SK122', latasContratadas: 3400, latasContadas: 3350, supervisor: 'Priscila Costa', numeroArea: 'A025', pdf: '/docs/025.pdf', xml: '/docs/025.xml' },
    { lote: '026', sku: 'SK123', latasContratadas: 3500, latasContadas: 3450, supervisor: 'Felipe Souza', numeroArea: 'A026', pdf: '/docs/026.pdf', xml: '/docs/026.xml' },
    { lote: '027', sku: 'SK124', latasContratadas: 3600, latasContadas: 3550, supervisor: 'Beatriz Lima', numeroArea: 'A027', pdf: '/docs/027.pdf', xml: '/docs/027.xml' },
    { lote: '028', sku: 'SK125', latasContratadas: 3700, latasContadas: 3650, supervisor: 'Igor Santos', numeroArea: 'A028', pdf: '/docs/028.pdf', xml: '/docs/028.xml' },
    { lote: '029', sku: 'SK126', latasContratadas: 3800, latasContadas: 3750, supervisor: 'Carla Rodrigues', numeroArea: 'A029', pdf: '/docs/029.pdf', xml: '/docs/029.xml' },
    { lote: '030', sku: 'SK127', latasContratadas: 3900, latasContadas: 3850, supervisor: 'Rodrigo Ferreira', numeroArea: 'A030', pdf: '/docs/030.pdf', xml: '/docs/030.xml' },
    { lote: '031', sku: 'SK128', latasContratadas: 4000, latasContadas: 3950, supervisor: 'Vanessa Almeida', numeroArea: 'A031', pdf: '/docs/031.pdf', xml: '/docs/031.xml' },
    { lote: '032', sku: 'SK129', latasContratadas: 4100, latasContadas: 4050, supervisor: 'Thiago Oliveira', numeroArea: 'A032', pdf: '/docs/032.pdf', xml: '/docs/032.xml' },
    { lote: '033', sku: 'SK130', latasContratadas: 4200, latasContadas: 4150, supervisor: 'Daniela Martins', numeroArea: 'A033', pdf: '/docs/033.pdf', xml: '/docs/033.xml' },
    { lote: '034', sku: 'SK131', latasContratadas: 4300, latasContadas: 4250, supervisor: 'André Costa', numeroArea: 'A034', pdf: '/docs/034.pdf', xml: '/docs/034.xml' },
    { lote: '035', sku: 'SK132', latasContratadas: 4400, latasContadas: 4350, supervisor: 'Sabrina Silva', numeroArea: 'A035', pdf: '/docs/035.pdf', xml: '/docs/035.xml' },
    { lote: '036', sku: 'SK133', latasContratadas: 4500, latasContadas: 4450, supervisor: 'Leonardo Lima', numeroArea: 'A036', pdf: '/docs/036.pdf', xml: '/docs/036.xml' },
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

  // Função para abrir o modal com o conteúdo
  const handleOpenModal = (contentUrl: string) => {
    setModalContent(contentUrl);
    setOpenModal(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setModalContent('');
  };

  return (
    <PageContainer title="Documentação de Perdas" description="Visualize os dados detalhados de perdas por lote, SKU e área">
      <Grid container spacing={3}>
        {/* Área de Documentação */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Documentação de Perdas
          </Typography>
          <Typography variant="body1" paragraph>
            Este painel fornece uma visão detalhada das perdas ocorridas durante o processo produtivo. Utilize as informações apresentadas para monitorar e analisar a eficiência da produção e identificar áreas para melhorias.
          </Typography>
          <Typography variant="body1" paragraph>
            Os dados incluem o número do lote, tipo de SKU, quantidade de latas contratadas e contadas, supervisor responsável e número da área. Utilize a barra de pesquisa para filtrar os dados conforme necessário.
          </Typography>
        </Grid>

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

        {/* Tabela de Lotes */}
        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table aria-label="Tabela de Lotes" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Número do Lote</TableCell>
                  <TableCell>Tipo de SKU</TableCell>
                  <TableCell>Valor de Latas Contratadas</TableCell>
                  <TableCell>Valor de Latas Contadas</TableCell>
                  <TableCell>Supervisor da Área</TableCell>
                  <TableCell>Número da Área</TableCell>
                  <TableCell>Documentação</TableCell> {/* Nova coluna para ícones */}
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
                    <TableCell>
                      {/* Ícones de visualização para PDF e XML */}
                      <Tooltip title="Visualizar PDF">
                        <IconButton onClick={() => handleOpenModal(row.pdf)} aria-label="Visualizar PDF">
                          <PictureAsPdfIcon color="error" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Visualizar XML">
                        <IconButton onClick={() => handleOpenModal(row.xml)} aria-label="Visualizar XML">
                          <XmlIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
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

      {/* Modal para visualizar PDF e XML */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            overflow: 'auto'
          }}
        >
          <iframe
            src={modalContent}
            style={{ width: '100%', height: '100%' }}
            frameBorder="0"
          />
        </Box>
      </Modal>
    </PageContainer>
  );
};

export default DocumentationPage;
