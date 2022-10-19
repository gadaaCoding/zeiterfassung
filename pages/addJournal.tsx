import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import styles from "../styles/admin.module.css";

const AddJournal = () => {
  const [journalData, setJournalData] = useState({
    firstName: "",
    lastName: "",
    weekday: "",
    journalFrom: "",
    journalTo: "",
    activity: "",
    evaluation: "",
    remarks: "",
  });

  const router = useRouter();
  const [message, setMessage] = useState("");
  const [auth, setAuth] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setJournalData({ ...journalData, [name]: value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:8080/journals/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...journalData }),
    });

    await router.push("/journals");
  };
  
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:8080/users", { credentials: "include" });
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
  }, []);

  return (
    <Layout auth={auth}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h1 className={styles.formh1}>Add Journal</h1>
          <div className={[styles.editorField, styles.fieldTextbox].join("")}>
            <div className={styles.labelContainer}>
              <label className={styles.fieldLabel}>First Name</label>
            </div>
            <div className={styles.fieldContainer}>
              <input
                value={journalData.firstName}
                type="text"
                className={styles.fieldInput}
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                onChange={handleChange}
                required
              />
            </div>
            <span className={styles.fieldBottom}></span>
            <div className={styles.fieldNoise}></div>
          </div>

          <div className={[styles.editorField, styles.fieldTextbox].join("")}>
            <div className={styles.labelContainer}>
              <label className={styles.fieldLabel}>Last Name</label>
            </div>
            <div className={styles.fieldContainer}>
              <input
                value={journalData.lastName}
                type="text"
                className={styles.fieldInput}
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                onChange={handleChange}
                required
              />
            </div>
            <span className={styles.fieldBottom}></span>
            <div className={styles.fieldNoise}></div>
          </div>

          <div className={[styles.editorField, styles.fieldTextbox].join("")}>
            <div className={styles.labelContainer}>
              <label className={styles.fieldLabel}>Weekday</label>
            </div>
            <div className={styles.fieldContainer}>
              <input
                value={journalData.weekday}
                type="text"
                className={styles.fieldInput}
                id="weekday"
                name="weekday"
                placeholder="Enter the weekday"
                onChange={handleChange}
                required
              />
            </div>
            <span className={styles.fieldBottom}></span>
            <div className={styles.fieldNoise}></div>
          </div>

          <div className={[styles.editorField, styles.fieldTextbox].join("")}>
            <div className={styles.labelContainer}>
              <label className={styles.fieldLabel}>Date From</label>
            </div>
            <div className={styles.fieldContainer}>
              <input
                value={journalData.journalFrom}
                type="datetime-local"
                className={styles.fieldInput}
                id="journalFrom"
                name="journalFrom"
                onChange={handleChange}
                required
              />
            </div>
            <span className={styles.fieldBottom}></span>
            <div className={styles.fieldNoise}></div>
          </div>

          <div className={[styles.editorField, styles.fieldTextbox].join("")}>
            <div className={styles.labelContainer}>
              <label className={styles.fieldLabel}>Date To</label>
            </div>
            <div className={styles.fieldContainer}>
              <input
                value={journalData.journalTo}
                type="datetime-local"
                className={styles.fieldInput}
                id="journalTo"
                name="journalTo"
                onChange={handleChange}
                required
              />
            </div>
            <span className={styles.fieldBottom}></span>
            <div className={styles.fieldNoise}></div>
          </div>

          <div className={[styles.editorField, styles.fieldTextbox].join("")}>
            <div className={styles.labelContainer}>
              <label className={styles.fieldLabel}>Activity</label>
            </div>
            <div className={styles.fieldContainer}>
              <input
                value={journalData.activity}
                type="text"
                className={styles.fieldInput}
                id="activity"
                name="activity"
                placeholder="Enter the activity"
                onChange={handleChange}
                required
              />
            </div>
            <span className={styles.fieldBottom}></span>
            <div className={styles.fieldNoise}></div>
          </div>

          <div className={[styles.editorField, styles.fieldTextbox].join("")}>
            <div className={styles.labelContainer}>
              <label className={styles.fieldLabel}>Evaluation</label>
            </div>
            <div className={styles.fieldContainer}>
              <input
                value={journalData.evaluation}
                type="text"
                className={styles.fieldInput}
                id="evaluation"
                name="evaluation"
                placeholder="Enter the evaluation"
                onChange={handleChange}
                required
              />
            </div>
            <span className={styles.fieldBottom}></span>
            <div className={styles.fieldNoise}></div>
          </div>

          <div className={[styles.editorField, styles.fieldTextbox].join("")}>
            <div className={styles.labelContainer}>
              <label className={styles.fieldLabel}>Remarks</label>
            </div>
            <div className={styles.fieldContainer}>
              <input
                value={journalData.remarks}
                type="text"
                className={styles.fieldInput}
                id="remarks"
                name="remarks"
                placeholder="Enter the remarks"
                onChange={handleChange}
                required
              />
            </div>
            <span className={styles.fieldBottom}></span>
            <div className={styles.fieldNoise}></div>
          </div>

          <div className={[styles.btn, styles.btnPrimary].join("")}>
          <button type="submit" className={styles.btnContainer}>
            Add Journal
          </button>
        </div>
        </form>
        {message && <div className={styles.message}>{message}</div>}
    </Layout>
  );
};

export default AddJournal;
