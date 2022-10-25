import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./../../../styles/Sable.module.css";
import navbar from "./../../../styles/Navbar.module.css";


const UsersList = () => {
  const [userData, setUsersData] = useState([]);
  const userArray = ["NAME","VORAME", "EMAIL", "ROLLEN", "DETAILS", "LÖSCHEN"];

  //fetch delte request
  const deleteUser = async (id: string) => {
    await fetch(`http://localhost:3001/api/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
     window.location.reload();
  };
  
  const getAllUsers = async () => {
    const response = await fetch("http://localhost:3001/api/users", {
      credentials: "include",
      });
    const data = await response.json();
    setUsersData(data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  

    //display table th with keys
    const tableHeader = userArray.map((key, index) => {
      return (
        <th key={index} className={styles.th}>
          {key}
        </th>
      );
    });

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
          <Link href="/admin/journals">
            <a className={navbar.anchor}> Journals </a>
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
          {userData.map((user: any) => {
            return (
              <tr key={user.id} className={styles.trBody}>
                <td className={styles.td}>{user.name}</td>
                <td className={styles.td}>{user.firstName}</td>
                <td className={styles.td}>{user.email}</td>
                <td className={styles.td}>{user.roles}</td>
                <td className={styles.td}>
                <Link href={`/admin/users/${user.id}`}>
                    <a className={styles.linkBtn}>Sicht</a>
                  </Link>
                </td>
                <td className={styles.td}>
                    <button className={styles.btn}
                      onClick={() => deleteUser(user.id)}> Löschen </button>
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

export default UsersList;
