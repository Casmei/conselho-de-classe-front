import { useCallback, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';

export const StudentProfileDetails = () => {
  const [values, setValues] = useState({
    name: 'Anika',
    registration: '13436',
    contract: '53309783497',
    course: 'Análise e Desenvolvimento de Sistemas',
    class: 'ADS2021',
  });

  const [isDisabled, setIsDisabled] = useState(true)

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  const handleEditableField = () => {
    setIsDisabled(false)

    if (!isDisabled) {
      handleSubmitForm()
    }
  }

  const handleSubmitForm = () => {
    console.log('Realiza uma requisição para minha api')
  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="As informações podem ser editadas"
          title="Aluno"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Nome Completo"
                  name="name"
                  onChange={handleChange}
                  required
                  disabled={isDisabled ? true : false}
                  value={values.name}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Registro"
                  name="registration"
                  onChange={handleChange}
                  required
                  disabled={isDisabled ? true : false}
                  type="number"
                  value={values.registration}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Contrato"
                  name="contract"
                  onChange={handleChange}
                  type="number"
                  required
                  disabled={isDisabled ? true : false}

                  value={values.contract}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Curso"
                  name="course"
                  onChange={handleChange}
                  type="string"
                  disabled={isDisabled ? true : false}
                  required
                  value={values.course}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Turma"
                  name="class"
                  onChange={handleChange}
                  required
                  disabled={isDisabled ? true : false}
                  value={values.class}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained"
            onClick={handleEditableField}
          >
            {isDisabled ? 'Editar' : 'Salvar'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
