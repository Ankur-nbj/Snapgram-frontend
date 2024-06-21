import React from 'react';
import { IconButton } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { setMode } from 'state'; // Adjust the path if needed

const ModeToggle = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode); // Ensure correct path to mode state

  const handleModeToggle = () => {
    dispatch(setMode());
  };

  return (
    <IconButton
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px', // Adjusted to bottom left corner
        backgroundColor: '#ffffff', // Background color of the button
        zIndex: 1000, // Ensure it's above other content
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', // Optional: Add a shadow for depth
      }}
      onClick={handleModeToggle}
    >
      {mode === 'dark' ? <LightMode style={{ color: '#03a9f4' }} /> : <DarkMode style={{ color: '#607d8b' }} />}
    </IconButton>
  );
};

export default ModeToggle;
