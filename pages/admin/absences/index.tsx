import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./../../../styles/Table.module.css";
import navbar from "./../../../styles/Navbar.module.css";


const Absences = () => {
  const [absenceData, setAbsenceData] = useState([]);
 
  const absenceArray = [
    "Name",
    "Vorname",
    "Datum Von",
    "Datum Bis",
    "Grund",
    "Bemerkungen",
    "Details", 
    "Löschen",
  ];

  const getAllAbsences = async () => {
    const response = await fetch("http://localhost:3001/api/absences/admin", {
      credentials: "include",
    });
    const data = await response.json();
    setAbsenceData(data);
  };
  //fetch delte request
  const deleteAbsence = async (id: string) => {
    await fetch(`http://localhost:3001/api/absences/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    window.location.reload();
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
    getAllAbsences();
  }, []);

  return (
    <>
      <header className={navbar.header}>
        <Link href="/admin">
          <a className={navbar.logo}>
            <span className={navbar.span}>STIFTUNG | </span>BATTENBERG
          </a>
        </Link>
        <nav className={navbar.navbar}>
          <Link href="/admin/journals">
            <a className={navbar.anchor}> Journals </a>
          </Link>
          <Link href="/admin/users">
            <a className={navbar.anchor}> Benutzer </a>
          </Link>
          <Link href="/admin/register">
            <a className={navbar.anchor}> Erstellen </a>
          </Link>
        </nav>
      </header>
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
                <tr key={absence.id} className={styles.trBody}>
                  <td className={styles.td}>{absence.name}</td>
                  <td className={styles.td}>{absence.firstName}</td>
                  <td className={styles.td}>{absence.fromDate}</td>
                  <td className={styles.td}>{absence.toDate}</td>
                  <td className={styles.td}>{absence.reason}</td>
                  <td className={styles.td}>{absence.remarks}</td>

                  <td className={styles.td}>
                    <Link href={`/admin/absences/${absence.id}`} key={absence.id}>
                      <a className={styles.linkBtn}>Sicht </a>
                    </Link>
                  </td>
                  <td className={styles.td}>
                      <button className={styles.btn}
                        onClick={() => deleteAbsence(absence.id)}
                      > Löschen </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Absences;
