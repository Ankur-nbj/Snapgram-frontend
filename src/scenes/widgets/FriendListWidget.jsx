import { Box, Divider, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const host = process.env.REACT_APP_SERVER_URL;

  const getFriends = async () => {
    const response = await fetch(
      `${host}/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        >
        Friend List
      </Typography>
      <Divider sx={{ margin: "0.75rem 0 0.75rem 0" }}/>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.length >0 && friends.map((friend) => (
          <Box key={friend._id}>
            <Friend
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          </Box>
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;