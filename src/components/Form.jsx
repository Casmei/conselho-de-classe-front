import { PropTypes } from "prop-types";
import styles from '../styles/student/createStudentForm.module.scss';
import { useState } from "react";

export const Form = ({ title, subTitle, courses, classes }) => {
  const [name, setName] = useState('');
  const [register, setRegister] = useState('');
  const [course, setCourse] = useState('');
  const [classe, setClasse] = useState('');

  const handleClick = event => {
    console.log(event.currentTarget);
    event.currentTarget.classList.remove(styles.inputBlur)
    event.currentTarget.classList.add(styles.inputFocused);
    event.currentTarget.lastChild.focus();
  };

  const handleBlur = event => {
    if (event.currentTarget.lastChild.value === '') {
      event.currentTarget.classList.toggle(styles.inputBlur);
    }
  }

  return (
    <main className={styles.card}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subTitle}</p>
      <div className={styles.row}>
        <div
          className={styles.inputGroup + " " + styles.nameInput}
          data-testid="name"
          onClick={event => handleClick(event)}
          onBlur={event => handleBlur(event)}
          onChange={event => setName(event.target.value)}
        >
          <p className={styles.inputTitle}>Nome Completo *</p>
          <input type="text" className={styles.inputBox} />
        </div>
        <div
          className={styles.inputGroup + " " + styles.registerInput}
          onClick={event => handleClick(event)}
          onBlur={event => handleBlur(event)}
          onChange={event => setName(event.target.value)}
        >
          <p className={styles.inputTitle}>Número de Registro *</p>
          <input type="text" className={styles.inputBox} />
        </div>
      </div>
      <div className={styles.row}>
        <div
          className={styles.inputGroup + " " + styles.select}
          onClick={event => handleClick(event)}
        >
          <label htmlFor="courses" className={styles.inputTitle}>Curso</label>
          <select
            name="courses"
            id="courses"
            className={styles.selectOptions}
            onChange={event => setCourse(event.target.value)}
            autofocus
          >
            <option value="" disabled selected></option>
            {courses.map(course => (
              <option value={course.name} key={course.id} >{course.name}</option>
            ))}
          </select>
        </div>
        <div
          className={styles.inputGroup + " " + styles.select}
          onClick={event => handleClick(event)}
          onChange={event => setCourse(event.target.value)}
        >
          <label htmlFor="classes" className={styles.inputTitle}>Turmas</label>
          <select
            name="classes"
            id="classes" className={styles.selectOptions}
            onChange={event => setCourse(event.target.value)}
            autofocus
          >
            <option value="" disabled selected></option>
            {classes.map(classe => (
              <option value={classe.name} key={classe.id} >{classe.name}</option>
            ))}
          </select>
        </div>
        <p className={styles.selectText}>Selecione o curso que o aluno realiza</p>
        <p className={styles.selectText}>Selecione a turma que o aluno participa</p>
      </div>
      <div className={styles.rowSubmit}>
        <button className={styles.submitButton}>Criar</button>
      </div>
    </main>
  );
}

Form.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  courses: PropTypes.array,
  classes: PropTypes.array
};
