import User from "../schemas/userSchema.mjs";

export default async function adminAuth(req, res, next) {
  // Get user Id from req.user
  const id = req.user.id;

  try {
    // Get user object (only isAdmin prop) from DB
    const user = await User.findById(id).select("isAdmin");

    // If no user return error
    if (!user)
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });

    // if user admin go on else throw error
    if (user.isAdmin) {
      next();
    } else {
      throw new Error("You shall not pass!!");
    }
  } catch (err) {
    console.error(err);
    res.status(403).json({ errors: [{ msg: err.message }] });
  }
}