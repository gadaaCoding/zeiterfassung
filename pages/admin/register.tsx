import Link from "next/link";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import styles from "./../../styles/Style.module.css";
import navbar from "./../../styles/Navbar.module.css";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    firstName: "",
    email: "",
    password: "",
    roles: "",
  });

  const router = useRouter();
  const options = [
    {
      label: "Rolle auswählen",
      value: "Rolle auswählen",

    },
    {
      label: "admin",
      value: "admin",
    },
    {
      label: "user",
      value: "user",
    },
  ];

  function handleChange(e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/api/users/admin/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userData }),
    });
    if (res.status === 201) {
      await router.push("/admin");
    } else {
      console.log("User does not created");
    }
  };

  return (
    <>
      <header className={navbar.header}>
        <Link href="/admin">
          <a className={navbar.logo}>
            <span className={navbar.span}>STIFTUNG | </span> BATTENBERG
          </a>
        </Link>
        <nav className={navbar.navbar}>
          <Link href="/admin/absences">
            <a className={navbar.anchor}> Absenzen </a>
          </Link>
          <Link href="/admin/journals">
            <a className={navbar.anchor}> Journals </a>
          </Link>
          <Link href="/admin/users">
            <a className={navbar.anchor}> Benutzer </a>
          </Link>
        </nav>
      </header>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1 className={styles.formh1}>REGISTRIEREN</h1>
        <div className={styles.editorField}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Name</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={userData.name}
              type="text"
              className={styles.fieldInput}
              id="name"
              name="name"
              placeholder="Name eingeben"
              onChange={handleChange}
              required
            />
          </div>
          <span className={styles.fieldBottom}></span>
          <div className={styles.fieldNoise}></div>
        </div>

        <div className={styles.editorField}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Vorname</label>
          </div>

          <div className={styles.fieldContainer}>
            <input
              value={userData.firstName}
              type="text"
              className={styles.fieldInput}
              name="firstName"
              id="firstName"
              placeholder="Vorname eingeben"
              onChange={handleChange}
              required
            />
          </div>
          <span className={styles.fieldBottom}></span>
          <div className={styles.fieldNoise}></div>
        </div>

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
              placeholder="Email eingeben"
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
              autoComplete="off"
              placeholder="******** e"
              onChange={handleChange}
              required
            />
          </div>
          <span className={styles.fieldBottom}></span>
          <div className={styles.fieldNoise}></div>
        </div>

        <div className={styles.editorField}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Benutzerrollen</label>
          </div>
          <div className={styles.fieldContainer}>
            <select
              value={userData.roles}
              onChange={handleChange}
              name="roles"
              id="roles"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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

export default Register;
