import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import Comment from "components/Comment";
import WidgetWrapper from "components/WidgetWrapper";
import MyCommentWidget from "./MyCommentWidget";
import PostOptionModal from "components/PostOptionModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import MyPostWidget from "./MyPostWidget";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const role = useSelector((state)=> state.user.role);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleEditState = () => {
    console.log("handleEditState 9bal ma ttbadal= ", isEdit);
    setIsEdit(!isEdit);
    console.log("handleEditState ba3ad ma tbadlet = ", isEdit);
  }

  return (
    <WidgetWrapper m="2rem 0">
      <FlexBetween>
        {!isEdit && (
          <Friend
            friendId={postUserId}
            name={name}
            subtitle={location}
            userPicturePath={userPicturePath}
            postId={postId}
          />
        )}
        {(loggedInUserId === postUserId || role === "admin") && (
          <PostOptionModal
            postId={postId}
            handleEditState={handleEditState}
          />
        )}
        {isEdit && (
          <MyPostWidget
            picturePath={userPicturePath}
            method="PATCH"
            postId={postId}
            description={description}
            postImage={picturePath}
            handleEditState={handleEditState}
          />
        )}
      </FlexBetween>
      {!isEdit && (
        <>
          <Typography color={main} sx={{ mt: "1rem" }}>
            {description}
          </Typography>
          {picturePath && (
            <img
              width="100%"
              height="auto"
              alt="post"
              style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
              src={`http://localhost:3001/assets/${picturePath}`}
            />
          )}
          <FlexBetween mt="0.25rem">
            <FlexBetween gap="1rem">
              <FlexBetween gap="0.3rem">
                <IconButton onClick={patchLike}>
                  {isLiked ? (
                    <FavoriteOutlined sx={{ color: primary }} />
                  ) : (
                    <FavoriteBorderOutlined />
                  )}
                </IconButton>
                <Typography>{likeCount}</Typography>
              </FlexBetween>

              <FlexBetween gap="0.3rem">
                <IconButton onClick={() => setIsComments(!isComments)}>
                  <ChatBubbleOutlineOutlined />
                </IconButton>
                <Typography>{comments.length}</Typography>
              </FlexBetween>
            </FlexBetween>

            <IconButton>
              <ShareOutlined />
            </IconButton>
          </FlexBetween>
          {isComments && (
            <>
              <MyCommentWidget postId={postId} />
              <Box mt="0.5rem">
                {comments.map((comment, i) => (
                  <Box key={`${name}-${i}`}>
                    <Divider />
                    <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                      <Comment
                        author={comment.commentUsername}
                        content={comment.comment}
                      />
                    </Typography>
                  </Box>
                ))}
                <Divider />
              </Box>
            </>
          )}
        </>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
