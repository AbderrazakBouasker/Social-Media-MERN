import React, { useState } from "react";
import { TextField, Button, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import FlexBetween from "components/FlexBetween";

const MyCommentWidget = ({
  postId,
  commentContent,
  commentId,
  subject = "comment",
  handleEditState,
}) => {
  const [comment, setComment] = useState(commentContent || "");
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const user = useSelector((state) => state.user);
  const fullName = `${user.firstName} ${user.lastName}`;
  const dispatch = useDispatch();

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/comment`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedInUserId,
          commentUsername: fullName,
          comment: comment,
        }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setComment("");
  };

  const handleCommentEdit = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/editComment`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: commentId,
          comment: comment,
        }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setComment("");
    handleEditState();
  };

  return (
    <FlexBetween gap="0.5rem" margin="0.3rem">
      <TextField
        label="Comment"
        variant="outlined"
        value={comment}
        onChange={handleCommentChange}
        multiline
        fullWidth
      />
      <Button
        disabled={!comment}
        onClick={
          subject === "comment" ? handleCommentSubmit : handleCommentEdit
        }
        sx={{
          color: palette.background.alt,
          backgroundColor: palette.primary.main,
          borderRadius: "3rem",
        }}
      >
        {subject === "comment" ? "Comment" : "Edit"}
      </Button>
    </FlexBetween>
  );
};

export default MyCommentWidget;
