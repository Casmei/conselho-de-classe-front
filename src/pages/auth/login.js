import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  Radio
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { useApi } from '../../service/Api';
import AddIcon from '@mui/icons-material/Add';
import { useAuthContext } from 'src/contexts/auth-context';

const Page = () => {
  const router = useRouter();
  const [institutions, setInstitutions] = useState(null);
  const [message, setMessage] = useState(false);
  const auth = useAuth();
  const [method, setMethod] = useState('email');
  const ApiService = useApi();
  const context = useAuthContext();
  const formik = useFormik({
    initialValues: {
      email: 'matheus@protonmail.com',
      password: '123456789',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.signIn(values.email, values.password);
        ApiService.getInstitutions()
          .then(res => setInstitutions(res));
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });
  
  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Login
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: institutions === null ? 'flex' : 'none',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Login
              </Typography>
              
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Don&apos;t have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            </Stack>
            <Tabs
              onChange={handleMethodChange}
              sx={{ mb: 3 }}
              value={method}
            >
              <Tab
                label="Email"
                value="email"
              />
              <Tab
                label="Phone Number"
                value="phoneNumber"
              />
            </Tabs>
            {method === 'email' && (
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                <FormHelperText sx={{ mt: 1 }}>
                  Optionally you can skip.
                </FormHelperText>
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Continue
                </Button>
                <Alert
                  color="primary"
                  severity="info"
                  sx={{ mt: 3 }}
                >
                  <div>
                    You can use <b>demo@devias.io</b> and password <b>Password123!</b>
                  </div>
                </Alert>
              </form>
            )}
            {method === 'phoneNumber' && (
              <div>
                <Typography
                  sx={{ mb: 1 }}
                  variant="h6"
                >
                  Not available in the demo
                </Typography>
                <Typography color="text.secondary">
                  To prevent unnecessary costs we disabled this feature in the demo.
                </Typography>
              </div>
            )}
          </div>
        </Box>
      </Box>
      {institutions !== null && (
        institutions.length ? (
          <Box>
            <DataGrid
              rows={
                institutions ? institutions.map(institution => (
                  { id: institution.id, name: institution.name, owner: institution.userOwner.name }
                )) : {}
              }
              columns={[
                { field: 'name', headerName: 'Nome', width: 600 },
                { field: 'owner', headerName: 'Gestor', width: 300 }
              ]}
              getRowId={row => row?.id}
              checkboxSelection
              onRowSelectionModelChange={item => {
                item.length >= 1 ?
                  context.setUserPayload(item[0]) :
                  setMessage(true);
              }}
              sx={{
                marginInline: 'auto',
                marginTop: '8em'
              }}
            />
            <p style={{ display: message ? 'inline' : 'none' }} >Selecione apenas uma Instituição</p>
          </Box>
        ) : (
          <Box
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              width: '50vw',
              mt: '12rem'
            }}
          >
            <Box
              sx={{ 
                width: 'inherit',
                display: 'flex',
                justifyContent: 'end'
              }}
            >
              <Button
                sx={{ 
                  backgroundColor: '#e8eaf6',
                  borderRadius: '20px',
                  width: '12rem',
                  mb: '3em',
                  mr: '2em'
                }}
              >
                Entrar com Código
              </Button>
            </Box>
            <Button
              fullWidth
              size="large"
              sx={{
                mt: 3,
                width: '20rem',
                margin: 'auto',
              }}
              variant="contained"
            >
              <AddIcon />
              Cadastrar Instituição
            </Button>
          </Box>
        )
      )}
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
