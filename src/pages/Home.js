import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>home</h1>
      <div>
        <Link to="/obras">Ir para Obras/Compras</Link>
      </div>
      <div>
        <Link to="/fornecedores">Ir para Fornecedores</Link>
      </div>
      <div>
        <Link to="/fases">Ir para Fases da Obra</Link>
      </div>
      <div>
        <Link to="/">Logout</Link>
      </div>
    </div>
  );
}

export default Home;
