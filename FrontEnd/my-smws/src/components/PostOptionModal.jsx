import React from "react";
import { useTheme, IconButton, Button, Menu, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { removePost, setPost } from "state";
import ListIcon from "@mui/icons-material/List";

const PostOptionModal = ({ postId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    handleClose();
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const deletedPost = await response.json();
      dispatch(removePost({ post: deletedPost }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleModify = async () => {
    handleClose();
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/edit`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // userId: loggedInUserId,
            // commentUsername: fullName,
            // comment: comment,
          }),
        }
      );
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        onClick={handleClick}
      >
        <ListIcon sx={{ color: primaryDark }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleDelete}>
          Delete
          <IconButton>
            <Delete />
          </IconButton>
        </MenuItem>
        <MenuItem onClick={handleModify}>
          Modify
          <IconButton>
            <Edit />
          </IconButton>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default PostOptionModal;
