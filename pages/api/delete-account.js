import db from "../../utils/dbConnect";
import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  if (req.method == "DELETE") {
    const user_id = req.session.get().user.user_id;
    const query1 = `DELETE FROM comments WHERE user_id = ${db.escape(user_id)}`;
    const query2 = `DELETE FROM posts WHERE user_id = ${db.escape(user_id)}`;
    const query3 = `DELETE FROM users WHERE user_id = ${db.escape(user_id)}`;

    db.query(query1, (err, result) => {
      db.query(query2, (err, result) => {
        db.query(query3, (err, result) => {
          if (err) {
            return res
              .status(403)
              .json({ message: "Account cannot be deleted at this time" });
          }

          req.session.destroy();
          return res.status(200).json({ message: "Account deleted" });
        });
      });
    });
  }
});
