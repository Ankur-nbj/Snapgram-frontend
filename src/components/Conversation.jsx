import React from 'react';
import { Badge, Box, Typography, useTheme } from '@mui/material';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import useConversation from '../zustand/useConversation';
import {useSocketContext} from 'context/SocketContext';

const Conversation = ({ user }) => {
  
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(user._id)

  const theme = useTheme();
  // const { main, primaryLight } = palette;

  return (
    <Box sx={{ padding: '0.5rem 1rem ', borderRadius: '0.25rem', backgroundColor: isSelected ? theme.palette.primary.main : theme.palette.background.alt }}
    onClick={() => setSelectedConversation(user)}
    >
      <FlexBetween gap="1rem">
            <Badge color="success" variant="dot" invisible= {isOnline ? false : true}>
        <UserImage image={user.picturePath} size="35px" sx={{ alignSelf: 'flex-start' }} />
            </Badge>

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            color={theme.palette.neutral.dark}
            variant="h5"
            fontWeight="500"
            sx={{
              '&:hover': {
                color: theme.palette.primary.light,
                cursor: 'pointer',
              },
            }}
          >
            {user.firstName} {user.lastName}
          </Typography>
        </Box>
      </FlexBetween>
    </Box>
  );
};

export default Conversation;
