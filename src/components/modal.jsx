import React, { useContext, useState } from 'react';
import styles from '../styles/institutions/userInstitutionPage.module.scss';
import { ModalContext } from 'src/pages/auth/login';
import { useApi } from '../service/Api';

const Modal = ({ title, register = false }) => {
  const [code, setCode] = useState('');
  const [modal, setModal, registerModal, setRegisterModal, setInstitutions] = useContext(ModalContext);
  const ApiService = useApi();

  const handleRequest = () => {
    if (!register) {
      ApiService.enterWithCode(code)
        .then(res => console.log(res))
        .catch(err => console.log(err.message));
    } else {
      ApiService.registerInstitution(code)
        .then(res => console.log(res))
        .catch(err => console.error(err));
    }

    setTimeout(() => {
      ApiService.getInstitutions()
        .then(res => setInstitutions(res))
        .catch(err => console.log(err.message));
    }, 1000);

    !register ? setModal(false) : setRegisterModal(false);
  }

  return (
    <div className={styles.modal} style={{ display: !modal && !registerModal ? 'none' : 'flex' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          cursor: 'pointer'
        }}
      >
        <span style={{ color: '#3f51b5', fontWeight: 'bold' }} onClick={() => !register ? setModal(false) : setRegisterModal(false)}>&times;</span>
      </div>
      <h1 className={styles.modalTitle}>{title}</h1>
      <input className={styles.modalInput} type="text" name="instanceCode" id="instanceCode" onChange={(event) => setCode(event.target.value)} />
      <button className={styles.modalSubmit} onClick={handleRequest}>{register ? 'Cadastrar' : 'Entrar'}</button>
    </div>
  )
}

export default Modal;
