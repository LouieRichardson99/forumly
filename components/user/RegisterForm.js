import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/router";
import styles from "./styles/registerForm.module.css";

export default function RegisterForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [responseMessage, setResponseMessage] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios("api/register", {
      method: "POST",
      data: {
        username: form.username,
        password: form.password,
      },
    })
      .then((res) => {
        setResponseMessage(res.data.message);

        setUser({
          user_id: res.data.user_id,
          username: res.data.username,
        });
        setForm({ username: "", password: "" });

        router.push("/");
      })
      .catch((err) => {
        setResponseMessage(err.response.data.message);
        setUser(null);
      });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          onChange={handleChange}
          value={form.username}
          type="text"
          required
          placeholder="Choose a username"
          className={styles.input}
        />
        <input
          name="password"
          onChange={handleChange}
          value={form.password}
          type="password"
          required
          min="5"
          placeholder="Choose a password"
          className={styles.input}
        />
        <button className={styles.button} type="submit">
          Register
        </button>
      </form>
      {responseMessage && (
        <p className={styles.response_msg}>{responseMessage}</p>
      )}
    </div>
  );
}
