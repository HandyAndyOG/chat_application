import './Login.css'
import { useContext } from 'react'
import { SocketContext } from '../SocketContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const { socket, user, setUser, room, setRoom } = useContext(SocketContext)
  const navigate = useNavigate();

  const joinChat = (e) => {
    e.preventDefault();
    if(user && room) {
      socket.emit('joinChat', room, user)
    }
    navigate(`/Room/${room}`)
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