import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import Layout from "../layout/Layout";
import styles from "../styles/style.module.css";

const Signin = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    await fetch("http://localhost:8080/users/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userData }),
    });
    router.push("/login");
  };

  return (
    <Layout >
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

        <div className={[styles.editorField, styles.fieldTextbox].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Password</label>
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
        <div className={[styles.btn, styles.btnPrimary].join("")}>
          <button type="submit" className={styles.btnContainer}>
            Login
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Signin;
