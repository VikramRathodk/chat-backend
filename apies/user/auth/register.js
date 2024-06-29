import { Router } from "express";
const router = Router();
import User from "../../../models/User.js";

router.post("/", async (req, res) => {
  const { email, username, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .send({ message: "Username and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ status: false, message: "Username already exists" });
    }

    const newUser = new User({ email, username, password });
    await newUser.save();

    res
      .status(201)
      .send({
        status: true,
        message: "User registered successfully",
      });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: false, message: "Server error" });
  }
});

export default router;
