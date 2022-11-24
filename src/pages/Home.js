import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>home</h1>
      <div>
        <Link to="/obras">Ir para Obras/Compras</Link>
      </div>
      <br></br>
      <div>
        <Link to="/gerencial">Ir para Consultas e gráficos gerenciais</Link>
      </div>
      <br></br>
      <div>
        <Link to="/diario">Ir para Diário de Obras</Link>
      </div>
      <br></br>
      <div>
        <Link to="/fornecedores">Ir para Fornecedores</Link>
      </div>
      <br></br>
      <div>
        <Link to="/fases">Ir para Fases da Obra</Link>
      </div>
      <br></br>
      <div>
        <Link to="/unidades">Ir para Unidades</Link>
      </div>
      <br></br>
      <div>
        <Link to="/usuarios">Ir para Usuários</Link>
      </div>
      <br></br>
      <div>
        <Link to="/">Logout</Link>
      </div>
    </div>
  );
}

export default Home;
