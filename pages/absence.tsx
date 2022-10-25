import Link from "next/link";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import styles from "./../styles/Style.module.css";
import navbar from "./../styles/Navbar.module.css";

const AddAbsence = () => {
  const [absenceData, setAbsenceData] = useState({
    name: "",
    firstName: "",
    fromDate: "",
    toDate: "",
    reason: "",
    remarks: "",
  });
  const router = useRouter();

  const options = [
    {
      label: "Grund auswählen",
      value: "Grund auswählen",

    },
    {
      label: "Arztbesuch",
      value: "Arztbesuch",
    },
    {
      label: "Krankheit",
      value: "Krankheit",
    },
    {
      label: "Unfall",
      value: "Unfall",
    },
    {
      label: "Stempeln vergessen",
      value: "Stempeln",
    },
    {
      label: "Sonstiges",
      value: "Sonstiges",
    },
  ];

  const [message, setMessage] = useState("");

  async function Logout() {
    await fetch("http://localhost:3001/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/login");
  }

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setAbsenceData({ ...absenceData, [name]: value });
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await fetch("http://localhost:3001/api/absences", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...absenceData }),
    });
    await router.push("/");
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
          <Link href="/journal">
            <a className={navbar.anchor}> +Journal </a>
          </Link>
          <a href="#" className={navbar.anchor} onClick={Logout}> Abmelden </a>
          <a className={navbar.anchor}>{message}</a>
        </nav>
      </header>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h1 className={styles.formh1}>Absenz anlegen</h1>
        <div className={[styles.editorField, styles.fieldTextbox].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Name</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={absenceData.name}
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

        <div className={[styles.editorField, styles.fieldTextbox].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Vorname</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={absenceData.firstName}
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

        <div className={[styles.editorField].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Datum von</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={absenceData.fromDate}
              type="datetime-local"
              className={styles.fieldInput}
              id="fromDate"
              name="fromDate"
              onChange={handleChange}
              required
            />
          </div>
          <span className={styles.fieldBottom}></span>
          <div className={styles.fieldNoise}></div>
        </div>

        <div className={[styles.editorField].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Datum bis</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={absenceData.toDate}
              type="datetime-local"
              className={styles.fieldInput}
              id="toDate"
              name="toDate"
              onChange={handleChange}
              required
            />
          </div>
          <span className={styles.fieldBottom}></span>
          <div className={styles.fieldNoise}></div>
        </div>

        <div className={[styles.editorField].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Grund</label>
          </div>
          <div className={styles.fieldContainer}>
            <select 
            value={absenceData.reason} 
            onChange={handleChange}
            name="reason"
            id="reason"
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

        <div className={[styles.editorField, styles.fieldTextbox].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>BEMERKINGEN</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={absenceData.remarks}
              type="text"
              className={styles.fieldInput}
              id="remarks"
              name="remarks"
              placeholder="Bemerkungen eingeben"
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

export default AddAbsence;
