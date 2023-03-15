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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';


export const ClassProfileForm = ({title, subheader, method}) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(255)
        .required('É necessário informar o nome')
    }),
    onSubmit: async (values, helpers) => {
      try {
        //TODO: Fazer um post para minha api
        router.push('/turmas');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

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
              >
                <TextField
                  fullWidth
                  error={!!(formik.touched.name && formik.errors.name)}
                  label="Nome da turma"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  value={formik.values.name}
                />
              </Grid>
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
