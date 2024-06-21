import React from 'react';
import { Avatar, Box, Typography, useTheme } from '@mui/material';
import {useSelector} from 'react-redux';
import {extractTime} from '../utils/extractTime';
import useConversation from '../zustand/useConversation';


const Message = ({message}) => {
  const user = useSelector((state) => state.user)
  const { selectedConversation } = useConversation();
  const theme = useTheme();
  const fromMe = message.senderId === user._id;
   const formattedTime = extractTime(message.createdAt);
 const flexDirection = fromMe ? 'row-reverse' : 'row';
  const picturePath = fromMe ? user.picturePath : selectedConversation?.picturePath;
  const bubbleBgColor = fromMe ? theme.palette.primary.main : theme.palette.neutral.main;
  // const shakeClass = message.shouldShake ? 'shake' : '';

  return (
        <Box
      sx={{
        display: 'flex',
        flexDirection: {flexDirection},
        alignItems: 'center', // Adjust as needed
      }}
    >
      {/* Avatar */}
      
      <Avatar alt="User Avatar" src={`https://snapgram-backend-7c1s.onrender.com/assets/${picturePath}`} sx={{ width: '25px', height: '25px', mx: '12px' }} />

      <Box
        sx={{
          backgroundColor: bubbleBgColor,
          color: theme.palette.getContrastText(bubbleBgColor),
          borderRadius: '5px',
          padding: '0.1rem 0.5rem',
          maxWidth: '40%', 
          wordWrap: 'break-word',
        }}
      >
        <Typography variant="body1">{message.message}</Typography>
      </Box>

      <Box sx={{ opacity: 0.7, fontSize: '0.2rem', mx: '8px', alignSelf: 'flex-end', mt:"1rem" }}>
        {formattedTime}
      </Box>
    </Box>
  );
};

export default Message;
