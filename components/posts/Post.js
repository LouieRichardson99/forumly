import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import dateformat from "dateformat";
import EditSection from "./EditSection";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../redux/features/allPostDataSlice";
import { getUserPosts } from "../../redux/features/userPostDataSlice";
import styles from "./styles/post.module.css";

export default function Post(props) {
  const dispatch = useDispatch();
  const [user, setUser] = useContext(UserContext);
  const [creationResponse, setCreationResponse] = useState(null);
  const [editing, setEditing] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();

    axios("api/post", {
      method: "DELETE",
      data: {
        post_id: props.post_id,
      },
    })
      .then((res) => {
        setCreationResponse(res.data.message);
        dispatch(getAllPosts());
        dispatch(getUserPosts());
      })
      .catch((err) => {
        setCreationResponse(err.response.data.message);
      });
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setEditing(true);
  };

  return (
    <li className={styles.container}>
      <div className={styles.container_div} onClick={props.handleModal}>
        <div className={styles.username_date_container}>
          {props.username && (
            <p className={styles.username}>Posted by {props.username}</p>
          )}
          <p className={styles.date}>
            {dateformat(props.date, "mmmm dS, yyyy")}
          </p>
        </div>
        <p className={styles.title}>{props.title}</p>
        {props.content.split("\n").map((str, index) => {
          return str.length == 0 ? (
            <br className={styles.content} key={index} />
          ) : (
            <p className={styles.content} key={index}>
              {str}
            </p>
          );
        })}
        {user
          ? props.user_id == user.user_id && (
              <div className={styles.author_button_wrapper}>
                <button
                  className={styles.button}
                  onClick={(e) => handleDelete(e)}
                >
                  Delete
                </button>
                <button
                  className={styles.button}
                  onClick={(e) => handleEdit(e)}
                >
                  Edit
                </button>
              </div>
            )
          : null}
      </div>

      {editing && (
        <EditSection
          setEditing={setEditing}
          post_id={props.post_id}
          title={props.title}
          content={props.content}
        />
      )}
    </li>
  );
}
