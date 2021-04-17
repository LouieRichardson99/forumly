import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import styles from "./styles/comment.module.css";

export default function Comment(props) {
  const [user, setUser] = useContext(UserContext);

  const handleDelete = () => {
    axios("http://localhost:3000/api/comment", {
      method: "DELETE",
      data: {
        comment_id: props.commentId,
      },
    }).then(() => {
      props.refreshData();
    });
  };

  return (
    <li className={styles.container}>
      <p className={styles.username}>Comment by {props.commentUser}</p>
      <p className={styles.comment}>{props.commentContent}</p>
      {user
        ? props.commentUserId == user.user_id && (
            <button className={styles.delete_button} onClick={handleDelete}>
              Delete
            </button>
          )
        : null}
    </li>
  );
}
