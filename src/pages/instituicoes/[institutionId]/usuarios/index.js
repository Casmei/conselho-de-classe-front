import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Grid, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UsersTable } from 'src/sections/users/users-table';
import { applyPagination } from 'src/utils/apply-pagination';
import Link from 'next/link';
import { ApiService } from 'src/service/Api';
import { useRouter } from 'next/router';

const now = new Date();

function handleFilter(filter, data) {
  let filteredUsers = filter.search ? data.filter(user => user.name.toLowerCase().includes(filter.search.toLowerCase())) : data
  return (filter.cargo != "ALL" ? filteredUsers.filter(user => user.cargo == filter.cargo) : filteredUsers)
}

const useCustomers = (page, rowsPerPage, filter, data) => {
  return useMemo(
    () => {
      return applyPagination(handleFilter(filter, data), page, rowsPerPage);
    },
    [page, rowsPerPage, filter, data]
  );
};
    
const Page = ({ data }) => {
  console.log(data);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filter, setFilter] = useState({ search: "", cargo: "ALL" });
    let customers = useCustomers(page, rowsPerPage, filter, data);
    const router = useRouter();

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

    const handleFilterChange = useCallback(
        ({ search, cargo }) => {
            setFilter({ search, cargo })
            setPage(0)
        }
    )

    return (
        <>
            <Head>
                <title>
                    Usuários
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
                                    Usuários
                                </Typography>
                            </Stack>
                            <div>
                                <Link href={`${location.pathname}/convidar`}>
                                    <Button
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <PlusIcon />
                                            </SvgIcon>
                                        )}
                                        variant="contained"
                                    >
                                        Convidar
                                    </Button>
                                </Link>
                            </div>
                        </Stack>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <TextField
                                fullWidth
                                label="Pesquisar"
                                name="search"
                                onChange={event => {
                                    handleFilterChange({ ...filter, search: event.target.value })
                                }}
                                value={filter.search}
                            />
                            <TextField
                                fullWidth
                                label="Selecionar Curso"
                                name="cargo"
                                onChange={event => {
                                    handleFilterChange({ ...filter, cargo: event.target.value })
                                }}
                                select
                                SelectProps={{ native: true }}
                                value={filter.cargo}
                            >
                                <option value="ALL">
                                    Todos
                                </option>
                                <option value="MANAGER">
                                    Gestor
                                </option>
                                <option value="TEACHER">
                                    Professor
                                </option>
                            </TextField>
                        </div>
                        <UsersTable
                            count={handleFilter(filter, data).length}
                            items={customers}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            editPath={router.asPath}
                        />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export async function getServerSideProps(context) {
  const token = context.req.cookies['Token'];

  const response = await ApiService.get('/users', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return { props: { data: response.data } }
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
