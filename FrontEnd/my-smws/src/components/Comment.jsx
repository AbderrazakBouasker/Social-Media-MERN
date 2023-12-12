import React from "react";
import FlexBetween from "./FlexBetween";
import PostOptionModal from "./PostOptionModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import MyCommentWidget from "scenes/widgets/MyCommentWidget";

const Comment = ({ author, content, commentId, postId, commentUserId }) => {
  const [isEdit, setIsEdit] = useState(false);
  const loggedInUserId = useSelector((state) => state.user._id);
  const role = useSelector((state) => state.user.role);

  const handleEditState = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div className="comment">
      <FlexBetween>
        <h4>{author}</h4>
        {(commentUserId === loggedInUserId || role === "admin") && (
          <PostOptionModal
            postId={postId}
            subject="comment"
            commentId={commentId}
            handleEditState={handleEditState}
          />
        )}
      </FlexBetween>
      {isEdit && (
        <MyCommentWidget
          postId={postId}
          subject="edit"
          commentId={commentId}
          commentContent={content}
          handleEditState={handleEditState}
        />
      )}
      {!isEdit && <p>{content}</p>}
    </div>
  );
};

export default Comment;
