import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import ModeToggle from "components/ModeToggle";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  
  return (
    
      <Box
        display="flex"
        height="100vh"
        justifyContent="center"
        alignItems="center"
        flexDirection={isNonMobileScreens ? "row" : "column"}
        
      >
        {/* Form Box */}
        <Box
          width={isNonMobileScreens ? "30%" : "60%"}
          p="0.5rem 2rem"
          m="0.5rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary" mx="25%">Snapgram</Typography>
          <Typography fontWeight="500" variant="h5" >
              To use snapgram, Please enter your details. 
          </Typography>
          <Form />
        </Box>
        
        {/* Side Image */}
        {isNonMobileScreens && (
          <Box
            component="img"
            src="./side-img.jpeg"
            alt="logo"
            sx={{
               height: "100vh",
              width: "50%",
              objectFit: "cover",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
        <ModeToggle/>
      </Box>
    
  );
};

export default LoginPage;
