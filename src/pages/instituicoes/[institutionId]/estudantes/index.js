import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Grid, Modal, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from 'src/utils/apply-pagination';
import { StudentsTable } from 'src/sections/students/student-table';
import { StudentProfileDetails } from 'src/components/ProfileDetails/StudentProfileDetails';
import { useRouter } from 'next/navigation';
import { ApiService } from 'src/service/Api';



const useStudent = ( data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [data, page, rowsPerPage]
  );
};

const useStudentIds = (students) => {
  return useMemo(
    () => {
      return students.map((student) => student.id);
    },
    [students]
  );
};

const Page = () => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([]);
  const institutionId = 40
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const students = useStudent( data, page, rowsPerPage);
  const studentsIds = useStudentIds(students);
  const studentsSelection = useSelection(studentsIds);

  useEffect(() => {
    ApiService.get(`/institutions/${institutionId}/students`)
      .then((response) => {setData(response.data)})
  }, [])

  const handleFileUpload = (e) => {
    if(!e.target.files) {
      return;
    }

    const file = e.target.files[0];


    try {
      ApiService.post(`/institutions/${institutionId}/students`, file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      router.refresh()
    } catch (error) {
      
    }
  }

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Alunos | Conselho de Classe
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Alunos
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    component="label"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Importar
                    <input
                      type="file"
                      accept=".csv"
                      hidden
                      onChange={handleFileUpload}
                    />
                  </Button> 
                  <Button
                    disabled
                    color="inherit"
                    type=''
                    startIcon={(
                      <SvgIcon fontSize="small">
                        
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                   Exportar
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  onClick={() => {router.push('/instituicoes/40/estudantes/criar')}}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Adicionar
                </Button>
              </div>
            </Stack>
            <StudentsTable
              count={data.length}
              items={students}
              onDeselectAll={studentsSelection.handleDeselectAll}
              onDeselectOne={studentsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={studentsSelection.handleSelectAll}
              onSelectOne={studentsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={studentsSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
