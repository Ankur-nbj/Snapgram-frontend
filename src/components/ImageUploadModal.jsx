import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { ImageOutlined, Close } from "@mui/icons-material";
import WidgetWrapper from "./WidgetWrapper";

const ImageUploadModal = ({ open, handleClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // handleImageSubmit(selectedImage);
    setSelectedImage(null);
    handleClose();
  };
  const handleModalClose =() => {
   setSelectedImage(null);
   handleClose();
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <WidgetWrapper>
        <DialogTitle>
          <Typography variant="h3" gutterBottom>Upload Image</Typography>
          <Divider />
          <IconButton
            aria-label="close"
            onClick={handleModalClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <WidgetWrapper sx={{mt: "0",   pt: "0"}}>
          <DialogContent>
            <input accept="image/*" type="file" onChange={handleImageChange} />
            {selectedImage && (
              <Box  sx={{maxHeight: "15rem", maxWidth: "15rem", mt:"0.5rem"}}>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  style={{ maxWidth: "100%" }}
                />
              </Box>
            )}
          </DialogContent>
        </WidgetWrapper>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={!selectedImage}
            variant="contained"
          >
            Upload
          </Button>
        </DialogActions>
      </WidgetWrapper>
    </Dialog>
  );
};

export default ImageUploadModal;
