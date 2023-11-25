import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lobby from "./pages/Lobby";
import Code from "./pages/Code";
import './App.css';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/code/:title" element={<Code />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
