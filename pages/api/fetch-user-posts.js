import withSession from "../../lib/session";
import db from "../../utils/dbConnect";

export default withSession(async (req, res) => {
  let user_id;

  try {
    user_id = req.session.get().user.user_id;
  } catch {
    user_id = null;
  }

  if (req.method == "GET") {
    const query = `SELECT user_id, post_id, title, content, published_at from posts WHERE user_id = ${user_id} ORDER BY published_at DESC`;
    db.query(query, (err, result) => {
      if (err) {
        return res.status(403).json({ message: "Cannot retrieve posts" });
      }

      return res.status(200).json({ posts: result });
    });
  }
});
