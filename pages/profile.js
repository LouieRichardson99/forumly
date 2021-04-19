import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import withSession from "../lib/session";
import dateformat from "dateformat";
import { UserContext } from "../context/UserContext";
import UserPosts from "../components/user/UserPosts";
import styles from "../styles/profilePage.module.css";

export default function profile({ isUser }) {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!isUser) {
      router.push("/login");
    }

    axios("api/fetch-user-data", {
      method: "GET",
    })
      .then((res) => {
        setUserData(res.data.result[0]);
      })
      .catch(() => {
        setUserData(null);
      });
  }, [isUser]);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      axios("api/delete-account", {
        method: "DELETE",
      }).then(() => {
        setUser(null);
        router.push("/");
      });
    } else {
      return;
    }
  };

  return (
    <div className={styles.main_container}>
      <h2 className={styles.page_header}>
        <i className={`fas fa-user-circle ${styles.icon}`}></i>My Profile
      </h2>
      {userData && (
        <div className={styles.user_info_container}>
          <p className={styles.info_label}>
            Username:
            <span className={styles.info_content}>{userData.username}</span>
          </p>
          <p className={styles.info_label}>
            User ID:
            <span className={styles.info_content}>{userData.user_id}</span>
          </p>
          <p className={styles.info_label}>
            Account Creation Date:
            <span className={styles.info_content}>
              {dateformat(userData.created_at, "mmmm dS, yyyy")}
            </span>
          </p>
          <button className={styles.delete_button} onClick={handleDelete}>
            Delete account
          </button>
          <UserPosts />
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isUser = req.session.get("user");

  if (!isUser) {
    return { props: {} };
  }

  return {
    props: { isUser },
  };
});
