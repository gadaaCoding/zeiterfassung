import { useRouter } from 'next/router';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import styles from '../styles/admin.module.css'

const AddAbsence = () => {
  const [absenceData, setAbsenceData] = useState({
    firstName: "",
    lastName: "",
    absenceFrom: "",
    absenceTo: "",
    reason: "",
    remarks: "",
  });
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [auth, setAuth] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setAbsenceData({ ...absenceData, [name]: value });
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
      await fetch("http://localhost:8080/absences/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...absenceData }),
    });
      await router.push("/absences");
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:8080/users", {
           credentials: "include" 
          });
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
       {message && <p>{message}</p>}
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h1 className={styles.formh1}>Add Absence</h1>
          <div className={[styles.editorField, styles.fieldTextbox].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>First Name</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={absenceData.firstName}
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
              value={absenceData.lastName}
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
            <label className={styles.fieldLabel}>Absence From</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={absenceData.absenceFrom}
              type="datetime-local"
              className={styles.fieldInput}
              id="absenceFrom"
              name="absenceFrom"
              onChange={handleChange}
              required
            />
          </div>
          <span className={styles.fieldBottom}></span>
          <div className={styles.fieldNoise}></div>
        </div>

        <div className={[styles.editorField, styles.fieldTextbox].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Absence To</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={absenceData.absenceTo}
              type="datetime-local"
              className={styles.fieldInput}
              id="absenceTo"
              name="absenceTo"
              onChange={handleChange}
              required
            />
          </div>
          <span className={styles.fieldBottom}></span>
          <div className={styles.fieldNoise}></div>
        </div>

        <div className={[styles.editorField, styles.fieldTextbox].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Reason</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={absenceData.reason}
              type="text"
              className={styles.fieldInput}
              id="reason"
              name="reason"
              placeholder="Enter your reason"
              onChange={handleChange}
              required
            />
          </div>
          <span className={styles.fieldBottom}></span>
          <div className={styles.fieldNoise}></div>
        </div>

        {/* <div className={[styles.editorField, styles.fieldTextbox].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Reason</label>
          </div>
          <select className={styles.fieldContainer}>
            <option className={styles.fieldInput} >Absence Reason</option>
            <option className={styles.fieldInput} value="sick">Sick</option>
            <option className={styles.fieldInput} value="vacation">Vacation</option>
            <option className={styles.fieldInput} value="doctor">Doctor visit</option>
            <option className={styles.fieldInput} value="other">Other</option>
          </select>
          <span className={styles.fieldBottom}></span>
          <div className={styles.fieldNoise}></div>
        </div> */}

        <div className={[styles.editorField, styles.fieldTextbox].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Remarks</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={absenceData.remarks}
              type="text"
              className={styles.fieldInput}
              id="remarks"
              name="remarks"
              placeholder="Enter your remarks"
              onChange={handleChange}
              required
            />
          </div>
          <span className={styles.fieldBottom}></span>
          <div className={styles.fieldNoise}></div>
        </div>
        <div className={[styles.btn, styles.btnPrimary].join("")}>
          <button 
          type="submit" 
          className={styles.btnContainer}>Add Absence
          </button>
        </div>
        </form>
       
    </Layout>
  )
}

export default AddAbsence