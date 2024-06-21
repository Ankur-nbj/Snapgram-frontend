import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation"
import {useSelector} from "react-redux";


const useGetMessages = () => {
 const [loading, setLoading] = useState(false);
 const {messages, setMessages, selectedConversation } = useConversation();
 const token = useSelector((state) => state.token)

 useEffect(() => {
  const getMessages = async () => {
   setLoading(true);
   try {
    const res = await fetch(`https://snapgram-backend-7c1s.onrender.com/messages/${selectedConversation._id}`,{
     method: "GET",
     headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
     throw new Error(`HTTP error! Status: ${res.status}`);
   }
   const data = await res.json();
   setMessages(data);
   } catch (error) {
    console.error(error.message)
   } finally {
    setLoading(false);
   }
  }
  if(selectedConversation?._id) getMessages();
 }, [selectedConversation?._id, setMessages]);
 return {messages, loading}
}

export default useGetMessages;