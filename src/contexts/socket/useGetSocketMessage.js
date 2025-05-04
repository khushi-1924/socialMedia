import { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../../stateManagement/useConversation";
import sound from "../../assets/notification.wav";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      const notification = new Audio(sound);
      notification.play();
      setMessages([...messages, newMessage]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages]);
};

export default useGetSocketMessage;
