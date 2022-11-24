import {
  Table,
  Container,
  Button,
  ProgressBar,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalCreateCompras from "../components/ModalCreateCompras";
import { Link } from "react-router-dom";

function HomePage() {
  const [compras, setCompras] = useState([]);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      //const response = await axios.get("https://ironrest.herokuapp.com/enap92");
      const response = await axios.get(
        "https://ironrest.cyclic.app/demetriusjayme"
      );
      setCompras(response.data);
    }

    fetchUsers();
  }, [reload]);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <div>
      <Container>
        <h1>Obras/Compras</h1>
        <FloatingLabel
          controlId="floatingInput"
          label="Pesquise por contrato/obra/produto ou serviço/fase/fornecedor"
          className="my-3"
        >
          <Form.Control
            type="text"
            placeholder="pesquise"
            value={search}
            onChange={handleSearch}
          />
        </FloatingLabel>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Contrato</th>
              <th>Obra</th>
              <th>Produto/Serviço</th>
              <th>fase</th>
              <th>Fornecedor</th>
              <th>Valor</th>
              <th>Action</th>
            </tr>
          </thead>
          {/*           <tfoot>
            <h1>Valor total da compras:</h1>
          </tfoot> */}
          <tbody>
            {compras
              .filter((compra) => {
                return (
                  compra.contrato
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  compra.nomeObra
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  compra.nomeProdutoServico
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  compra.faseObra
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  compra.nomeFornecedor
                    .toLowerCase()
                    .includes(search.toLowerCase())
                );
              })
              .map((compra) => {
                console.log(+compra.qtde *
                        (+compra.valorUnitario - +compra.valorDesconto))
                return (
                  <tr key={compra._id}>
                    <td>{compra.contrato}</td>
                    <td>{compra.nomeObra}</td>
                    <td>{compra.nomeProdutoServico}</td>
                    <td>{compra.faseObra}</td>
                    <td>{compra.nomeFornecedor}</td>
                    <td>
                      {+compra.qtde *
                        (+compra.valorUnitario - +compra.valorDesconto)}
                    </td>
                    <td>
                      <Link to={`/obrasdetalhe/${compra._id}`}>
                        <Button variant="outline-secondary" size="sm">
                          Detalhes
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <div>Valor total gasto: </div>
          </tfoot>
        </Table>

        <ModalCreateCompras reload={reload} setReload={setReload} />
      </Container>
    </div>
  );
}

export default HomePage;
