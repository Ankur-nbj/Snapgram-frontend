import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { AddPhotoAlternateOutlined, Send, Videocam, Close, QuestionAnswerOutlined } from "@mui/icons-material";
import WidgetWrapper from "components/WidgetWrapper";
import Message from "components/Message";
import useConversation from "../../zustand/useConversation";
import { useSelector } from "react-redux";
import useGetMessages from "../../hooks/useGetMessages";
import useSendMessage from "../../hooks/useSendMessage";
import FlexBetween from "components/FlexBetween";
import useListenMessages from "hooks/useListenMessages";
import MessageSkeleton from "components/MessageSkeleton";
import {useSocketContext} from "context/SocketContext";


const ConversationWidget = () => {
  const theme = useTheme();
  useListenMessages();
  const { selectedConversation } = useConversation();
  const { messages, loading: messagesLoading } = useGetMessages();
  const { sendMessage, loading: sendLoading } = useSendMessage();
  const [messageText, setMessageText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const lastMessageRef = useRef();
  const { onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(selectedConversation?._id)
  const host = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageText.trim() && !selectedFile) return;

    const messageData = {
      text: messageText,
      image: selectedFile,
    };

    await sendMessage(messageData);
    setMessageText("");
    setSelectedFile(null);
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
              backgroundColor: "#37474F",
              marginBottom: "0.1rem",
              borderRadius: "0.5rem",
            }}
          >
            <FlexBetween
              sx={{
                justifyContent: "start",
                py: 2,
              }}
            >
              <Avatar
                alt="User Avatar"
                src={`${host}/assets/${selectedConversation.picturePath}`}
                sx={{ width: "40px", height: "40px", mx: "12px" }}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="title2"
                sx={{ color: "#FFFFFF", fontWeight: "bold" }}
              >
                {selectedConversation.firstName} {selectedConversation.lastName}
              </Typography>
              {isOnline && (
                  <Typography
                    variant="caption"
                    sx={{ color: "grey", textDecoration: "underline",
                      transition: "opacity 0.3s ease-in-out",
                      opacity: isOnline ? 1 : 0 }} 
                  >
                    Online
                  </Typography>
                )}
              </Box>
            </FlexBetween>
            <IconButton sx={{mx:"0.5rem", color: "white"}}>
              <Videocam sx={{ fontSize: "30px" }}/>
            </IconButton>
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
                <Box key={message._id} ref={lastMessageRef}>
                  <Message message={message} />
                </Box>
              ))
            ) : (
              <Typography
                textAlign="center"
                fontWeight="bold"
                fontSize="clamp(0.5rem, 0.75rem, 1rem)"
              >
                {messagesLoading
                  ? <MessageSkeleton/>
                  : "Send a message to start Conversation"}
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
                startAdornment: selectedFile && (
                  <InputAdornment position="start">
                    <Typography>{selectedFile.name}</Typography>
                    <IconButton size="small" onClick={handleFileRemove}>
                      <Close />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="file-input"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="file-input">
                      <IconButton component="span">
                        <AddPhotoAlternateOutlined
                          sx={{ color: theme.palette.neutral.mediumMain }}
                        />
                      </IconButton>
                    </label>
                    <IconButton
                      size="large"
                      edge="end"
                      aria-label="send"
                      type="submit"
                    >
                      {sendLoading ? <CircularProgress size={24} /> : <Send />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { borderRadius: "10px" },
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
      <IconButton sx={{fontWeight:"bold", fontSize:"400px", color: "dark"}} >
      <QuestionAnswerOutlined  />
      </IconButton>
    </Box>
  );
};
