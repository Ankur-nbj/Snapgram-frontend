import { Box } from "@mui/material";

const UserImage = ({ image, size="60px" , onClick}) => {
  const host = process.env.REACT_APP_SERVER_URL;
  return (
    <Box width={size} height={size}  sx={{"&:hover": {cursor: "pointer",},}}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${host}/assets/${image}`}
        onClick={onClick}
      />
    </Box>
  );
};

export default UserImage;
