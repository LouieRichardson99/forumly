import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import styles from "./styles/createComment.module.css";

export default function CreateComment(props) {
  const [form, setForm] = useState({ comment: "" });
  const [user, setUser] = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios("api/comment", {
      method: "POST",
      data: {
        comment: form.comment,
        post_id: props.post_id,
      },
    }).then(() => {
      props.refreshData();
    });

    setForm({ comment: "" });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  if (user) {
    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <input
            name="comment"
            type="text"
            onChange={handleChange}
            placeholder="Write a comment.."
            value={form.comment}
            required
            className={styles.comment_input}
          />
          <button className={styles.button} type="submit">
            Comment
          </button>
        </form>
      </div>
    );
  }

  return null;
}
