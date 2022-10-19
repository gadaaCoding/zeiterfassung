import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import useSWR from "swr";
import styles from "../styles/style.module.css";


const fetchUser = async (userId: string) => {
    const res = await fetch(`http://localhost:8080/users/${userId}`, {
        method: "PATCH",
        credentials: "include",
    });
    return await res.json();
};
export default function UpdateUsers({updateId}: any) {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        roles: "",
        });
    const { data, error } = useSWR(updateId, fetchUser);
    
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await fetch(`http://localhost:8080/users/${updateId}`, {
            method: "PATCH",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...userData }),
        });
    };
    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1 className={styles.formh1}>Updata an Account</h1>
        <div className={[styles.editorField, styles.fieldTextbox].join("")}>
          <div className={styles.labelContainer}>
            <label className={styles.fieldLabel}>First Name</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              value={data.firstName}
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
              value={data.lastName}
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
              value={data.email}
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
              value={data.password}
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
              value={data.roles}
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
    );
    }
