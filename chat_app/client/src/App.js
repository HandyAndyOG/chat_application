import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Chat from "./components/Chat";
import {ReactComponent as ReactLogo} from './assets/media/chat.svg';

const App = () => {
  return (
    <div className="App">
      <div className='app-header'>
        <h1 className="App__h1">ChatBox</h1>
        <span className="App__logo"><ReactLogo /></span>
    </div>
      
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Room/:id" element={<Chat />}></Route>
      </Routes>
    </div>
  );
};

export default App;
