import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import ConversationWidget from "scenes/widgets/ConversationWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import SidebarWidget from "scenes/widgets/SidebarWidget";

const ChatPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:800px)");
  const { _id} = useSelector((state) => state.user);

  return (
    <Box >
      <Navbar />


      <Box
        width="100%"
        padding="1.5rem 6% 0 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <SidebarWidget userId={_id}/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <ConversationWidget/>
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatPage;
