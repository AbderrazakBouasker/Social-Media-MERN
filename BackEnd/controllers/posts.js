import Post from "../models/Post.js";
import User from "../models/User.js";

//CREATE
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

//READ
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//READ BY USER
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//UPDATE
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//UPDATE
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, commentUsername, comment } = req.body;
    const post = await Post.findById(id);
    const newComment = {
      userId,
      commentUsername,
      comment,
    };
    post.comments.push(newComment);
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//UPDATE
export const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, picturePath } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { description, picturePath },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//UPDATE
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.body;
    const post = await Post.findById(id);
    const index = post.comments.findIndex(
      (comment) => comment._id.toString() === _id
    );
    post.comments.splice(index, 1);
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//UPDATE
export const editComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, comment } = req.body;
    const post = await Post.findById(id);
    const index = post.comments.findIndex(
      (comment) => comment._id.toString() === _id
    );
    post.comments[index].comment = comment;
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//DELETE
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
