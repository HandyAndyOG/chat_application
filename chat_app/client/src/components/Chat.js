import { useContext, useEffect } from "react";
import { SocketContext } from "../SocketContext";

const Chat = () => {
  const { socket, user, room, message, setMessage } = useContext(SocketContext);

  const sendMessage = async() => {
    if(message !== '') {
      const messageContent = {
        user: user,
        room: room,
        message: message,
        timestamp: new Date().toLocaleTimeString().replace(/:([^:]*)$/g, '')
      }
      await socket.emit('sendMessage', messageContent)
    }
  }

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      console.log(message);
    })
  }, [socket])

  return (
    <>
      <p>Here is the id: {socket.id}</p>
      <p>Here is the username: {user}</p>
      <p>Here is the room: {room}</p>
      <div className="chat-content"></div>
      <div className="chat-textbox">
        <input type="text" placeholder="message.." onChange={(e) => setMessage(e.target.value)}/>
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </>
  );
};

export default Chat;
