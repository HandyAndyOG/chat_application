import { createContext, useState } from "react";
import io from 'socket.io-client'
export const SocketContext = createContext("");

const socket = io.connect(process.env.REACT_APP_BACKEND)

const SocketProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [room, setRoom] = useState();
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  return (
    <SocketContext.Provider value={{ socket, user, setUser, room, setRoom, message, setMessage, chat, setChat }}>
      {children}
    </SocketContext.Provider>

  )
};

export default SocketProvider;
