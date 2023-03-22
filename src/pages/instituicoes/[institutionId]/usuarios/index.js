import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Grid, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UsersTable } from 'src/sections/users/users-table';
import { applyPagination } from 'src/utils/apply-pagination';
import Link from 'next/link';

const now = new Date();

const data = [
    {
        id: '5e887ac47eed253091be10cb',
        createdAt: subDays(subHours(now, 7), 1).getTime(),
        email: 'carson.darrin@devias.io',
        name: 'Carson Darrin',
        cargo: 'TEACHER'
    },
    {
        id: '5e887b209c28ac3dd97f6db5',
        createdAt: subDays(subHours(now, 1), 2).getTime(),
        email: 'fran.perez@devias.io',
        name: 'Fran Perez',
        cargo: 'MANAGER'
    },
    {
        id: '5e887b7602bdbc4dbb234b27',
        createdAt: subDays(subHours(now, 4), 2).getTime(),
        email: 'jie.yan.song@devias.io',
        name: 'Jie Yan Song',
        cargo: 'TEACHER'
    },
    {
        id: '5e86809283e28b96d2d38537',
        createdAt: subDays(subHours(now, 11), 2).getTime(),
        email: 'anika.visser@devias.io',
        name: 'Anika Visser',
        cargo: 'MANAGER'
    },
    {
        id: '5e86805e2bafd54f66cc95c3',
        createdAt: subDays(subHours(now, 7), 3).getTime(),
        email: 'miron.vitold@devias.io',
        name: 'Miron Vitold',
        cargo: 'TEACHER'
    },
    {
        id: '5e887a1fbefd7938eea9c981',
        createdAt: subDays(subHours(now, 5), 4).getTime(),
        email: 'penjani.inyene@devias.io',
        name: 'Penjani Inyene',
        cargo: 'MANAGER'
    },
    {
        id: '5e887d0b3d090c1b8f162003',
        createdAt: subDays(subHours(now, 15), 4).getTime(),
        email: 'omar.darobe@devias.io',
        name: 'Omar Darobe',
        cargo: 'TEACHER'
    },
    {
        id: '5e88792be2d4cfb4bf0971d9',
        createdAt: subDays(subHours(now, 2), 5).getTime(),
        email: 'siegbert.gottfried@devias.io',
        name: 'Siegbert Gottfried',
        cargo: 'MANAGER'
    },
    {
        id: '5e8877da9a65442b11551975',
        createdAt: subDays(subHours(now, 8), 6).getTime(),
        email: 'iulia.albu@devias.io',
        name: 'Iulia Albu',
        cargo: 'TEACHER'
    },
    {
        id: '5e8680e60cba5019c5ca6fda',
        createdAt: subDays(subHours(now, 1), 9).getTime(),
        email: 'nasimiyu.danai@devias.io',
        name: 'Nasimiyu Danai',
        cargo: 'MANAGER'
    }
];

function handleFilter(filter) {
    let filteredUsers = filter.search ? data.filter(user => user.name.toLowerCase().includes(filter.search.toLowerCase())) : data
    return (filter.cargo != "ALL" ? filteredUsers.filter(user => user.cargo == filter.cargo) : filteredUsers)
}

const useCustomers = (page, rowsPerPage, filter) => {
    return useMemo(
        () => {
            return applyPagination(handleFilter(filter), page, rowsPerPage);
        },
        [page, rowsPerPage, filter]
    );
};

const Page = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filter, setFilter] = useState({ search: "", cargo: "ALL" });
    let customers = useCustomers(page, rowsPerPage, filter)

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
                            count={handleFilter(filter).length}
                            items={customers}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
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
