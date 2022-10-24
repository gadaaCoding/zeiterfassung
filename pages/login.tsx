import Link from "next/link";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import styles from "../styles/style.module.css";
import navbar from "../styles/navbar.module.css";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    await fetch("http://localhost:3001/api/users/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userData }),
    });
    router.push("/");
  };

  return (
    <>
      <header className={navbar.header}>
        <Link href="/login">
          <a className={navbar.logo}>
            <span className={styles.span}>STIFTUNG | </span>BATTENBERG
          </a>
        </Link>
        <nav className={navbar.navbar}>
          <Link href="/create">
            <a className={navbar.anchor}> Registrieren </a>
          </Link>
        </nav>
      </header>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1 className={styles.formh1}>ANMELDEN</h1>
        <div className={styles.editorField}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Email</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={userData.email}
              type="email"
              className={styles.fieldInput}
              id="email"
              name="email"
              placeholder="Email Eingeben"
              onChange={handleChange}
              required
            />
          </div>
          <span className={styles.fieldBottom}></span>
          <div className={styles.fieldNoise}></div>
        </div>

        <div className={styles.editorField}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Passwort</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={userData.password}
              type="password"
              className={styles.fieldInput}
              name="password"
              id="password"
              placeholder="********"
              onChange={handleChange}
              required
            />
          </div>
          <span className={styles.fieldBottom}></span>
          <div className={styles.fieldNoise}></div>
        </div>
        <h4 className={styles.formh2}>
          Passwort vergessen?
          <Link href="/forgot">
            <a className={styles.anchor}> Zurücksetzen</a>
          </Link>
        </h4>
        <div className={`${styles.btn} ${styles.btnPrimary}`}>
          <button type="submit" className={styles.btnContainer}> ANMELDEN </button>
        </div>
      </form>
    </>
  );
};

export default Login;
