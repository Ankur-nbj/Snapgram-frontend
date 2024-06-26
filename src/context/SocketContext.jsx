import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import {useSelector} from "react-redux";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const  user  = useSelector((state) => state.user);
	const host = process.env.REACT_APP_SERVER_URL;

	useEffect(() => {
		if (user) {
			const socket = io(`${host}`, {
				query: {
					userId: user._id,
				},
			});

			setSocket(socket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [user]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
