import Link from "next/link";
import { useRouter } from "next/router";
import UserDetails from "../../../components/FetchUser";
import styles from "../../../styles/style.module.css";
import navbar from "../../../styles/navbar.module.css";

const UserDetail = () => {
  const router = useRouter();
  const { usersId } = router.query;

  return (
    <div className="wrapper">
      <header className={navbar.header}>
        <Link href="/admin">
          <a className={navbar.logo}>
            <span className={navbar.span}>STIFTUNG | </span>BATTENBERG
          </a>
        </Link>
        <nav className={navbar.navbar}>
          <Link href="/admin/absences">
            <a className={navbar.anchor}> Absences </a>
          </Link>
          <Link href="/admin/journals">
            <a className={navbar.anchor}> Journals </a>
          </Link>
          <Link href="/admin/users">
            <a className={navbar.anchor}> Users </a>
          </Link>
          <Link href="/admin/register">
            <a className={navbar.anchor}> Create User </a>
          </Link>
        </nav>
      </header>
      <div className={styles.formContainer1}>
        <h1>User's Profile</h1>
        <UserDetails usersId={usersId} />
        <Link href="/admin/users">
          <a className={styles.btnContainer}>Back</a>
        </Link>
      </div>
    </div>
  );
};

export default UserDetail;
