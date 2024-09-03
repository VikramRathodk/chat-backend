import { Router } from "express";
import User from "../../../models/User.js";


const router = Router();

router.post("/", async (req, res) => {
  const { email, username, password,token } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = password == user.password;
    // await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

    user.token = token;
    await user.save();


    res.json({ "user":user, status: true, message: "You are logged in" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
export default router;
