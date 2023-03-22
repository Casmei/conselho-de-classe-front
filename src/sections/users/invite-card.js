import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  OutlinedInput,
  Select,
  MenuItem,
  Chip,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { useFormik } from 'formik';
import { array, mixed, string, object } from "yup"

const classes = [
  {
    id: "1",
    nome: "Turma 1"
  },
  {
    id: "2",
    nome: "Turma 2"
  },
  {
    id: "3",
    nome: "Turma 3",
  },
  {
    id: "4",
    nome: "Turma 4",
  }
]
const subjects = [
  {
    id: "1",
    nome: "materia 1"
  },
  {
    id: "2",
    nome: "materia 2"
  },
  {
    id: "3",
    nome: "materia 3"
  },
  {
    id: "4",
    nome: "materia 4"
  },
  {
    id: "5",
    nome: "materia 5"
  },
  {
    id: "6",
    nome: "materia 6"
  },
  {
    id: "7",
    nome: "materia 7"
  },
  {
    id: "8",
    nome: "materia 8"
  }
]

const cargos = [
  {
    value: 'MANAGER',
    label: 'Gestor'
  },
  {
    value: 'TEACHER',
    label: 'Professor'
  }
];

export const InviteCard = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      role: 'MANAGER',
      classes: [],
      subjects: []
    },
    validationSchema: object({
      name: string().required("Escreva o primeiro nome do usuário"),
      email: string().email("O email informado deve ser valido").required("É necessário informar o email do usuário"),
      role: mixed().oneOf(['MANAGER', "TEACHER"], "Selecione um cargo para o usuário").required(),
      classes: string().when("role", (role, schema) => {
        if (role == "TEACHER")
          return schema.required("É necessário selecionar uma turma para o professor.")
        return schema
      }),
      subject: array(string()).when("role", (role, schema) => {
        if (role == "TEACHER")
          return schema.required("É necessario selecionar uma matéria para o professor.")
        return schema
      }),
    }),
    onSubmit: async (values, helpers) => {
      try {
        //TODO: Fazer um post para minha api
        router.push('/students');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };


  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value)
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  }
  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardHeader
          title="Convidar usuário"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Nome"
                  name="name"
                  error={!!(formik.touched.name && formik.errors.name)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  value={formik.values.name}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Endereço de Email"
                  name="email"
                  error={!!(formik.touched.email && formik.errors.email)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  value={formik.values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Selecionar Cargo"
                  name="role"
                  error={!!(formik.touched.role && formik.errors.role)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={formik.values.role}
                >
                  {cargos.map((option) => (
                    <option
                      key={option.label}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              {(formik.values.role == "TEACHER") ? <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Selecionar Turma"
                  name="classes"
                  error={!!(formik.touched.classes && formik.errors.classes)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={formik.values.classes}
                >
                  {classes.map((option) => (
                    <option
                      key={option.id}
                      value={option}
                    >
                      {option.nome}
                    </option>
                  ))}
                </TextField>
              </Grid> : <></>}
              {(formik.values.role == "TEACHER") ? <Grid
                xs={12}
                md={6}
              >
                <Select
                  fullWidth

                  multiple
                  value={personName}
                  onChange={handleChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={subjects.find(subject => subject.id == value).nome} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {subjects.map((subject) => (
                    <MenuItem
                      key={subject.id}
                      value={subject.id}
                    >
                      {subject.nome}
                    </MenuItem>
                  ))}
                </Select>
              </Grid> : <></>}
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained"
            type="submit">
            Convidar
          </Button>
        </CardActions>
      </Card>
    </form >
  );
};
