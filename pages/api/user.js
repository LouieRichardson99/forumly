import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  const user = req.session.get("user");

  if (user) {
    return res.json({
      ...user,
    });
  }
});
