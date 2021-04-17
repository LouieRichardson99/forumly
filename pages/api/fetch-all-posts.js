import db from "../../utils/dbConnect";

export default function handler(req, res) {
  if (req.method == "GET") {
    const query = `SELECT post_id, users.user_id, username, title, content, published_at 
        FROM posts 
        LEFT JOIN users 
        ON posts.user_id = users.user_id 
        ORDER BY published_at DESC`;

    db.query(query, (err, result) => {
      res.status(200).json({ posts: result });
    });
  }
}
