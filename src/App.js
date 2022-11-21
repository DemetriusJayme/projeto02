import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Obras from "./pages/Obras";
import ObrasDetalhe from "./pages/ObrasDetalhe";

function App() {
  return (
    <div className="App">
      <Toaster />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/obras" element={<Obras />} />
      </Routes>
    </div>
  );
}

export default App;
