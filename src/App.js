import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Obras from "./pages/Obras";
import ObrasDetalhe from "./pages/ObrasDetalhe";
import Fornecedores from "./pages/Fornecedores";
import Fases from "./pages/Fases";
import Unidades from "./pages/Unidades";
import Gerencial from "./pages/Gerencial";
import Usuarios from "./pages/Usuarios";
import Diario from "./pages/Diario";

function App() {
  return (
    <div className="App">
      <Toaster />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/obras" element={<Obras />} />
        <Route path="/gerencial" element={<Gerencial />} />
        <Route path="/diario" element={<Diario />} />
        <Route path="/obrasdetalhe/:compraID" element={<ObrasDetalhe />} />
        <Route path="/fornecedores" element={<Fornecedores />} />
        <Route path="/fases" element={<Fases />} />
        <Route path="/unidades" element={<Unidades />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Routes>
    </div>
  );
}

export default App;
