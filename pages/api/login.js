import db from "../../utils/dbConnect";
import { compare } from "bcryptjs";
import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  if (req.method == "POST") {
    const username = req.body.username.toLowerCase();
    const plainPassword = req.body.password;

    db.query(
      `SELECT * FROM users WHERE username = ${db.escape(username)}`,
      async (err, results) => {
        if (results.length == 0) {
          return res
            .status(404)
            .json({ message: "Username or password is not valid" });
        }

        if (results.length !== 0) {
          compare(
            plainPassword,
            results[0].password,
            async function (err, result) {
              if (result) {
                req.session.set("user", {
                  username: results[0].username,
                  user_id: results[0].user_id,
                });

                await req.session.save();
                return res.status(200).json({
                  message: "Logged in!",
                  user_id: results[0].user_id,
                  username: results[0].username,
                });
              } else {
                return res
                  .status(400)
                  .json({ message: "Username or password is not valid" });
              }
            }
          );
        }
      }
    );
  }
});
