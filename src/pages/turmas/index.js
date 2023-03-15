import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from 'src/utils/apply-pagination';
import { ClassesTable } from 'src/sections/classes/classes-table';
import { useRouter } from 'next/navigation';
import { ApiService } from 'src/service/Api';



const useClass = ( data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [data, page, rowsPerPage]
  );
};

const useClassIds = (classes) => {
  return useMemo(
    () => {
      return classes.map((uniqueClass) => uniqueClass.id);
    },
    [classes]
  );
};

const Page = () => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([]);
  const institutionId = 40
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const classes = useClass( data, page, rowsPerPage);
  const classesIds = useClassIds(classes);
  const classesSelection = useSelection(classesIds);

  useEffect(() => {
    ApiService.get(`/institutions/${institutionId}/classes`)
      .then((response) => {setData(response.data)})
  }, [])

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
          Turmas | Conselho de Classe
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
                  Turmas
                </Typography>
              </Stack>
              <div>
                <Button
                  onClick={() => {router.push('/turmas/criar')}}
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
            <ClassesTable
              count={data.length}
              items={classes}
              onDeselectAll={classesSelection.handleDeselectAll}
              onDeselectOne={classesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={classesSelection.handleSelectAll}
              onSelectOne={classesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={classesSelection.selected}
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
