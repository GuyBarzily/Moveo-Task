import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lobby from "./pages/Lobby";
import Code from "./pages/Code";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/code/:id" element={<Code />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
