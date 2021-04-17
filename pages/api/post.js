import withSession from "../../lib/session";
import db from "../../utils/dbConnect";

export default withSession(async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  switch (req.method) {
    case "POST":
      let user_id;

      try {
        user_id = req.session.get().user.user_id;
      } catch {
        user_id = null;
      }

      if (!user_id) {
        return res.status(403).json({ message: "You must be logged in" });
      }

      let postData = { user_id, title, content };

      const postQuery = "INSERT INTO posts SET ?";

      db.query(postQuery, postData, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ message: "Post cannot be processed" });
        }

        res.status(201).json({ message: "Posted!" });
      });
      break;

    case "PUT":
      const putData = { title, content };

      const putQuery = `UPDATE posts SET ? WHERE post_id = ${db.escape(
        req.body.post_id
      )}`;

      db.query(putQuery, putData, (err, result) => {
        if (err) {
          console.log(err);

          return res.status(403).json({ message: "Cannot update post" });
        }

        return res.status(201).json({ message: "Changes have been made" });
      });
      break;

    case "DELETE":
      const deleteData = { post_id: req.body.post_id };

      const deleteCommentsQuery = `DELETE FROM comments WHERE ?`;
      const deletePostQuery = `DELETE FROM posts WHERE ?`;
      db.query(deleteCommentsQuery, deleteData, (err, result) => {
        db.query(
          deletePostQuery,
          deleteData,
          (err,
          (result) => {
            if (err) {
              return res
                .status(403)
                .json({ message: "Post cannot be deleted" });
            }

            return res.status(200).json({ message: "Post deleted!" });
          })
        );
      });
      break;

    default:
      res.status(405).end();
      break;
  }
});
