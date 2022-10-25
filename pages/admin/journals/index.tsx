import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../../../styles/table.module.css";
import navbar from "../../../styles/navbar.module.css";

const Journals = () => {
  const [journalData, setJournalData] = useState([]);

  const journalArray = [
    "Name",
    "Vorname",
    "Tage",
    "Gatum Von",
    "Datum Bis",
    "Tätigkeiten",
    "Bemerkungen",
    "Details",
    "Löschen",
  ];

  const getAllJournals = async () => {
    const response = await fetch("http://localhost:3001/api/journals/admin", {
      credentials: "include",
  });
    const data = await response.json();
    setJournalData(data);
  };

  //fetch delte request
  const deleteJournal = async (id: string) => {
    await fetch(`http://localhost:3001/api/journals/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    window.location.reload();
  };
  //display table th with keys
  const tableHeader = journalArray.map((key, index) => {
    return (
      <th key={index} className={styles.th}>
        {key}
      </th>
    );
  });

  useEffect(() => {
    getAllJournals();
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
          <Link href="/admin/absences">
            <a className={navbar.anchor}> Absenzen </a>
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
            <tr className={styles.trHead}>{tableHeader}</tr>
          </thead>
          <tbody className={styles.tbody}>
            {journalData.map((journal: any) => {
              return (
                <tr key={journal.id} className={styles.trBody}>
                  <td className={styles.td}>{journal.name}</td>
                  <td className={styles.td}>{journal.firstName}</td>
                  <td className={styles.td}>{journal.dayOfWeek}</td>
                  <td className={styles.td}>{journal.fromDate}</td>
                  <td className={styles.td}>{journal.toDate}</td>
                  <td className={styles.td}>{journal.activities}</td>
                  <td className={styles.td}>{journal.remarks}</td>
                  <td className={styles.td}>
                    <Link href={`/admin/journals/${journal.id}`} key={journal.id}>
                      <a className={styles.linkBtn}>Detailansicht</a>
                    </Link>
                  </td>
                  <td className={styles.td}>
                    <button className={styles.btn}
                      onClick={() => deleteJournal(journal.id)}
                    >
                      Delete
                    </button>
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

export default Journals;
