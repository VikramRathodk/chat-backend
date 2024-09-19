import { Router } from "express";
import User from "../../../models/User.js";
const router = Router();

const { db } = require("../../../config/firebase/firebase_config.js");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    const userChats = await Promise.all(
      users.map(async (user) => {
        const chatRef = db
          .collection("conversations")
          .doc(user._id.toString())
          .collection("messages");
        const messagesSnapshot = await chatRef
          .orderBy("timestamp", "desc")
          .limit(1)
          .get();

        let latestMessage = null;
        if (!messagesSnapshot.empty) {
          latestMessage = messagesSnapshot.docs[0].data();
        }

        return {
          ...user.toObject(),
          lastMessage: latestMessage,
        };
      })
    );

    res.status(200).json(userChats);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
});

export default router;

