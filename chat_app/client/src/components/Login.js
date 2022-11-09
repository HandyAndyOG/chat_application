import './Login.css'
import { useContext } from 'react'
import { SocketContext } from '../SocketContext';

const Login = () => {
  const { socket, user, setUser, room, setRoom } = useContext(SocketContext)
  

  const joinChat = (e) => {
    e.preventDefault();
    if(user && room) {
      socket.emit('joinChat', room, user)
    }
  }
  return (
    <article className="login-container">
      <form className='login-container__form' onSubmit={joinChat}>

      <label>User: </label>
      <input type='text' onChange={(e) => setUser(e.target.value)} />
      <label>Room: </label>
      <input type='text' onChange={(e) => setRoom(e.target.value)} />
      <button  type="submit">Join</button>
      </form>
    </article>

  )
}

export default Login