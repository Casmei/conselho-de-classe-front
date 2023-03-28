import Head from 'next/head';
import { Box, Container, Divider, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { StudentProfileForm } from 'src/sections/students/student-profile-form';

const Page = () => (
  <>
    <Head>
      <title>
        Nova nota
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
              Nova nota
            </Typography>
          </div>
          <div>
                <Divider style={{margin: '15px 0 15px 0', border: 'none'}}/>

                <StudentProfileForm
                  title={'[Nome do aluno]'}
                  subheader={'Adicione uma nova nota'}
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
