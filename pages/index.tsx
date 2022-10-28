import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./../styles/Navbar.module.css";

export default function Home() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function Logout() {
    await fetch("http://localhost:3001/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/login");
  }

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const res = await fetch("http://localhost:3001/api/users/user", {
          credentials: "include",
        });
        const user = await res.json();
        if (user.roles === "user") {
          setMessage(`Hallo, Herr ${user.name}`);
          router.push("/");
        } else if (user.roles === "admin") {
          router.push("/admin");
        } else {
          router.push("/login");
        }
      } catch (error) {
        router.push("/login");
      }
    })();
    return () => {
      abortController.abort();
    }
  }, []);

  return (
    <div className="wrapper">
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.logo}>
            <span className={styles.span}>STIFTUNG | </span>BATTENBERG
          </a>
        </Link>
        <nav className={styles.navbar}>
          <Link href="/absence">
            <a className={styles.anchor}> +Absenz </a>
          </Link>
          <Link href="/journal">
            <a className={styles.anchor}> +Journal </a>
          </Link>
          <a href="#" className={styles.anchor} onClick={Logout}>Abmelden</a>
        </nav>
      </header>
      <p>{message}</p>
    </div>
  );
}
