import express from "express";
import { addComment, getFeedPosts, getUserPosts, likePost, deletePost, editPost, deleteComment} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

//UPDATE
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment",verifyToken, addComment);
router.patch("/:id/edit", verifyToken, editPost);
router.patch("/:id/deleteComment", verifyToken, deleteComment);

//DELETE
router.delete("/:id/delete", verifyToken, deletePost);

export default router;
