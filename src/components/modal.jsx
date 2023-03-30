import React, { useContext, useState } from 'react';
import styles from '../styles/institutions/userInstitutionPage.module.scss';
import { ModalContext } from 'src/pages/auth/login';
import { useApi } from '../service/Api';

const Modal = () => {
  const [code, setCode] = useState('');
  const [modal, setModal, setInstitutions] = useContext(ModalContext);
  const ApiService = useApi();

  const handleRequest = () => {
      ApiService.enterWithCode(code)
        .then(res => console.log(res))
        .catch(err => console.log(err.message));

      setTimeout(() => {
        ApiService.getInstitutions()
          .then(res => setInstitutions(res))
          .catch(err => console.log(err.message));
      }, 1000);

      setModal(false);
  }

  return (
    <div className={styles.modal} style={{ display: !modal ? 'none' : 'flex' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          cursor: 'pointer'
        }}
      >
        <span style={{ color: '#3f51b5', fontWeight: 'bold' }} onClick={() => setModal(false)}>&times;</span>
      </div>
      <h1 className={styles.modalTitle}>Inserir código da instituição</h1>
      <input className={styles.modalInput} type="text" name="instanceCode" id="instanceCode" onChange={(event) => setCode(event.target.value)} />
      <button className={styles.modalSubmit} onClick={handleRequest}>Entrar</button>
    </div>
  )
}

export default Modal;
