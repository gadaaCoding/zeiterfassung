import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./../../styles/navbar.module.css";

export default function Admin() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function Logout() {
    await fetch("http://localhost:3001/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/");
  }
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3001/api/users/user", {
          credentials: "include",
        });
        const user = await res.json();
        if (!user || res.status === 401) {
          router.push("/login");

        }

        if (user.roles === "admin") {
          router.push("/admin");
          setMessage(`Hallo, Herr ${user.name}`);
        }

        if (user.roles === "user") {
          router.push("/");
        }
      } catch (error) {
        router.push("/login");
      }
    })();
  }, []);

  return (
    <div className="wrapper">
      <header className={styles.header}>
        <Link href="/admin">
          <a className={styles.logo}>
            <span className={styles.span}>STIFTUNG | </span>BATTENBERG
          </a>
        </Link>
        <nav className={styles.navbar}>
          <Link href="/admin/absences">
            <a className={styles.anchor}> Absenzen </a>
          </Link>
          <Link href="/admin/journals">
            <a className={styles.anchor}> Journals </a>
          </Link>
          <Link href="/admin/users">
            <a className={styles.anchor}> Benutzer </a>
          </Link>
          <Link href="/admin/register">
            <a className={styles.anchor}> Erstellen </a>
          </Link>
          <a href="#" className={styles.anchor} onClick={Logout}>Abmelden</a>
        </nav>
      </header>
      <p>{message}</p>
    </div>
  );
}
