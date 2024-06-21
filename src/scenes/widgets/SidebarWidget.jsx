import React from 'react';
import { Box, useTheme } from '@mui/material';
import Conversation from 'components/Conversation';
import WidgetWrapper from 'components/WidgetWrapper';
import SearchInput from 'components/SearchInput';
import useGetUsers from 'hooks/useGetUsers'; 

const SidebarWidget = () => {
  const theme = useTheme();
  const { loading, users } = useGetUsers(); 

  return (
    <WidgetWrapper>
      <Box height="75vh">
        <Box>
          <SearchInput users={users} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            height: '85%',
            overflow: 'auto',
            padding: '1rem',
            backgroundColor: theme.palette.background.default,
            borderRadius: '1rem',
            '&::-webkit-scrollbar': {
              width: '5px',
            },
            '&::-webkit-scrollbar-track': {
              background:
                theme.palette.neutral.main,
              margin: '15px',
              borderRadius: '2rem',
            },
            '&::-webkit-scrollbar-thumb': {
              background:
                theme.palette.neutral.medium,
              borderRadius: '5px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background:
              theme.palette.background.default,
            },
          }}
        >
          {users.map((user) => (
            <Conversation
              key={user._id} 
              user={user} 
              // lastIdx={idx === users.length - 1}
            />
          ))}
         
          {loading && <span className='loading loading-spinner mx-auto'></span>}
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default SidebarWidget;
