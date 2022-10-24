import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../styles/style.module.css";
import navbar from "../styles/navbar.module.css";

const AddJournal = () => {
  const [journalData, setJournalData] = useState({
    name: "",
    firstName: "",
    dayOfWeek: "",
    fromDate: "",
    toDate: "",
    activities: "",
    remarks: "",
  });

  const router = useRouter();

  const weekdays = [
    {
      label: "Tag auswählen",
      value: "Tag auswählen",

    },
    {
      label: "Monday",
      value: "Montag",
    },
    {
      label: "Tuesday",
      value: "Dienstag",
    },
    {
      label: "Wednesday",
      value: "Mittwoch",
    },
    {
      label: "Thursday",
      value: "Donnerstag",
    },
    {
      label: "Friday",
      value: "Freitag",
    }
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
    setJournalData({ ...journalData, [name]: value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:3001/api/journals", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...journalData }),
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
          <Link href="/absence">
            <a className={navbar.anchor}> +Absenz </a>
          </Link>
          <a href="#" className={navbar.anchor} onClick={Logout}> Abmelden </a>
        </nav>
      </header>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1 className={styles.formh1}>Journal anlegen</h1>
        <div className={[styles.editorField, styles.fieldTextbox].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Name</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={journalData.name}
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
            <label className={styles.fieldLabel}>Vorame</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={journalData.firstName}
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
            <label className={styles.fieldLabel}>Tage</label>
          </div>
          <div className={styles.fieldContainer}>
            <select
              value={journalData.dayOfWeek}
              onChange={handleChange}
              name="dayOfWeek"
              id="dayOfWeek"
            >
              {weekdays.map((dayOfWeek) => (
                <option key={dayOfWeek.value} value={dayOfWeek.value}>
                  {dayOfWeek.label}
                </option>
              ))}
            </select>
          </div>
          <span className={styles.fieldBottom}></span>
          <div className={styles.fieldNoise}></div>
        </div>

        <div className={[styles.editorField, styles.fieldTextbox].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Datum von</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={journalData.fromDate}
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

        <div className={[styles.editorField, styles.fieldTextbox].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Datum bis</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={journalData.toDate}
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

        <div className={[styles.editorField, styles.fieldTextbox].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Tätigkeiten</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={journalData.activities}
              type="text"
              className={styles.fieldInput}
              id="activities"
              name="activities"
              placeholder="Tätigkeiten eingeben"
              onChange={handleChange}
              required
            />
          </div>
          <span className={styles.fieldBottom}></span>
          <div className={styles.fieldNoise}></div>
        </div>

        <div className={[styles.editorField, styles.fieldTextbox].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Bemerkungen</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={journalData.remarks}
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
            Anlegen
          </button>
        </div>
      </form>
    </>
  );
};

export default AddJournal;
