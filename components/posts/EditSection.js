import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../redux/features/allPostDataSlice";
import { getUserPosts } from "../../redux/features/userPostDataSlice";
import styles from "./styles/editSection.module.css";

export default function EditModal(props) {
  const dispatch = useDispatch();
  const [editResponse, setEditResponse] = useState(null);
  const [form, setForm] = useState({
    title: props.title,
    content: props.content,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitEdit = (e) => {
    e.preventDefault();

    axios("api/post", {
      method: "PUT",
      data: {
        title: form.title,
        content: form.content,
        post_id: props.post_id,
      },
    })
      .then((res) => {
        setEditResponse(res.data.message);
        dispatch(getAllPosts());
        dispatch(getUserPosts());
        props.setEditing(false);
      })
      .catch((err) => {
        setEditResponse(err.response.data.message);
      });
  };

  return (
    <form className={styles.form} onSubmit={submitEdit}>
      <label className={styles.input_label}>
        Title
        <input
          name="title"
          value={form.title}
          type="text"
          required
          maxLength="250"
          onChange={handleChange}
          className={styles.title_input}
        />
      </label>
      <label className={styles.input_label}>
        Content
        <textarea
          name="content"
          value={form.content}
          type="text"
          required
          onChange={handleChange}
          className={styles.content_input}
        />
      </label>
      <button className={styles.button} type="submit">
        Submit changes
      </button>
      {editResponse && <p className={styles.response}>{editResponse}</p>}
    </form>
  );
}
