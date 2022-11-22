import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>home</h1>
      <div>
        <Link to="/obras">Ir para obras</Link>
      </div>
      <div>
        <Link to="/">Sair</Link>
      </div>
    </div>
  );
}

export default Home;
