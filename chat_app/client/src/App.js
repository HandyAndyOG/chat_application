import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Chat from "./components/Chat";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Room/:id" element={<Chat />}></Route>
      </Routes>
    </div>
  );
};

export default App;
