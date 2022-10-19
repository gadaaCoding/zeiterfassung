import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import styles from "../styles/style.module.css";

const Forget = () => {
  const [userData, setUserData] = useState({ email: ""});
  const [message, setMessage] = useState("");
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const res = await fetch("http://localhost:8080/users/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...userData} ),
    });
    const data = await res.json();

    if(data.message){
      setMessage(data.message);
      await router.push("/login");
      console.log(data)
    } else {
      setMessage(data.error);
    }
  };
  return (
    <div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1 className={styles.formh1}>Login to your Account</h1>
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
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>
          <span className={styles.fieldBottom}></span>
          <div className={styles.fieldNoise}></div>
        </div>
        <div className={[styles.btn, styles.btnPrimary].join("")}>
          <button type="submit" className={styles.btnContainer}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Forget;
