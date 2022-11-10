import { useContext, useEffect, useState, useRef } from "react";
import { SocketContext } from "../SocketContext";
import "./Chat.css";
import ChatCard from "./ChatCard";
import ChatOtherCard from "./ChatOtherCard";

const Chat = () => {
  const { socket, user, room, message, setMessage, chat, setChat } = useContext(SocketContext);
  const [otherUser, setOtherUser] = useState("");
  const [otherMessage, setOtherMessage] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message !== "") {
      await socket.emit("sendMessage", [...chat,{
        user: user,
        room: room,
        message: message,
        timestamp: new Date().toLocaleTimeString().replace(/:([^:]*)$/g, ""),
      }]);
      setChat([...chat,{
        user: user,
        room: room,
        message: message,
        timestamp: new Date().toLocaleTimeString().replace(/:([^:]*)$/g, ""),
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
        }
      })
      setOtherMessage(otherMessageContent)
    });
  }, [socket]);

  console.log(otherMessage, 'here is other message');
  return (
    <>
      <div className="chat-container">
        <p className="chat-name">{otherUser}</p>
        <div className="chat-box">
          {otherMessage? otherMessage.map((chatOtherItem, index) => {
            return <ChatOtherCard chatOtherItem={chatOtherItem} key={index}/>
          }): ''}
          {chat? chat.map((chatItem, index) => {
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
