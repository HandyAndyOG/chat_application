import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { SocketContext } from "../SocketContext";
import "./Chat.css";
import './Login.css'
import ChatCard from "./ChatCard";

const Chat = () => {
  const { socket, user, room, message, setMessage, chat, setChat } = useContext(SocketContext);
  const [otherMessage, setOtherMessage] = useState([]);
  const [all, setAll] = useState([])
  const scrollChat = useRef(null)
  const navigate = useNavigate();

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message) {
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
    
    setMessage('');
  };
  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
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

  useEffect(() => {
    const allMessages = chat.concat(otherMessage)
    setAll(allMessages)
    scrollChat.current.scrollIntoView({ behavior: "smooth",  block: "nearest",
    inline: "start"})
  }, [chat, otherMessage])

  const leaveChat = () => {
    if(user && room) {
      socket.emit('leaveChat', room, user)
      setAll([])
      setMessage([])
      setOtherMessage([])
    }
    navigate('/')
  }

  return (
    <>
      <div className="chat-container">
        <div className="chat-header-bar">

      <span className="login-container__form__button" onClick={leaveChat}>Logout</span><p className="chat-name">{room}</p>
        </div>
        <div className="chat-box" >
          {all? all.sort((a,b) => a.sortTime - b.sortTime).map((chatItem, index) => {
            return <ChatCard chatItem={chatItem} key={index}/>
          }): ''}
          <div ref={scrollChat} />
        </div>
      
      <div className="chat-input">
        <form className="chat-input_form" onSubmit={sendMessage}>
          <input className="chat-input_input"
            type="text"
            placeholder="message.."
            onChange={handleChange}
            value={message}
          />
          <button className="chat-input_button" type="submit">&#9658;</button>
        </form>
        </div>
        </div>
        
      
    </>
  );
};

export default Chat;