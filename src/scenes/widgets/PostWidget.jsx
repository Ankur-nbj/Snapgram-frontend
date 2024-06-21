import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost, deletePost } from 'state';
import { Box, Divider, IconButton, InputBase, Typography, useTheme, Collapse, Alert } from '@mui/material';
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined, DeleteOutlined, Send } from '@mui/icons-material';
import WidgetWrapper from 'components/WidgetWrapper';
import FlexBetween from 'components/FlexBetween';
import Friend from 'components/Friend';

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
  loggedInUserId,
  isProfile,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [comment, setComment] = useState('');
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user); // Ensure this line is present and correct
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`https://snapgram-backend-7c1s.onrender.com/posts/${postId}/like`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://snapgram-backend-7c1s.onrender.com/posts/${postId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        dispatch(deletePost({ postId }));
      } 
    } catch (error) {
      setAlertType("error")
      setAlertMessage("An unexpected error occurred. Please try again.");
      setOpenAlert(true);
      setTimeout(() => {
        setOpenAlert(false);
      }, 2000);  
    }
  };

  const addComment = async () => {
    const response = await fetch(`https://snapgram-backend-7c1s.onrender.com/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: user._id, userName: `${user.firstName} ${user.lastName}`, text: comment }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setComment('');
  };

  return (
    <WidgetWrapper m="2rem 0">
    <Collapse in={openAlert} sx={{ gridColumn: "span 4" }}>
      <Alert
        severity={alertType}
        sx={{ mb: 2 }}
      >
        {alertMessage}
      </Alert>
    </Collapse>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Divider sx={{ margin: "0.75rem 0 0rem 0" }}/>
      <Typography color={main} sx={{ mt: '1rem' }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          src={`https://snapgram-backend-7c1s.onrender.com/assets/${picturePath}`}
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
        <FlexBetween>
          {postUserId === loggedInUserId && isProfile && (
            <IconButton onClick={handleDelete}>
              <DeleteOutlined />
            </IconButton>
          )}
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map(({ userName, text }, i) => (
            <Box key={`${userName}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                <strong>{userName}:</strong> {text}
              </Typography>
            </Box>
          ))}
          <Divider />
          <FlexBetween gap="0.75rem">
            <InputBase
              placeholder={`Add a comment for ${name}`}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              sx={{
                width: '100%',
                backgroundColor: palette.neutral.light,
                borderRadius: '0.75rem',
                padding: '0.5rem 2rem',
                margin: '0.5rem 0',
              }}
            />
            <IconButton
              onClick={addComment}
              style={{
                backgroundColor: palette.neutral.light,
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                margin: '0.5rem 0',
              }}
            >
              <Send />
            </IconButton>
          </FlexBetween>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
