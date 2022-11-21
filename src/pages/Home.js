import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>Controle de Obras</h1>
      <div>
        <Link to="/obras">Ir para obras</Link>
      </div>
      <div>
        <button>Detalhe Obras</button>
      </div>
      <div>
        <button>Compras</button>
      </div>
      <div>
        <button>Diário de Obras</button>
      </div>
      <Link to="/">Volte para home page</Link>
    </div>
  );
}

export default Home;
