import React, { useState, useEffect } from "react";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  Popover,
  IconButton,
  MenuItem,
  Collapse,
  Alert
} from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImageModal from "components/ImageModal";
import EditProfile from "components/EditProfile";
import { deleteUserThunk } from "state/authThunks";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleManageAccountsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUser = async () => {
    try {
      const response = await fetch(`https://snapgram-backend-7c1s.onrender.com/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  };

  const deleteUser = () => {
    dispatch(deleteUserThunk(userId))
      .then(() =>{
         navigate("/")
        })
      .catch((error) => console.error("Error deleting account:", error));
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  const handleEditProfileClick = () => {
    setIsEditModalOpen(true);
    handleClose();
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditProfileSubmit = async (formData) => {
    try {
      const form = new FormData();
      form.append("firstName", formData.firstName);
      form.append("lastName", formData.lastName);
      form.append("location", formData.location);
      form.append("occupation", formData.occupation);
      form.append("picturePath", formData.profilePicturePath);

  
      const response = await fetch(`https://snapgram-backend-7c1s.onrender.com/users/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });
  
      if (response.ok) {
        const updatedUserData = await response.json();
        setUser(updatedUserData);
        setAlertType("success")
        setAlertMessage("User details updated successfully.");
        setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
        }, 2000);
      } 
    } catch (error) {
      console.error("Error updating user:", error.message);
      setAlertType("error")
      setAlertMessage("An unexpected error occurred. Please try again.");
      setOpenAlert(true);
      setTimeout(() => {
        setOpenAlert(false);
      }, 2000);
    } finally {
      setIsEditModalOpen(false);
    }
  };
  
  

  return (
    <WidgetWrapper>
       <Collapse in={openAlert} sx={{ gridColumn: "span 4" }}>
           <Alert
            severity={alertType}
            sx={{ mb: 2 }}
           >
            {alertMessage}
          </Alert>
        </Collapse>
      {/* FIRST ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} onClick={() => setIsImageModalOpen(true)} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/profile/${userId}`)}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends?.length} friends</Typography>
          </Box>
        </FlexBetween>
        <IconButton onClick={handleManageAccountsClick}>
          <ManageAccountsOutlined />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Box py={1}>
            <MenuItem onClick={handleEditProfileClick}>
              <EditOutlined /> Edit Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={deleteUser}>
              <DeleteOutlined /> Delete Account
            </MenuItem>
          </Box>
        </Popover>
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>

      <EditProfile
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSubmit={handleEditProfileSubmit}
        user={user}
        profilePicturePath={picturePath}
      />
      <ImageModal isImageModalOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} path={picturePath} />
    </WidgetWrapper>
  );
};

export default UserWidget;
