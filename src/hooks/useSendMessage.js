import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { useSelector } from "react-redux";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const token = useSelector((state) => state.token);

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      console.log('Selected Conversation ID:', selectedConversation._id);
      console.log('Sending message:', message);
      console.log(token);
      const res = await fetch(`https://snapgram-backend-7c1s.onrender.com/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      const data = await res.json();
      setMessages([...messages, data]);
      console.log('Message sent successfully:', data);
    } catch (error) {
      console.error('Error sending message:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
