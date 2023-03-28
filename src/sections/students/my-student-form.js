import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { ApiService } from 'src/service/Api';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';


export const StudentProfileForm = ({title, subheader, method}) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      registration: '',
      class: '',
      course: '',
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(255)
        .required('É necessário informar o nome'),
      registration: Yup
        .string()
        .max(255)
        .required('Informe o número de registro'),
      class: Yup
        .string()
        .max(255)
        .required('Informe a turma'),
      course: Yup
        .string()
        .max(255)
        .required('Informe o curso')
    }),
    onSubmit: async (values, helpers) => {
      try {
        // if(method == 'POST') {
        //   ApiService.post(`/institutions/40/students`, values).then(() => {
        //     router.back()
        //   })
        // }
        // router.push('/instituicoes/40/estudantes');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const [courses, setCourses] = useState([
    {
      "createdAt": "2023-03-06T11:51:44.042Z",
      "updatedAt": "2023-03-06T11:51:44.042Z",
      "deletedAt": null,
      "id": "5ec248ac-cd77-4357-b397-90a2f2cc567b",
      "name": "Análise e Desenvolvimento de Sistemas"
    },
    {
      "createdAt": "2023-03-06T11:51:44.067Z",
      "updatedAt": "2023-03-06T11:51:44.067Z",
      "deletedAt": null,
      "id": "3e49f80d-a08b-4ff6-be7b-c8d6333d22f0",
      "name": "Enfermagem"
    },
    {
      "createdAt": "2023-03-06T11:51:44.091Z",
      "updatedAt": "2023-03-06T11:51:44.091Z",
      "deletedAt": null,
      "id": "b821dfd2-2490-40f4-8716-194658e8236f",
      "name": "Processos Gerênciais"
    },
    {
      "createdAt": "2023-03-06T11:51:44.102Z",
      "updatedAt": "2023-03-06T11:51:44.102Z",
      "deletedAt": null,
      "id": "140c01ab-51d5-45d7-85ee-333bc558578a",
      "name": "Engenharia de Software"
    },
    {
      "createdAt": "2023-03-06T11:51:44.135Z",
      "updatedAt": "2023-03-06T11:51:44.135Z",
      "deletedAt": null,
      "id": "478a4206-e86c-4b2d-823f-c0915041228c",
      "name": "Turismo"
    }
  ])
  const [classes, setClasses] = useState([
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
  ])

  // useEffect(() => {
  //   ApiService.get('/institutions/40/classes').then((response) => {
  //     setClasses(response.data)
  //   })

  //   ApiService.get('/institutions/40/courses').then((response) => {
  //     setCourses(response.data)
  //   })
  // }, [])

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardHeader
          title={title}
          subheader={subheader}
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={8}
              >
                <TextField
                  fullWidth
                  error={!!(formik.touched.name && formik.errors.name)}
                  label="Nome Completo"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  value={formik.values.name}
                />
              </Grid>
            {method == 'POST' &&
              <>
                <Grid
                  xs={12}
                  md={4}
                >
                  <TextField
                    fullWidth
                    label="Número de registro"
                    error={!!(formik.touched.registration && formik.errors.registration)}
                    name="registration"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    value={formik.values.registration}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    label="Curso"
                    name="course"
                    error={!!(formik.touched.course && formik.errors.course)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    select
                    fullWidth
                    helperText="Selecione o curso que o aluno realiza"
                  >
                    {courses.map(option => (
                      <MenuItem 
                        key={option.id}
                        value={option.id}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>

                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    label="Turma"
                    name="class"
                    error={!!(formik.touched.class && formik.errors.class)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    select
                    fullWidth
                    helperText="Selecione a turma que o aluno participa"
                  >
                    {classes.map(option => (
                      <MenuItem 
                        key={option.id}
                        value={option.id}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </>
            }
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained"
            type="submit">
            {method == 'POST' ? 'Criar' : 'Editar'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
