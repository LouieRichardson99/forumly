import db from "../../utils/dbConnect";

export default function handler(req, res) {
  if (req.method == "POST") {
    const post_id = req.body.post_id;
    const query = `SELECT comment_id, comment, commented_at, user_id, username FROM comments WHERE post_id = ${post_id} ORDER BY commented_at DESC`;

    db.query(query, (err, result) => {
      res.status(200).send(result);
    });
  }
}
