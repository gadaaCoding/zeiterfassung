import Link from "next/link";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import styles from "./../styles/Style.module.css";
import navbar from "./../styles/Navbar.module.css";

const Forget = () => {
  const [userData, setUserData] = useState({ email: ""});
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    await fetch("http://localhost:3001/api/users/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...userData} ),
    });
    router.push("/login");
  };
  return (
    <>
       <header className={navbar.header}>
        <Link href="/">
          <a className={navbar.logo}>
            <span className={navbar.span}>STIFTUNG | </span>BATTENBERG
          </a>
        </Link>
        <nav className={navbar.navbar}>
          <Link href="/login">
            <a className={navbar.anchor}>Anmelden</a>
          </Link>
          <Link href="/create">
            <a className={navbar.anchor}> Registrieren </a>
          </Link>
        </nav>
      </header>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1 className={styles.formh1}>Passwort zurücksetzen</h1>
        <div className={[styles.editorField, styles.fieldTextbox].join("")}>
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
        <div className={[styles.btn, styles.btnPrimary].join("")}>
          <button type="submit" className={styles.btnContainer}>
            Absenden
          </button>
        </div>
      </form>
    </>
  );
};

export default Forget;
