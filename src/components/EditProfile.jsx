import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import Dropzone from "react-dropzone";
import FlexBetween from "./FlexBetween";

const EditProfile = ({ open, onClose, onSubmit, user, profilePicturePath }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    location: user.location || "",
    occupation: user.occupation || "",
    profilePicturePath: profilePicturePath || "",
  });

  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const medium = palette.neutral.medium;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDropzoneChange = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFormData({
      ...formData,
      profilePicturePath: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass formData to parent component for submission
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Edit Profile
        </Typography>
        <Divider sx={{ margin: "1rem 0" }} />
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="20px"
            gridTemplateColumns="repeat(1, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="First Name"
              fullWidth
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <TextField
              label="Last Name"
              fullWidth
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <TextField
              label="Location"
              fullWidth
              name="location"
              id="location"
              value={formData.location}
              onChange={handleInputChange}
            />
            <TextField
              label="Occupation"
              fullWidth
              name="occupation"
              id="occupation"
              value={formData.occupation}
              onChange={handleInputChange}
            />
            <Box
              border={`1px solid ${medium}`}
              borderRadius="5px"
              mb="1rem"
              p="1rem"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) => handleDropzoneChange(acceptedFiles)}
              >
                {({ getRootProps, getInputProps }) => (
                  <FlexBetween>
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      width="100%"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      <FlexBetween>
                        <Typography>
                          {formData.profilePicturePath
                            ?formData.profilePicturePath.name ||formData.profilePicturePath
                            : "Upload Profile Picture"}
                        </Typography>
                        <EditOutlined />
                      </FlexBetween>
                    </Box>
                  </FlexBetween>
                )}
              </Dropzone>
            </Box>
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditProfile;
