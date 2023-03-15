import Head from 'next/head';
import { Box, Container, Divider, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ClassProfileForm } from 'src/sections/classes/classes-profile-form';

const Page = () => (
  <>
    <Head>
      <title>
        Turma | Criar
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Criar Turma
            </Typography>
          </div>
          <div>
                <Divider style={{margin: '15px 0 15px 0', border: 'none'}}/>

                <ClassProfileForm
                  title={'Formulário'}
                  subheader={'Crie um nova turma'}
                  method={'POST'}
                />
          </div>
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
