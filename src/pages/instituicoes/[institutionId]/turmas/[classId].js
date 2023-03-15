import Head from 'next/head';
import { Box, Container, Stack, Typography} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ClassProfileForm } from 'src/sections/classes/classes-profile-form';

const Page = () => (
  <>
    <Head>
      <title>
        Turma | Editar
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
              Editar Turma
            </Typography>
          </div>
          <div>
            <ClassProfileForm
              title={'Formulário'}
              subheader={'Crie um nova turma'}
              method={'PATCH'}
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
