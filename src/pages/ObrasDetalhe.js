import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  Spinner,
  Badge,
  Offcanvas,
  ListGroup,
} from "react-bootstrap";

function ObrasDetalhe() {
  const { compraID } = useParams(); //mesmo compra do parametro de ROTA (app.js)
  const navigate = useNavigate(); // instanciar o useNavigate()

  const [compra, setCompra] = useState({}); //informações da compra que vieram da minha API
  const [showEdit, setShowEdit] = useState(false); //controlar a visualização form // true -> form aparece
  const [form, setForm] = useState({
    contrato: "",
    nomeObra: "",
    faseObra: "",
    dataCompra: "",
    dataPagamento: "",
    dataEntrega: "",
    nomeProdutoServico: "",
    qtde: "",
    unidade: "",
    valorUnitario: "",
    valorDesconto: "",
    nomeFornecedor: "",
  });

  const stack = ["React", "JS", "HTML", "CSS", "NodeJS", "MongoDB", "Express"];

  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  useEffect(() => {
    //setIsLoading(false);

    async function fetchUser() {
      try {
        const response = await axios.get(
          `https://ironrest.cyclic.app/demetriusjayme/${compraID}`
        );
        setCompra(response.data);
        setForm(response.data);
        setIsLoading(true);
      } catch (error) {
        console.log(error);
        toast.error("Ocorreu um erro com o GET da API");
      }
    }
    fetchUser();

    return () => {};
  }, [reload, compraID]);

  function handleChange(e) {
    if (e.target.name === "active") {
      setForm({ ...form, active: e.target.checked });
      return;
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleDelete(e) {
    try {
      await axios.delete(
        `https://ironrest.cyclic.app/demetriusjayme/${compraID}`
      );
      //Apos a exclusao da compra o usuario sera redirecionado para a home novamente
      navigate("/");
      toast.success("Compra excluida com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro ao excluir essa compra");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      //Clonando o form para que possamos fazer as alterações necessárias
      const clone = { ...form };
      delete clone._id;

      await axios.put(
        `https://ironrest.cyclic.app/demetriusjayme/${compraID}`,
        clone
      );

      toast.success("Alterações efetuadas com sucesso");
      setReload(!reload);
      setShowEdit(false);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao efetuar as alteracoes. Tente novamente");
    }
  }

  async function handleStack(e) {
    //console.log(e.target.checked); -> está clicado ou não
    //console.log(e.target.name); -> qual o nome da tech
    //Toda vez que o checkbox é alterado, enviamos essa alteração pra API
    try {
      const clone = { ...compra };
      delete clone._id;

      // let newcompra = filter: clone = clone.filter( el => el !== e.target.name);

      if (e.target.checked === true) {
        clone.stack.push(e.target.name);
      }

      if (e.target.checked === false) {
        const index = clone.stack.indexOf(e.target.name); //acho o index do elemento que eu cliquei
        clone.stack.splice(index, 1); //retiro o elemento da array
      }

      await axios.put(
        `https://ironrest.cyclic.app/demetriusjayme/${compraID}`,
        clone
      );
      setReload(!reload);
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro. Tente novamente");
    }
  }

  async function handleTaskCompletada(e) {
    e.preventDefault();

    if (!form.task) {
      // se form.task for uma string vazia ela é false -> então eu nego -> true
      toast.error("Por favor, adicione uma task primeiro");
      return;
    }

    try {
      const clone = { ...compra };
      delete clone._id;

      clone.tasksFinalizadas.push(clone.task);
      clone.task = "";
      clone.progresso = "0";

      await axios.put(
        `https://ironrest.cyclic.app/demetriusjayme/${compraID}`,
        clone
      );
      setReload(!reload);
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro. Tente novamente");
    }
  }

  async function handleDeleteTask(index) {
    try {
      const clone = { ...compra };
      delete clone._id;

      clone.tasksFinalizadas.splice(index, 1);

      await axios.put(
        `https://ironrest.cyclic.app/demetriusjayme/${compraID}`,
        clone
      );
      setReload(!reload);
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro ao excluir a TASK");
    }
  }

  console.log(form);

  return (
    <div>
      {
        <Container className="my-4">
          {/*         Formulario apenas para consulta */}
          {showEdit === false && (
            <Card className="text-center" bg="light">
              <Card.Header>
                {isLoading && <h3>Contrato: {compra.contrato}</h3>}
                {isLoading && <h3>Obra: {compra.nomeObra}</h3>}
              </Card.Header>
              <Card.Body>
                {isLoading && <h3>Fase: {compra.faseObra}</h3>}
                {isLoading && <h3>Compra: {compra.dataCompra}</h3>}
                {isLoading && <h3>Pagamento: {compra.dataPagamento}</h3>}
                {isLoading && <h3>Entrega: {compra.dataEntrega}</h3>}
                {isLoading && (
                  <h3>Produto/Servico: {compra.nomeProdutoServico}</h3>
                )}
                {isLoading && <h3>Qtde: {compra.qtde}</h3>}
                {isLoading && <h3>Unidade: {compra.unidade}</h3>}
                {isLoading && <h3>Valor unitario: {compra.valorUnitario}</h3>}
                {isLoading && <h3>Valor desconto: {compra.valorDesconto}</h3>}
                {isLoading && (
                  <h3>
                    Valor total:{" "}
                    {compra.qtde *
                      (compra.ValorUnitario - compra.valorDesconto)}
                  </h3>
                )}
                {isLoading && <h3>Fornecedor: {compra.nomeFornecedor}</h3>}
              </Card.Body>
              <Card.Footer className="text-muted">
                <Row>
                  <Col>
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowEdit(true)}
                    >
                      Editar Compra
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="outline-danger" onClick={handleDelete}>
                      Excluir Compra
                    </Button>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          )}

          {/*           Formulario pronto para editar */}
          {showEdit === true && (
            <Card className="text-center" bg="light">
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Contrato</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira o numero do contrato"
                      name="contrato"
                      value={form.contrato}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Obra</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira o nome da Obra"
                      name="nomeObra"
                      value={form.nomeObra}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Fase da Obra</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira a fase da obra"
                      name="faseObra"
                      value={form.faseObra}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Data da compra</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira a data da compra"
                      name="dataCompra"
                      value={form.dataCompra}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Data do Pagamento</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira a data do pagamento"
                      name="dataPagamento"
                      value={form.dataPagamento}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Data da Entrega</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira a data da entrega"
                      name="dataEntrega"
                      value={form.dataEntrega}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Produto/Servico</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira o nome do produto ou servico"
                      name="nomeProdutoServico"
                      value={form.nomeProdutoServico}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Qtde</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira a quantidade do produto ou servico"
                      name="qtde"
                      value={form.qtde}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Unidade</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira a unidade do produto ou servico"
                      name="unidade"
                      value={form.unidade}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Valor unitario</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira o valor unitario do produto ou servico"
                      name="valorUnitario"
                      value={form.valorUnitario}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Valor desconto</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira o valor do desconto do produto ou servico"
                      name="valorDesconto"
                      value={form.valorDesconto}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Fornecedor</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira o nome do fornecedor"
                      name="nomeFornecedor"
                      value={form.nomeFornecedor}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Valor total</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="I"
                      name="valorTotal"
                      value={
                        form.qtde * (form.valorUnitario - form.valorDesconto)
                      }
                      onChange={handleChange}
                      autoFocus
                    />
                  </Form.Group>
                  {/*                   <h1>{form.qtde * form.valorUnitario}</h1> */}

                  <Form.Group>
                    <Row>
                      <Col>
                        <Button
                          onClick={handleSubmit}
                          variant="outline-secondary"
                        >
                          Atualizar
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Container>
      }
    </div>
  );
}

export default ObrasDetalhe;
