import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../SocketContext";
import "./Chat.css";
import ChatCard from "./ChatCard";

const Chat = () => {
  const { socket, user, room, message, setMessage, chat, setChat } = useContext(SocketContext);
  const [otherUser, setOtherUser] = useState("");
  const [otherMessage, setOtherMessage] = useState([]);
  let allChats = chat.concat(otherMessage)

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message !== "") {
      await socket.emit("sendMessage", [...chat,{
        user: user,
        room: room,
        message: message,
        timestamp: new Date().toLocaleTimeString().replace(/:([^:]*)$/g, ""),
        sortTime: Date.now(),
        id: 1,
      }]);
      setChat([...chat,{
        user: user,
        room: room,
        message: message,
        timestamp: new Date().toLocaleTimeString().replace(/:([^:]*)$/g, ""),
        sortTime: Date.now(),
        id: 1,
      }]);
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setOtherUser(message[0].user);
      const otherMessageContent = message.map((message) => {
        return {
          user: message.user,
          room: message.room,
          message: message.message,
          timestamp: message.timestamp,
          sortTime: message.sortTime,
          id: 2,
        }
      })
      setOtherMessage(otherMessageContent)
    });
  }, [socket]);

  const sortedChat = allChats.sort((a,b) => a.sortTime - b.sortTime)
  return (
    <>
      <div className="chat-container">
        <p className="chat-name">{otherUser}</p>
        <div className="chat-box">
          {sortedChat? sortedChat.map((chatItem, index) => {
            return <ChatCard chatItem={chatItem} key={index}/>
          }): ''}
        </div>
      </div>
      <div className="chat-input">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="message.."
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">&#9658;</button>
        </form>
      </div>
    </>
  );
};

export default Chat;