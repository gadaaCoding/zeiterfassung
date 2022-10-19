import Link from "next/link";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useEffect, useState } from "react";
import Layout from "../layout/Layout";
import styles from "../styles/style.module.css";

const Register = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roles: "",
  });
  const [auth, setAuth] = useState(false);
  const [_, setMessage] = useState("");
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await fetch("http://localhost:8080/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userData }),
    });
    await router.push("/login");
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
        router.push("/register");
      }
    })();
  }, []);

  return (
    <Layout auth={auth}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1 className={styles.formh1}>Create an Account</h1>
        <div className={[styles.editorField, styles.fieldTextbox].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>First Name</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={userData.firstName}
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
              value={userData.lastName}
              type="text"
              className={styles.fieldInput}
              name="lastName"
              id="lastName"
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
              autoComplete="off"
              placeholder="********"
              onChange={handleChange}
              required
            />
          </div>
          <span className={styles.fieldBottom}></span>
          <div className={styles.fieldNoise}></div>
        </div>
        <div className={[styles.editorField, styles.fieldTextbox].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>Roles</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={userData.roles}
              type="text"
              className={styles.fieldInput}
              name="roles"
              id="roles"
              placeholder="Enter roles: user or admin"
              onChange={handleChange}
            />
          </div>
          <span className={styles.fieldBottom}></span>
          <div className={styles.fieldNoise}></div>
        </div>

        <h4 className={styles.formh2}>
          Already have an account?
          <Link href="/login">
            <a className={styles.anchor}> login</a>
          </Link>
        </h4>
        <div className={[styles.btn, styles.btnPrimary].join("")}>
          <button type="submit" className={styles.btnContainer}>
            Register
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
