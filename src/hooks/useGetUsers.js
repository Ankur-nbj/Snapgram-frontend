import { useEffect, useState } from "react";
import {useSelector} from "react-redux";

const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.token);
  const host = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${host}/users`,{
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []); // Empty dependency array to run only once on mount

  return { loading, users };
};

export default useGetUsers;
