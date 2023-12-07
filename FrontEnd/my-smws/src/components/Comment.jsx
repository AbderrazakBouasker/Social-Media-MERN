
import React from 'react';

const Comment = ({ author, content }) => {
  return (
    <div className="comment">
      <h4>{author}</h4>
      <p>{content}</p>
    </div>
  );
};

export default Comment;
