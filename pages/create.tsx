import Link from "next/link";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import styles from "./../styles/Style.module.css";
import navbar from "./../styles/Navbar.module.css";

const CreateUser = () => {
  const [userData, setUserData] = useState({
    name: "",
    firstName: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/api/users/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userData }),
    });
    if (res.status === 201) {
      await router.push("/login");
    } else {
     //create regex to check if password is strong enough
     const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;//
      if (userData.password.match(strongPassword)) {
        console.log("Password is strong enough");
      } else {
        alert("Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number");
      }
      console.log("User does not created");
    }
  };

  return (
    <>
      <header className={navbar.header}>
        <Link href="/create">
          <a className={navbar.logo}>
            <span className={navbar.span}>STIFTUNG | </span>BATTENBERG
          </a>
        </Link>
        <nav className={navbar.navbar}>
          <Link href="/login">
            <a className={navbar.anchor}>Anmelden</a>
          </Link>
        </nav>
      </header>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1 className={styles.formh1}>REGISTRIEREN</h1>

        <div className={[styles.editorField, styles.fieldTextbox].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Name</label>
          </div>

          <div className={styles.fieldContainer}>
            <input
              value={userData.name}
              type="text"
              className={styles.fieldInput}
              name="name"
              id="name"
              placeholder="Name eingeben"
              onChange={handleChange}
              required
            />
          </div>
          <span className={styles.fieldBottom}></span>
          <div className={styles.fieldNoise}></div>
        </div>

        <div className={[styles.editorField, styles.fieldTextbox].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Vorname</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={userData.firstName}
              type="text"
              className={styles.fieldInput}
              id="firstName"
              name="firstName"
              placeholder="Vorname eingeben"
              onChange={handleChange}
              required
            />
          </div>
          <span className={styles.fieldBottom}></span>
          <div className={styles.fieldNoise}></div>
        </div>

       

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
              placeholder="Email eingeben"
              onChange={handleChange}
              required
            />
          </div>
          <span className={styles.fieldBottom}></span>
          <div className={styles.fieldNoise}></div>
        </div>

        <div className={[styles.editorField, styles.fieldTextbox].join("")}>
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
              autoComplete="off"
              placeholder="********"
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

export default CreateUser
