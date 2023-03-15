import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiService } from "src/service/Api";
import { StudentsTable } from "src/sections/students/student-table";
import { Box } from '@mui/material'
import Head from "next/head";
import { Layout } from '../../../layouts/dashboard/layout';
import styles from '../../../styles/student/getStudentsByInstitution.module.scss';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const token = localStorage.getItem('jwt_token');
  const [students, setStudents] = useState([]);

  // const token = localStorage.getItem('jwt_token');
  const requestStudents = async () => {
    if (!router.isReady) return;

    const response = await ApiService.get(`/institutions/${id}/students`, {
      headers: {
        'Authorization': `Bearer ${
          token !== null ?
            token :
            process.env.NEXT_PUBLIC_ACCESS_TOKEN
        }`
      }
    })
      .then(response => response.data)
      .catch(err => console.error(err.message));

    setStudents(response);
  }

  useEffect(() => {
    requestStudents();
  }, [router.isReady]);

  return (
    <Layout>
      <Head>
        <title>Estudantes por Instituição</title>
      </Head>
      <section className={styles.table}>
        <StudentsTable
          count={students?.length}
          items={students}
        />
      </section>
    </Layout>
  );
}

export default Page;
