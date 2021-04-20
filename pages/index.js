import { useContext } from "react";
import AllPosts from "../components/posts/AllPosts";
import { UserContext } from "../context/UserContext";
import styles from "../styles/indexPage.module.css";
import Head from "next/head";

export default function Home() {
  const [user, setUser] = useContext(UserContext);

  return (
    <>
      <Head>
        <title>Forumly the Forum App!</title>
        <meta
          name="description"
          content="This is a forum web application which does lots of CRUD
              functionality and interactions with a MySQL database on AWS."
        ></meta>
      </Head>
      {!user && (
        <div className={styles.about_container}>
          <div className={styles.about_body}>
            <p className={styles.about_heading}>Welcome to Forumly!</p>
            <p className={styles.about_paragraph}>
              This is a forum web application which does lots of CRUD
              functionality and interactions with a MySQL database on AWS.
            </p>
            <p className={styles.about_paragraph}>
              Why not register for an account it will only take a second, just
              enter a username and password to see what this web app has to
              offer.
            </p>
            <p className={styles.about_paragraph}>
              Here is the GitHub repository to see what is going on under the
              hood.
            </p>
          </div>
          <a
            className={styles.button}
            href="https://github.com/LouieRichardson99/forumly"
            target="_blank"
          >
            <i className={`fab fa-github ${styles.icon}`}></i>Source Code
          </a>
        </div>
      )}
      <AllPosts />
    </>
  );
}
