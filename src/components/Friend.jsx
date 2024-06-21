import React, { useState } from "react";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween"; 
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import ImageModal from "./ImageModal";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state)=>state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  
  const isFriend = friends && friends.length > 0 ? friends.find((friend) => friend._id === friendId) : false;


  const patchFriend = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${_id}/${friendId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );


      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error("Error updating friend status:", error);
    }
  };

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
            onClick={patchFriend}
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
