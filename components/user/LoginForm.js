import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/router";
import styles from "./styles/loginForm.module.css";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [responseMessage, setResponseMessage] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios("api/login", {
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
      <p className={styles.header}>Login</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          name="username"
          onChange={handleChange}
          value={form.username}
          type="text"
          required
          placeholder="Username"
          className={styles.input}
        />
        <input
          name="password"
          onChange={handleChange}
          value={form.password}
          type="password"
          required
          placeholder="Password"
          className={styles.input}
        />
        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
      {responseMessage && (
        <p className={styles.response_msg}>{responseMessage}</p>
      )}
    </div>
  );
}
