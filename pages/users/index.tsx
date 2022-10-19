import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import styles from "../../styles/Table.module.css";



const UsersList = () => {
  const [message, setMessage] = useState("");
  const [auth, setAuth] = useState(false);
  const [userData, setUsersData] = useState([]);
  const router = useRouter();
  const userArray = ["FIRST NAME", "LAST NAME", "EMAIL", "ROLES", "DETAIL", "REMOVE"];


  //fetch delte request
  const deleteUser = async (id: string) => {
    await fetch(`http://localhost:8080/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    router.push("/users");
  };
  //update user
  const updateUser = async (id: string) => {
    await fetch(`http://localhost:8080/users/${id}`, {
      method: "PATCH",
      credentials: "include",
    });
    router.push("/users");
  };

  const getAllUsers = async () => {
    const response = await fetch("http://localhost:8080/users", {
      credentials: "include",
    });
    const data = await response.json();
    setUsersData(data);
  };

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
    <Layout auth={auth}>
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
              <tr key={user._id} className={styles.trBody}>
                <td className={styles.td}>{user.firstName}</td>
                <td className={styles.td}>{user.lastName}</td>
                <td className={styles.td}>{user.email}</td>
                <td className={styles.td}>{user.roles}</td>
                <td className={styles.td}>
                <Link href={`/users/${user._id}`} key={user._id}>
                    <a className={styles.linkBtn}>View</a>
                  </Link>
                </td>
                <td className={styles.td}>
                    <button className={styles.btn}
                      onClick={() => deleteUser(user._id)}> Delete </button>
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

export default UsersList;
