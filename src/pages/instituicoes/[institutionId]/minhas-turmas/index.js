import { useState } from 'react';
import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ClassCard } from 'src/sections/companies/class-card';
import { CompaniesSearch } from 'src/sections/companies/companies-search';

const classes = [
  {
    "createdAt": "2023-03-02T19:33:33.362Z",
    "updatedAt": "2023-03-02T19:33:33.362Z",
    "deletedAt": null,
    "id": "0e73bbd8-c2ee-4213-b509-b5e4e9756506",
    "name": "ABC1995"
  },
  {
    "createdAt": "2023-03-02T19:33:33.388Z",
    "updatedAt": "2023-03-02T19:33:33.388Z",
    "deletedAt": null,
    "id": "7b4160e3-189f-4915-add9-136289c67c7a",
    "name": "ABC8353"
  },
  {
    "createdAt": "2023-03-02T19:33:33.405Z",
    "updatedAt": "2023-03-02T19:33:33.405Z",
    "deletedAt": null,
    "id": "99b0903b-fad0-4628-9457-4be1fe438f39",
    "name": "ABC2021"
  },
  {
    "createdAt": "2023-03-02T19:33:33.432Z",
    "updatedAt": "2023-03-02T19:33:33.432Z",
    "deletedAt": null,
    "id": "a76ed6a2-898e-4b19-93fa-fd8a3c021972",
    "name": "ABC2453"
  },
  {
    "createdAt": "2023-03-02T19:33:33.461Z",
    "updatedAt": "2023-03-02T19:33:33.461Z",
    "deletedAt": null,
    "id": "da4b52ef-892f-4e05-9d8b-decaa8802272",
    "name": "ABC2022"
  },
  {
    "createdAt": "2023-03-06T11:56:29.577Z",
    "updatedAt": "2023-03-06T11:56:29.577Z",
    "deletedAt": null,
    "id": "f475eb22-44b7-4e21-b965-06113bbf01f5",
    "name": "ADS2023"
  }
];

const Page = () => (
  <>
    <Head>
      <title>
        Minhas Turmas
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
          </Stack>
          <Grid
            container
            spacing={3}
          >
            {classes.map((classe) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                key={classe.id}
              >
                <ClassCard classe={classe} />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Pagination
              count={1}
              size="small"
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;