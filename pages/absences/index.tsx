import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import styles from "../../styles/Table.module.css";


const Absences = () => {
  const [_, setMessage] = useState("");
  const [auth, setAuth] = useState(false);
  const [absenceData, setAbsenceData] = useState([]);
  const router = useRouter();

  const absenceArray = [
    "firstName",
    "lastName",
    "absenceFrom",
    "absenceTo",
    "reason",
    "remarks",
    "DETAIL", 
    "REMOVE"
  ];

  const getAllAbsences = async () => {
    const response = await fetch("http://localhost:8080/absences",{
      credentials: "include"
    });
    const data = await response.json();
    setAbsenceData(data);
  };
  //fetch delte request
  const deleteAbsence = async (id: string) => {
    await fetch(`http://localhost:8080/absences/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    router.push("/absences");
  };
  //display table th with keys
  const tableHeader = absenceArray.map((key, index) => {
    return (
      <th key={index} className={styles.th}>
        {key}
      </th>
    );
  });

  


  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:8080/users", { 
          credentials: "include" 
        });
        const data = await res.json();
        const firstElement = data[0];
        const firstName = firstElement.firstName;
        setMessage(`Hello ${firstName}`);
        setAuth(true);
      } catch (error) {
        setMessage("You are not logged in");
        setAuth(false);
        router.push("/login");
      }
    })();
    getAllAbsences();
  }, []);

  return (
    <Layout auth={auth}>
      <div className="container">
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.trHead}>
              {tableHeader}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {absenceData.map((absence: any) => {
              return (
                <tr key={absence._id} className={styles.trBody}>
                  <td className={styles.td}>{absence.firstName}</td>
                  <td className={styles.td}>{absence.lastName}</td>
                  <td className={styles.td}>{absence.absenceFrom}</td>
                  <td className={styles.td}>{absence.absenceTo}</td>
                  <td className={styles.td}>{absence.reason}</td>
                  <td className={styles.td}>{absence.remarks}</td>

                  <td className={styles.td}>
                    <Link href={`/absences/${absence._id}`} key={absence._id}>
                      <a className={styles.linkBtn}>View </a>
                    </Link>
                  </td>
                  <td className={styles.td}>
                      <button className={styles.btn}
                        onClick={() => deleteAbsence(absence._id)}
                      >Delete </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Absences;
