import Head from 'next/head';
import { Box, Container, Divider, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { StudentProfileForm } from 'src/sections/students/student-profile-form';
import { Form } from 'src/components/Form';
import { ApiService } from 'src/service/Api';
import { useRouter } from 'next/router';

const Page = ({ courses, classes }) =>  {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          Estudante | Criar
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
                Criar Estudante
              </Typography>
            </div>
            <div>
              <Divider style={{margin: '15px 0 15px 0', border: 'none'}}/>

              {/* <StudentProfileForm
                title={'Formulário'}
                subheader={'Crie um novo estudante'}
                method={'POST'}
                instanceId={router.query.instanceId}
              /> */}
              <Form
                title={'Formulário'}
                subTitle={'Crie um novo estudante'}
                courses={courses}
                classes={classes}
              />
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  const token = context.req.cookies['Token'];
  const institutionId = context.query.institutionId;
  const courses = await ApiService.get(`/courses`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.data);

  const classes = await ApiService.get(`/institutions/${institutionId}/classes`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.data);

  return { props: { courses, classes } };
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
