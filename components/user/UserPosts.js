import { useEffect } from "react";
import Post from "../posts/Post";
import { getUserPosts } from "../../redux/features/userPostDataSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/userPosts.module.css";

export default function UserPosts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.userPostData.data) || [];

  useEffect(() => {
    dispatch(getUserPosts());
  }, []);

  return (
    <div>
      {posts.length > 0 ? (
        <p className={styles.header}>My Posts</p>
      ) : (
        <p className={styles.header}>You don't have any posts</p>
      )}
      {posts.length > 0 && (
        <ul className={styles.post_list}>
          {posts.map((post) => {
            return (
              <Post
                key={post.post_id}
                title={post.title}
                content={post.content}
                date={post.date}
                user_id={post.user_id}
                post_id={post.post_id}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
