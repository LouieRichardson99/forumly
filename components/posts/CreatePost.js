import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../redux/features/allPostDataSlice";
import styles from "../posts/styles/createPost.module.css";

export default function CreatePost() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ title: "", content: "" });
  const [response, setResponse] = useState(null);
  const [user, setUser] = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios("api/post", {
      method: "POST",
      data: {
        title: form.title,
        content: form.content,
      },
    })
      .then(() => {
        setForm({ title: "", content: "" });
        dispatch(getAllPosts());
      })
      .catch((err) => {
        setForm({ title: "", content: "" });
        setResponse(err.response.data.message);
      });
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
        <p className={styles.heading}>
          <i className={`fas fa-edit ${styles.icon}`}></i>Create a post!
        </p>
        <form onSubmit={handleSubmit} className={styles.form_container}>
          <label className={styles.input_label}>
            Title
            <input
              name="title"
              value={form.title}
              type="text"
              required
              maxLength="255"
              onChange={handleChange}
              className={styles.title_input}
              placeholder="What are you going to talk about?"
            />
          </label>
          <label className={styles.input_label}>
            Content
            <textarea
              name="content"
              value={form.content}
              required
              onChange={handleChange}
              className={styles.content_input}
              placeholder="Got a question or topic to talk about? Great, type away!"
            />
          </label>
          <button className={styles.button} type="submit">
            Post
          </button>
        </form>
        {response && <p className={styles.response_msg}>{response}</p>}
      </div>
    );
  }

  return null;
}
