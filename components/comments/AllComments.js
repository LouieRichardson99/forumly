import axios from "axios";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import styles from "./styles/allComments.module.css";

export default function AllComments(props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    axios("api/fetch-post-comments", {
      method: "POST",
      data: {
        post_id: props.post_id,
      },
    })
      .then((res) => {
        setComments(res.data);
      })
      .catch(() => {
        setComments([]);
      });
  };

  return (
    <div className={styles.container}>
      <CreateComment post_id={props.post_id} refreshData={fetchComments} />
      {comments.length > 0 ? (
        <p className={styles.list_header}>Comments</p>
      ) : (
        <p className={styles.list_header}>There are no comments</p>
      )}
      <ul className={styles.list}>
        {comments.length > 0 &&
          comments.map((comment) => {
            return (
              <Comment
                key={comment.comment_id}
                commentUser={comment.username}
                commentContent={comment.comment}
                commentUserId={comment.user_id}
                commentId={comment.comment_id}
                refreshData={fetchComments}
              />
            );
          })}
      </ul>
    </div>
  );
}
