import React from "react";
import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { extractTime } from "../utils/extractTime";
import useConversation from "../zustand/useConversation";

const Message = ({ message }) => {
  const user = useSelector((state) => state.user);
  const { selectedConversation } = useConversation();
  const theme = useTheme();

  const fromMe = message.senderId === user._id;
  const formattedTime = extractTime(message.createdAt);
  const flexDirection = fromMe ? "row-reverse" : "row";
  const picturePath = fromMe
    ? user.picturePath
    : selectedConversation?.picturePath;
  const bubbleBgColor = fromMe
    ? theme.palette.primary.main
    : theme.palette.neutral.main;
    const host = process.env.REACT_APP_SERVER_URL;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: flexDirection,
        alignItems: "flex-start",
        marginBottom: "0.5rem",
      }}
    >
      <Avatar
        alt="User Avatar"
        src={`${host}/assets/${picturePath}`}
        sx={{ width: "25px", height: "25px", mx: "12px" }}
      />

      {message.text  && (
        <Box
          sx={{
            backgroundColor: bubbleBgColor,
            color: theme.palette.getContrastText(bubbleBgColor),
            borderRadius: "5px",
            padding: "0.25rem 0.5rem",
            maxWidth: "60%",
            wordWrap: "break-word",
          }}
        >
          <Typography variant="body1">{message.text}</Typography>
        </Box>
      )}
      {message.imageUrl && (
        <Box sx={{maxWidth: "50%",   p: "0.5rem", boxShadow: "inherit", borderRadius:"5px" , background:"white"}}>

        <img
          src={`${host}/assets/${message.imageUrl}`}
          alt="Sent "
          style={{ maxWidth: "100%", borderRadius: "5px" }}
          />

         </Box>
      )}
      <Typography
        variant="caption"
        sx={{
          mx: "0.5rem",
          opacity: 0.7,
          fontSize: "0.75rem",
          mt: "1rem",
          alignSelf: "flex-end",
        }}
      >
        {formattedTime}
      </Typography>
    </Box>
  );
};

export default Message;
