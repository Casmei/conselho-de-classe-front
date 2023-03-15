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


const data = [
  {
    "createdAt": "2023-03-12T01:00:05.979Z",
    "updatedAt": "2023-03-12T01:00:05.979Z",
    "deletedAt": null,
    "id": "082742f3-5a73-4d6b-86ca-5c36b0c56f50",
    "name": "Georgi Castro",
    "registration": "851",
    "contract": "90",
    "class": {
      "createdAt": "2023-03-12T00:38:37.094Z",
      "updatedAt": "2023-03-12T00:38:37.094Z",
      "deletedAt": null,
      "id": "cb1088c3-60df-4bef-b505-0903939fc3d6",
      "name": "ABC1995"
    },
    "course": {
      "createdAt": "2023-03-12T00:38:37.075Z",
      "updatedAt": "2023-03-12T00:38:37.075Z",
      "deletedAt": null,
      "id": "b5613b09-8a55-43c4-821b-7195af7cacf8",
      "name": "Análise e Desenvolvimento de Sistemas"
    }
  },
  {
    "createdAt": "2023-03-12T01:00:05.979Z",
    "updatedAt": "2023-03-12T01:00:05.979Z",
    "deletedAt": null,
    "id": "f565690f-6d17-441e-9c37-6f481ebaf51f",
    "name": "Elfrieda",
    "registration": "44",
    "contract": "4837",
    "class": {
      "createdAt": "2023-03-12T00:38:37.109Z",
      "updatedAt": "2023-03-12T00:38:37.109Z",
      "deletedAt": null,
      "id": "8490c178-5f39-4f8a-a62a-3b0398dfdc0d",
      "name": "ABC2023"
    },
    "course": {
      "createdAt": "2023-03-12T00:38:37.103Z",
      "updatedAt": "2023-03-12T00:38:37.103Z",
      "deletedAt": null,
      "id": "bccf5721-db82-487c-bba7-4135ae33c2f0",
      "name": "Enfermagem"
    }
  },
  {
    "createdAt": "2023-03-12T01:00:05.979Z",
    "updatedAt": "2023-03-12T01:00:05.979Z",
    "deletedAt": null,
    "id": "ea223901-03a4-4a73-912f-ea0212e8165b",
    "name": "Ferd",
    "registration": "63",
    "contract": "26",
    "class": {
      "createdAt": "2023-03-12T00:38:37.121Z",
      "updatedAt": "2023-03-12T00:38:37.121Z",
      "deletedAt": null,
      "id": "bf83731a-d420-458c-bd22-bda8a5521813",
      "name": "ABC8353"
    },
    "course": {
      "createdAt": "2023-03-12T00:38:37.103Z",
      "updatedAt": "2023-03-12T00:38:37.103Z",
      "deletedAt": null,
      "id": "bccf5721-db82-487c-bba7-4135ae33c2f0",
      "name": "Enfermagem"
    }
  },
  {
    "createdAt": "2023-03-12T01:00:05.979Z",
    "updatedAt": "2023-03-12T01:00:05.979Z",
    "deletedAt": null,
    "id": "e1ab567c-9d78-4586-be0f-f96477aba390",
    "name": "Delmer",
    "registration": "219",
    "contract": "50743",
    "class": {
      "createdAt": "2023-03-12T00:38:37.109Z",
      "updatedAt": "2023-03-12T00:38:37.109Z",
      "deletedAt": null,
      "id": "8490c178-5f39-4f8a-a62a-3b0398dfdc0d",
      "name": "ABC2023"
    },
    "course": {
      "createdAt": "2023-03-12T00:38:37.103Z",
      "updatedAt": "2023-03-12T00:38:37.103Z",
      "deletedAt": null,
      "id": "bccf5721-db82-487c-bba7-4135ae33c2f0",
      "name": "Enfermagem"
    }
  },
  {
    "createdAt": "2023-03-12T01:00:05.979Z",
    "updatedAt": "2023-03-12T01:00:05.979Z",
    "deletedAt": null,
    "id": "1630460a-207f-40e4-9d52-8e6c8a10bcab",
    "name": "Waly",
    "registration": "40532",
    "contract": "39438",
    "class": {
      "createdAt": "2023-03-12T00:38:37.138Z",
      "updatedAt": "2023-03-12T00:38:37.138Z",
      "deletedAt": null,
      "id": "b007875d-fffb-442c-a186-a553cfb61810",
      "name": "ABC2021"
    },
    "course": {
      "createdAt": "2023-03-12T00:38:37.134Z",
      "updatedAt": "2023-03-12T00:38:37.134Z",
      "deletedAt": null,
      "id": "346bda4a-7ac0-4cd8-9a63-97214132d733",
      "name": "Processos Gerênciais"
    }
  },
  {
    "createdAt": "2023-03-12T01:00:05.979Z",
    "updatedAt": "2023-03-12T01:00:05.979Z",
    "deletedAt": null,
    "id": "7be90bb0-4d7d-478d-a6fd-c520368c5933",
    "name": "Darbee",
    "registration": "6711",
    "contract": "2",
    "class": {
      "createdAt": "2023-03-12T00:38:37.121Z",
      "updatedAt": "2023-03-12T00:38:37.121Z",
      "deletedAt": null,
      "id": "bf83731a-d420-458c-bd22-bda8a5521813",
      "name": "ABC8353"
    },
    "course": {
      "createdAt": "2023-03-12T00:38:37.143Z",
      "updatedAt": "2023-03-12T00:38:37.143Z",
      "deletedAt": null,
      "id": "44379109-4480-47a2-ac23-673b635d600b",
      "name": "Engenharia de Software"
    }
  },
  {
    "createdAt": "2023-03-12T01:00:05.979Z",
    "updatedAt": "2023-03-12T01:00:05.979Z",
    "deletedAt": null,
    "id": "b4a5590e-ea46-46ad-b72a-1f66be98b73f",
    "name": "Carmelle",
    "registration": "85",
    "contract": "6",
    "class": {
      "createdAt": "2023-03-12T00:38:37.138Z",
      "updatedAt": "2023-03-12T00:38:37.138Z",
      "deletedAt": null,
      "id": "b007875d-fffb-442c-a186-a553cfb61810",
      "name": "ABC2021"
    },
    "course": {
      "createdAt": "2023-03-12T00:38:37.075Z",
      "updatedAt": "2023-03-12T00:38:37.075Z",
      "deletedAt": null,
      "id": "b5613b09-8a55-43c4-821b-7195af7cacf8",
      "name": "Análise e Desenvolvimento de Sistemas"
    }
  },
  {
    "name": "Tiago",
    "registration": "1245",
    "class": "a76ed6a2-898e-4b19-93fa-fd8a3c021972",
    "course": "3e49f80d-a08b-4ff6-be7b-c8d6333d22f0",
    "institutionId": "40",
    "id": "kDgK5Fk"
  }
]

const useStudent = ( 
  // data,
  page,
  rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
    // [data, page, rowsPerPage]
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
  const [data, setData] = useState([]);
  const institutionId = 40
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const students = useStudent(
    // data,
    page,
    rowsPerPage
  );
  const studentsIds = useStudentIds(students);
  const studentsSelection = useSelection(studentsIds);

  // useEffect(() => {
  //   ApiService.get(`/institutions/${institutionId}/students`)
  //     .then((response) => {setData(response.data)})
  // }, [])

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
