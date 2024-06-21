import React, { useEffect, useState, useRef } from "react";
import { Box, IconButton, InputAdornment, TextField, Typography, useTheme, CircularProgress, Avatar } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { Send } from "@mui/icons-material";
import Message from "components/Message";
import useConversation from "../../zustand/useConversation";
import { useSelector } from "react-redux";
import useGetMessages from "../../hooks/useGetMessages";
import useSendMessage from "../../hooks/useSendMessage"; 
import FlexBetween from "components/FlexBetween";
import useListenMessages from "hooks/useListenMessages";

const ConversationWidget = () => {
  const theme = useTheme();
  useListenMessages()
  const { selectedConversation } = useConversation();
  const { messages, loading: messagesLoading } = useGetMessages();
  const { sendMessage, loading: sendLoading } = useSendMessage();
  const [messageText, setMessageText] = useState("");
  const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return; 
    await sendMessage(messageText);
    setMessageText("");
    };

  return (
    <WidgetWrapper
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "82vh",
      }}
    >
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <FlexBetween
            sx={{
              justifyContent: "start",
              backgroundColor: "#37474F",
              px: 4,
              py: 2,
              borderRadius: "0.5rem",
              marginBottom: "0.1rem",
            }}
          >
            <Avatar alt="User Avatar" src={`https://snapgram-backend-7c1s.onrender.com/assets/${selectedConversation.picturePath}`} sx={{ width: '40px', height: '40px', mx: '12px' }} />
            <Typography
              variant="subtitle1"
              sx={{ color: "#FFFFFF", fontWeight: "bold" }}
            >
              {selectedConversation.firstName} {selectedConversation.lastName}
            </Typography>
          </FlexBetween>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              height: "80%",
              overflowY: "auto", 
              padding: "1rem",
              margin: "0.5rem 0",
              backgroundColor: theme.palette.background.default,
              borderRadius: "1rem",
              "&::-webkit-scrollbar": {
                width: "5px",
              },
              "&::-webkit-scrollbar-track": {
                background: theme.palette.neutral.main,
                margin: "15px",
                borderRadius: "2rem",
              },
              "&::-webkit-scrollbar-thumb": {
                background: theme.palette.neutral.medium,
                borderRadius: "5px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: theme.palette.background.default,
              },
            }}
          >
            {!messagesLoading && messages.length > 0 ? (
              messages.map((message) => (
                <Box key={message._id}  ref={lastMessageRef} >
                  <Message message={message} />
                </Box>
              ))
            ) : (
              <Typography textAlign="center" fontWeight="bold" fontSize="clamp(0.5rem, 0.75rem, 1rem)">
                {messagesLoading ? "Loading messages..." : "Send a message to start Conversation"}
              </Typography>
            )}
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              placeholder="Send a message"
              variant="outlined"
              fullWidth
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="large" edge="end" aria-label="send" type="submit">
                      {sendLoading ? <CircularProgress size={24} /> : <Send />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { borderRadius: "10px", },
              }}
            />
          </form>
        </>
      )}
    </WidgetWrapper>
  );
};

export default ConversationWidget;

const NoChatSelected = () => {
  const user = useSelector((state) => state.user);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: "100%",
      }}
    >
      <Typography
        fontWeight="bold"
        fontSize="clamp(1rem, 1.5rem, 2rem)"
        color="primary"
      >
        Welcome 👋 {user.firstName} {user.lastName} ❄
      </Typography>
      <Typography fontWeight="bold" fontSize="clamp(0.75rem, 1rem, 1.5rem)">
        Select a chat to start messaging
      </Typography>
    </Box>
  );
};
