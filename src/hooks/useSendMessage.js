import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { useSelector } from "react-redux";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const token = useSelector((state) => state.token);
  const host = process.env.REACT_APP_SERVER_URL;

  const sendMessage = async ({ text, image }) => {
    setLoading(true);
    try {
      const url = `${host}/messages/send/${selectedConversation._id}`;
      let body;
      let headers = {
        Authorization: `Bearer ${token}`,
      };

      if (image) {
        body = new FormData();
        body.append("text", text);
        body.append("image", image);
      } else {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify({ text });
      }

      const res = await fetch(url, {
        method: "POST",
        headers,
        body,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      const data = await res.json();
      setMessages([...messages, data]);
    } catch (error) {
      console.error('Error sending message:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
