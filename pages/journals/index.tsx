import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import styles from "../../styles/Table.module.css";


const Journals = () => {
  const [_, setMessage] = useState("");
  const [auth, setAuth] = useState(false);
  const router = useRouter();
  const [journalData, setJournalData] = useState([]);

  const journalArray = [
    "first Name",
    "last Name",
    "weekday",
    "journal From",
    "journal To",
    "activity",
    "evaluation",
    "remarks",
    "DETAIL", 
    "REMOVE"
  ];

  const getAllJournals = async () => {
    const response = await fetch("http://localhost:8080/journals",{
      credentials: "include"
    });
    const data = await response.json();
    setJournalData(data);
  };

  //fetch delte request
  const deleteJournal = async (id: string) => {
    await fetch(`http://localhost:8080/journals/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    router.push("/journals");
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
    getAllJournals();
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
            {journalData.map((journal: any) => {
              return (
                <tr key={journal._id} className={styles.trBody}>
                  <td className={styles.td}>{journal.firstName}</td>
                  <td className={styles.td}>{journal.lastName}</td>
                  <td className={styles.td}>{journal.weekday}</td>
                  <td className={styles.td}>{journal.journalFrom}</td>
                  <td className={styles.td}>{journal.journalTo}</td>
                  <td className={styles.td}>{journal.activity}</td>
                  <td className={styles.td}>{journal.evaluation}</td>
                  <td className={styles.td}>{journal.remarks}</td>
                  <td className={styles.td}>
                    <Link href={`/journals/${journal._id}`} key={journal._id}>
                      <a className={styles.linkBtn}>View</a>
                    </Link>
                  </td>
                  <td className={styles.td}>
                      <button className={styles.btn} 
                      onClick={() => deleteJournal(journal._id)} > Delete </button>
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

export default Journals;
