import Head from 'next/head';
import { Box, Container, Divider, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { StudentProfile } from 'src/sections/students/student-profile';
import { StudentProfileForm } from 'src/sections/students/student-profile-form';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ApiService } from 'src/service/Api';


const Page = () => {
  const router = useRouter()
  const { institutionId, studentId } = router.query
  const [data, setData] = useState({});


  useEffect(() => {
    if(institutionId && studentId) {
      ApiService.get(`institutions/${institutionId}/students/${studentId}`)
      .then((response) => setData(response.data))
    }
  }, [])

  return (
    <>
    <Head>
      <title>
        Estudante | Editar
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
              Editar Estudante
            </Typography>
          </div>
          <div>

                <StudentProfile data={data} />

                <Divider style={{margin: '15px 0 15px 0', border: 'none'}}/>

                <StudentProfileForm
                  title={'Formulário'}
                  subheader={'Crie um novo estudante'}
                  method={'PATCH'}

                />

          </div>
        </Stack>
      </Container>
    </Box>
  </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
