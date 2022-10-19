import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import styles from "../../styles/style.module.css";
import JournalDetails from "../../components/FetchJournal";

const JouranlDetail = ({ journal }: any) => {
  const [message, setMessage] = useState("");
  const [auth, setAuth] = useState(false);
  const router = useRouter();
  const { journalId } = router.query;

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
      } catch (error) {
        setMessage("You are not logged in");
        setAuth(false);
        router.push("/login");
      }
    })();
  }, []);

  return (
    <Layout auth={auth}>
        <div className={styles.formContainer}>
          <JournalDetails journalId={journalId} />
          <Link href="/journals">
            <a className={styles.btnContainer}>Back</a>
          </Link>
        </div>
    </Layout>
  );
};

export default JouranlDetail;
