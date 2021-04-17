import { useState, useEffect } from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";
import PostModal from "./PostModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/features/allPostDataSlice";
import styles from "./styles/allPosts.module.css";

export default function AllPosts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.allPostData.data);
  const [isModal, setIsModal] = useState(false);
  const [modalPostId, setModalPostId] = useState(null);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  const handleModal = (post_id, username, published_at, title, content) => {
    setModalPostId(post_id);
    setModalData({
      postId: post_id,
      postUser: username,
      postDate: published_at,
      postTitle: title,
      postContent: content,
    });
    setIsModal(true);
  };

  const closeModal = () => {
    setModalPostId(null);
    setModalData(null);
    setIsModal(false);
  };

  return (
    <div>
      <CreatePost />
      {posts.length > 0 ? (
        <h3 className={styles.heading}>
          <i className={`fas fa-book ${styles.icon}`} />
          Posts
        </h3>
      ) : (
        <p className={styles.heading}>
          <i className={`far fa-sad-tear ${styles.icon}`} />
          There are currently no posts
        </p>
      )}
      <ul className={styles.post_list}>
        {posts.length > 0 &&
          posts.map((post) => {
            return (
              <Post
                handleModal={() => {
                  handleModal(
                    post.post_id,
                    post.username,
                    post.published_at,
                    post.title,
                    post.content
                  );
                }}
                key={post.post_id}
                username={post.username}
                title={post.title}
                content={post.content}
                user_id={post.user_id}
                post_id={post.post_id}
                date={post.published_at}
              />
            );
          })}
      </ul>
      {isModal && (
        <PostModal
          postId={modalData.postId}
          postUser={modalData.postUser}
          postDate={modalData.postDate}
          postTitle={modalData.postTitle}
          postContent={modalData.postContent}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
