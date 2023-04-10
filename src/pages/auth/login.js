import { useCallback, useState, useEffect, createContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
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
  Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { useApi } from '../../service/Api';
import AddIcon from '@mui/icons-material/Add';
import { useAuthContext } from 'src/contexts/auth-context';
import Modal from '../../components/modal.jsx';
import styles from '../../styles/institutions/userInstitutionPage.module.scss';

export const ModalContext = createContext([]);

const Page = () => {
  const [institutions, setInstitutions] = useState(null);
  const [message, setMessage] = useState(false);
  const [modal, setModal] = useState(false);
  const [method, setMethod] = useState('email');
  const [rows, setRows] = useState(institutions);
  const [registerModal, setRegisterModal] = useState(false);

  const auth = useAuth();
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

  console.log(rows);
  
  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );

  useEffect(() => {
    console.log('rodei');
    setRows(institutions?.map(institution => (
      { id: institution.id, name: institution.name, owner: institution.userOwner.name }
    )));
  }, [institutions]);

  return (
    <>
      <Head>
        <title>
          Login
        </title>
      </Head>
      <Box
        sx={{
          display: institutions ? 'block' : 'flex',
          flex: '1 1 auto',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        className={modal || registerModal ? styles.pageContent : ''}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%',
            display: institutions === null ? 'flex' : 'none',
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
        {institutions !== null && (
          institutions.length ? (
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  marginTop: '6rem'
                }}
              >
                <Button
                  sx={{ 
                    backgroundColor: '#e8eaf6',
                    borderRadius: '20px',
                    width: '12rem',
                    mb: '3em',
                    mr: '2em',
                    opacity: modal ? '0.4' : '1'
                  }}
                  onClick={() => setModal(true)}
                >
                  Entrar com Código
                </Button>
                {modal && (
                  <ModalContext.Provider value={[modal, setModal, setInstitutions]}>
                    <Modal />
                  </ModalContext.Provider>
                )}
              </Box>
              <DataGrid
                rows={rows ?? []}
                columns={[
                  { field: 'name', headerName: 'Nome', width: 600 },
                  { field: 'owner', headerName: 'Gestor', width: 300 }
                ]}
                getRowId={row => row.id}
                checkboxSelection
                autoHeight
                onRowSelectionModelChange={item => {
                  item.length >= 1 ?
                    context.setUserPayload(item[0]) :
                    setMessage(true);
                }}
                sx={{
                  marginInline: 'auto',
                }}
              />
              <p style={{ display: message ? 'inline' : 'none' }} >Selecione apenas uma Instituição</p>
            </Box>
          ) : (
            <ModalContext.Provider value={[modal, setModal, registerModal, setRegisterModal, setInstitutions]}>
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
                      mr: '2em',
                      opacity: modal || registerModal ? '0.4' : '1'
                    }}
                    onClick={() => setModal(true)}
                  >
                    Entrar com Código
                  </Button>
                  {modal &&
                    <Modal title="Inserir código da instituição" />}
                </Box>
                <Button
                  fullWidth
                  size="large"
                  sx={{
                    mt: 3,
                    width: '20rem',
                    margin: 'auto',
                    opacity: modal || registerModal ? '0.4' : '1'
                  }}
                  variant="contained"
                  onClick={() => setRegisterModal(true)}
                >
                  <AddIcon />
                  Cadastrar Instituição
                </Button>
                {registerModal &&
                  <Modal title="Insira o nome da instituição" register />}
              </Box>
            </ModalContext.Provider>
          )
        )}
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
