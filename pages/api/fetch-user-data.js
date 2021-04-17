import withSession from "../../lib/session";
import db from "../../utils/dbConnect";

export default withSession(async (req, res) => {
  let user_id;

  try {
    user_id = req.session.get().user.user_id;
  } catch {
    user_id = null;
  }

  if (!user_id) {
    return res.status(403).json({ message: "You must be logged in" });
  }

  if (req.method == "GET") {
    const query = `SELECT user_id, username, created_at FROM users WHERE user_id = ${db.escape(
      user_id
    )}`;
    db.query(query, (err, result) => {
      if (err) {
        return res.status(403).json({ message: "Cannot get user data" });
      }

      return res.status(200).json({ result });
    });
  }
});
