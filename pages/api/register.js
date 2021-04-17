import db from "../../utils/dbConnect";
import { hash } from "bcryptjs";
import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  if (req.method == "POST") {
    const username = req.body.username.toLowerCase();
    const plainPassword = req.body.password;
    const hashedPassword = await hash(plainPassword, 10);

    const postData = { username, password: hashedPassword };

    db.query(`INSERT INTO users SET ?`, postData, async (err, result) => {
      if (err) {
        if (err.code == "ER_DUP_ENTRY") {
          return res.status(403).json({ message: "Username already exists." });
        } else {
          return res.status(400).json({ message: "Something went wrong." });
        }
      }

      db.query(
        `SELECT user_id, username FROM users WHERE username = ${db.escape(
          username
        )}`,
        async (err, results) => {
          req.session.set("user", {
            username: results[0].username,
            user_id: results[0].user_id,
          });

          await req.session.save();

          return res.status(201).json({
            message: "Account created successfully",
            user_id: results[0].user_id,
            username: results[0].username,
          });
        }
      );
    });
  }
});
