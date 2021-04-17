import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Logout from "../user/Logout";
import Link from "next/link";
import styles from "../navbar/styles/navbar.module.css";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useContext(UserContext);

  return (
    <div className={styles.nav_container}>
      <Link href="/">
        <p className={styles.logo}>Forumly</p>
      </Link>
      {user ? (
        <div>
          <p className={styles.username}>
            <span className={styles.username_text}>
              Welcome, {user.username}
            </span>
            <i className="far fa-laugh-beam"></i>
          </p>
          <div className={styles.buttons}>
            {router.pathname == "/" ? (
              <Link href="/profile">
                <button className="button">Profile</button>
              </Link>
            ) : (
              <Link href="/">
                <button className="button">Home</button>
              </Link>
            )}
            <Logout />
          </div>
        </div>
      ) : (
        <div className={styles.buttons}>
          <Link href="/login">
            <button className="button">Login</button>
          </Link>
          <Link href="/register">
            <button className="button">Register</button>
          </Link>
        </div>
      )}
    </div>
  );
}
