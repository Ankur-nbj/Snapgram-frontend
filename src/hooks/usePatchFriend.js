import { useDispatch, useSelector } from "react-redux";
import {setFriends} from "state";

const usePatchFriend = () => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const host = process.env.REACT_APP_SERVER_URL;

  const patchFriend = async (friendId) => {
    try {
      const response = await fetch(
        `${host}/users/${_id}/${friendId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error("Error updating friend status:", error);
    }
  };

  return patchFriend;
};

export default usePatchFriend;
