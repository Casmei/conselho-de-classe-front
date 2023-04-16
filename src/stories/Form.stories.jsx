import { Form } from "src/components/Form";
import { fireEvent, within } from "@storybook/testing-library";

export default {
  title: 'StudentsForm',
  component: Form
};

const courses = [
  { name: 'Análise e Desenvolvimento de Sistemas', id: 1 },
  { name: 'Processos Gerenciais', id: 2 },
  { name: 'Engenharia Agronômica', id: 3 },
  { name: 'Técnico em Informática', id: 4 },
  { name: 'Técnico em Agropecuária', id: 5 }
];

const classes = [
  { name: 'ADS 0123', id: 1 },
  { name: 'PG 0123', id: 2 },
  { name: 'EA 0123', id: 3 },
  { name: 'INFO 0120', id: 4 },
  { name: 'AGRO 0120', id: 5 }
];

export const InitialForm = () => (
  <Form
    title='Adicionar Estudante'
    subTitle='Adicione um novo estudante'
    courses={courses}
    classes={classes}
  />
);

export const InteractiveForm = () => (
  <Form
    title='Adicionar Estudante'
    subTitle='Adicione um novo estudante'
    courses={courses}
    classes={classes}
  />
);
InteractiveForm.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await fireEvent.click(
    canvas.getByTestId('name')
  );
}
