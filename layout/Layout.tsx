import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/navbar.module.css";

const Layout = (props: any) => {
  const router = useRouter();

  async function Logout() {
    await fetch("http://localhost:8080/users/logout", {
      method: "POST",
      credentials: "include",
    });
  }
  let menu: any;

  if (!props.auth) {
    menu = (
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.logo}>
            <span className={styles.span}>Stiftung | </span>Battenberg
          </a>
        </Link>
        <nav className={styles.navbar}>
          <Link href="/absences">
            <a className={styles.anchor}> Absences </a>
          </Link>
          <Link href="/journals">
            <a className={styles.anchor}> Journals </a>
          </Link>
          <Link href="/addAbsence">
            <a className={styles.anchor}> +Absence </a>
          </Link>
          <Link href="/addJournal">
            <a className={styles.anchor}> +Journal </a>
          </Link>
          <Link href="/users">
            <a className={styles.anchor}> Users </a>
          </Link>
          <Link href="/login">
            <a className={styles.anchor}> Login </a>
          </Link>

          <Link href="/register">
            <a className={styles.anchor}> Register </a>
          </Link>
        </nav>
      </header>
    );
  } else {
    menu = (

      <header className={styles.header}>
        <Link href="/">
          <a className={styles.logo}>
            <span className={styles.span}>Stiftung | </span>Battenberg
          </a>
        </Link>
        <nav className={styles.navbar}>
          <Link href="/absences">
            <a className={styles.anchor}> Absences </a>
          </Link>
          <Link href="/journals">
            <a className={styles.anchor}> Journals </a>
          </Link>
          <Link href="/addAbsence">
            <a className={styles.anchor}> +Absence </a>
          </Link>
          <Link href="/addJournal">
            <a className={styles.anchor}> +Journal </a>
          </Link>
          <Link href="/users">
            <a className={styles.anchor}> Users </a>
          </Link>
          <Link href="/login">
            <a className={styles.anchor} onClick={() => Logout()}>
              Logout
            </a>
          </Link>
        </nav>
      </header>
    );
  }

  return (
    <>
      <div >{menu}</div>
      <main className={styles.main}>{props.children}</main>
    </>
  );
};

export default Layout;
