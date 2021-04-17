import React from "react";
import AllComments from "../comments/AllComments";
import dateformat from "dateformat";
import styles from "./styles/postModal.module.css";

export default function PostModal(props) {
  return (
    <div className={styles.modal_background}>
      <div className={styles.modal_div}>
        <div className={styles.icon_wrapper}>
          <i
            onClick={props.closeModal}
            className={`fas fa-times ${styles.icon}`}
          />
        </div>
        <div className={styles.username_date_container}>
          <p>Posted by {props.postUser}</p>
          <p>{dateformat(props.postDate, "mmmm dS, yyyy")}</p>
        </div>
        <p className={styles.title}>{props.postTitle}</p>
        {props.postContent.split("\n").map((str, index) => {
          return str.length == 0 ? (
            <br className={styles.content} key={index} />
          ) : (
            <p className={styles.content} key={index}>
              {str}
            </p>
          );
        })}
        <AllComments post_id={props.postId} />
      </div>
    </div>
  );
}
