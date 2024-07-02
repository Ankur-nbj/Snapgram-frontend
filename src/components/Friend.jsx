import React, { useState } from "react";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import ImageModal from "./ImageModal";
import usePatchFriend from "hooks/usePatchFriend"; // Adjust the path as necessary

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  
  const isFriend = friends && friends.length > 0 ? friends.find((friend) => friend._id === friendId) : false;

  const patchFriend = usePatchFriend();

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const toggleImageModal = () => {
    setIsImageModalOpen(!isImageModalOpen);
  };

  return (
    <>
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserImage
            image={userPicturePath}
            size="55px"
            onClick={toggleImageModal}
          />
          <Box
            onClick={() => {
              navigate(`/profile/${friendId}`);
              navigate(0); // Ensure the profile page reloads
            }}
          >
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: primaryLight,
                  cursor: "pointer",
                },
              }}
            >
              {name}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
              {subtitle}
            </Typography>
          </Box>
        </FlexBetween>
        {friendId !== _id && (
          <IconButton
            onClick={() => patchFriend(friendId)}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          >
            {isFriend ? (
              <PersonRemoveOutlined sx={{ color: primaryDark }} />
            ) : (
              <PersonAddOutlined sx={{ color: primaryDark }} />
            )}
          </IconButton>
        )}
      </FlexBetween>
      <ImageModal
        isImageModalOpen={isImageModalOpen}
        onClose={toggleImageModal}
        path={userPicturePath}
      />
    </>
  );
};

export default Friend;
