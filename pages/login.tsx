import Link from "next/link";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useEffect, useState } from "react";
import Layout from "../layout/Layout";
import styles from "../styles/style.module.css";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [auth, setAuth] = useState(false);
  const [_, setMessage] = useState("");
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    await fetch("http://localhost:8080/users/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userData }),
    });
      router.push("/");
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:8080/users", {
          credentials: "include",
          });
        const data = await res.json();
        const firstElement = data[0];
        const firstName = firstElement.firstName;
        setMessage(`Hello ${firstName}`);
        setAuth(true);
        router.push("/");
      } catch (error) {
        setMessage("You are not logged in");
        setAuth(false);
        router.push("/login");
      }
    })();
  }, []);

  return (
    <Layout auth={auth}>
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

        <h4 className={styles.formh2}>
          have no account?
          <Link href="/register">
            <a className={styles.anchor}> Regsiter</a>
          </Link>
        </h4>
        <h4 className={styles.formh2}>
          forgot Password?
          <Link href="/forgot">
            <a className={styles.anchor}> Reset</a>
          </Link>
        </h4>
        <div className={[styles.btn, styles.btnPrimary].join("")}>
          <button type="submit" className={styles.btnContainer}>
            Login
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
