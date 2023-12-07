import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

const MyCommentWidget = () => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    // Handle comment submission logic here
    console.log(comment);
  };

  return (
    <div>
      <TextField
        label="Comment"
        variant="outlined"
        value={comment}
        onChange={handleCommentChange}
      />
      <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default MyCommentWidget;
