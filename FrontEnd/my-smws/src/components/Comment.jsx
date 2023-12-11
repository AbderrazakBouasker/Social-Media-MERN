
import React from 'react';
import FlexBetween from './FlexBetween';
import PostOptionModal from './PostOptionModal';

const Comment = ({ author, content }) => {
  return (
    <div className="comment">
      <FlexBetween>
        <h4>{author}</h4>
        <PostOptionModal/>
      </FlexBetween>
      <p>{content}</p>
    </div>
  );
};

export default Comment;
