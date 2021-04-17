import db from "../../utils/dbConnect";
import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  switch (req.method) {
    case "POST":
      const comment = req.body.comment;
      const post_id = req.body.post_id;
      let user_id;
      let username;

      try {
        username = req.session.get().user.username;
        user_id = req.session.get().user.user_id;
      } catch {
        username = null;
        user_id = null;
      }

      if (!user_id) {
        return res.status(403).json({ message: "You must be logged in" });
      }

      const postData = { comment, post_id, user_id, username };

      const postQuery = "INSERT INTO comments SET ?";
      db.query(postQuery, postData, (err, result) => {
        if (err) {
          return res.status(403).json({ message: "Cannot comment on post" });
        }
        return res.status(201).json({ message: "Comment success!" });
      });
      break;

    case "DELETE":
      const deleteData = { comment_id: req.body.comment_id };
      const deleteQuery = `DELETE FROM comments WHERE ?`;
      db.query(deleteQuery, deleteData, (err, result) => {
        if (err) {
          return res.status(403).json({ message: "Cannot delete comment" });
        }
        return res.status(200).json({ message: "Comment deleted" });
      });
  }
});
