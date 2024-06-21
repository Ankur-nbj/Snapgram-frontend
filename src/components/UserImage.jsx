import { Box } from "@mui/material";

const UserImage = ({ image, size="60px" , onClick}) => {
  return (
    <Box width={size} height={size}  sx={{"&:hover": {cursor: "pointer",},}}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`https://snapgram-backend-7c1s.onrender.com/assets/${image}`}
        onClick={onClick}
      />
    </Box>
  );
};

export default UserImage;
