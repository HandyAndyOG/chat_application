import './Login.css'
import { useContext } from 'react'
import { SocketContext } from '../SocketContext';
import { useNavigate } from 'react-router-dom';
import {ReactComponent as ReactLogo} from '../assets/media/chat.svg';



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
    <>
    <div className='app-header'>
        <h1 className="App__h1">ChatBox</h1>
        <span className="App__logo"><ReactLogo /></span>
    </div>
    <article className="login-container">
      <form className='login-container__form' onSubmit={joinChat}>
        <label className='login-container__form_label'>User: </label>
        <input placeholder='e.g. John..' className='login-container__form__input' type='text' onChange={(e) => setUser(e.target.value)} />
        <label className='login-container__form_label'>Room: </label>
        <input placeholder='e.g. Secret..' className='login-container__form__input' type='text' onChange={(e) => setRoom(e.target.value)} />
        <button className="login-container__form__button" type="submit">Join</button>
      </form>
    </article>
    </>

  )
}

export default Login