import React from 'react';
import { Modal, Box } from '@mui/material';

const ImageModal = ({ isImageModalOpen, onClose, path }) => {
  return (
    <Modal
      open={isImageModalOpen}
      onClose={onClose}
    >
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          // borderRadius: '50%',
          p: 0,
          width: '50vw', // 50% of the viewport width
          height: '50vw', // 50% of the viewport height
          maxWidth: '400px', // Maximum width of 400px to maintain aspect ratio
          maxHeight: '400px', // Maximum height of 400px to maintain aspect ratio
        }}
      >
        <img
          src={`https://snapgram-backend-7c1s.onrender.com/assets/${path}`}
          alt="Full profile"
          style={{
            objectFit: 'cover',
            // borderRadius: '50%',
            width: '100%',
            height: '100%',
          }}
        />
      </Box>
    </Modal>
  );
};

export default ImageModal;
