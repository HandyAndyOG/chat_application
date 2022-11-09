import { createContext, useState } from "react";
import io from 'socket.io-client'
export const SocketContext = createContext("");

const socket = io.connect('http://localhost:8080')

const SocketProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [room, setRoom] = useState();
  const [message, setMessage] = useState();

  return (
    <SocketContext.Provider value={{ socket, user, setUser, room, setRoom, message, setMessage }}>
      {children}
    </SocketContext.Provider>

  )
};

export default SocketProvider;
