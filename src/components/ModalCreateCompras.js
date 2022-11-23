import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function ModalCreateUser({ reload, setReload }) {
  const [show, setShow] = useState(false);
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    //Calculo do valor total
    const clone = { ...form };
    clone.valorTotal = clone.valorUnitario * clone.qtde;

    try {
      await axios.post("https://ironrest.cyclic.app/demetriusjayme", clone);
      handleClose(); // fechar o modal
      setForm({
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
      toast.success("Compra criada com sucesso! :D");
      setReload(!reload);
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro ao criar uma nova compra. Tente novamente");
    }
  }

  return (
    <div>
      <Button variant="success" onClick={handleShow}>
        + Adicionar uma nova Compra
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Inserir uma nova Compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* FORMULÁRIO */}
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Numero do Contrato</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Insira o numero do Contrato"
                    name="contrato"
                    value={form.contrato}
                    onChange={handleChange}
                    autoFocus
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Nome da Obra</Form.Label>
                  <Form.Select name="nomeObra" onChange={handleChange}>
                    <option>Selecione uma opção</option>
                    <option value="Forum de Anapolis">Forum de Anapolis</option>
                    <option value="Novo Centro de Distribuicao">
                      Novo Centro de Distribuicao
                    </option>
                    <option value="CEJUSC - Setor Oeste">
                      CEJUSC - Setor Oeste
                    </option>
                    <option value="Novo Forum Criminal">
                      Novo Forum Criminal
                    </option>
                    <option value="Reforma Forum de Pirenopolis">
                      Reforma Forum de Pirenopolis
                    </option>
                    <option value="Reforma Sala OAB">Reforma Sala OAB</option>
                    <option value="Reforma Forum de Sao Domingos">
                      Reforma Forum de Sao Domingos
                    </option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Fase da Obra</Form.Label>
                  <Form.Select name="faseObra" onChange={handleChange}>
                    <option>Selecione uma opção</option>
                    <option value="Servicos preliminares">
                      Servicos preliminares
                    </option>
                    <option value="Projetos e Taxas">Projetos e Taxas</option>
                    <option value="Fundacao">Fundacao</option>
                    <option value="Impermeabilizacao">Impermeabilizacao</option>
                    <option value="Estrutura">Estrutura</option>
                    <option value="Alvenaria">Alvenaria</option>
                    <option value="Instalacoes Eletricas">
                      Instalacoes Eletricas
                    </option>
                    <option value="Instalacoes Hidrossanitarias">
                      Instalacoes Hidrossanitarias
                    </option>
                    <option value="Cobertura">Cobertura</option>
                    <option value="Revestimentos">Revestimentos</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Produto/Servico</Form.Label>
                  <Form.Select
                    name="nomeProdutoServico"
                    onChange={handleChange}
                  >
                    <option>Selecione uma opção</option>
                    <option value="Terraplanagem">Terraplanagem</option>
                    <option value="Taxas">Taxas</option>
                    <option value="Cimento Portland">Cimento Portland</option>
                    <option value="Aco CA50 8mm">Aco CA50 8mm</option>
                    <option value="Aco CA50 5mm">Aco CA50 5mm</option>
                    <option value="Prego 18x27">Prego 18x27</option>
                    <option value="Tubo 60mm AF">Tubo 60mm AF</option>
                    <option value="Arame recozido n. 12">
                      Arame recozido n. 12
                    </option>
                    <option value="Fio flexivel 2,5mm">
                      Fio flexivel 2,5mm
                    </option>
                    <option value="Tabua de Pinus 30cm">
                      Tabua de Pinus 30cm
                    </option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Valor Unitario</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Insira o valor unitario R$"
                    name="valorUnitario"
                    value={form.valorUnitario}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Valor Desconto</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Insira o valor do desconto R$"
                    name="valorDesconto"
                    value={form.valorDesconto}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Quantidade</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Insira a quantidade"
                    name="qtde"
                    value={form.qtde}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Unidade</Form.Label>
                  <Form.Select name="unidade" onChange={handleChange}>
                    <option>Selecione uma opção</option>
                    <option value="m">m</option>
                    <option value="m2">m2</option>
                    <option value="ml">ml</option>
                    <option value="kg">kg</option>
                    <option value="barra 12m">barra 12m</option>
                    <option value="barra 6m">barra 6m</option>
                    <option value="peca">peca</option>
                    <option value="litro">l</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Fornecedor</Form.Label>
                  <Form.Select name="nomeFornecedor" onChange={handleChange}>
                    <option>Selecione uma opção</option>
                    <option value="Gerdau">Gerdau</option>
                    <option value="Arcelor Mittal">Arcelor Mittal</option>
                    <option value="Casa Iracema">Casa Iracema</option>
                    <option value="Nova Era Distribuidora">
                      Nova Era Distribuidora
                    </option>
                    <option value="Eletro Transol">Eletro Transol</option>
                    <option value="Eletro Sul">Eletro Sul</option>
                    <option value="Sao Jorge Materiais de Acabamento">
                      Sao Jorge Materiais de Acabamento
                    </option>
                    <option value="Ferragista NTM">Ferragista NTM</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Data de Compra</Form.Label>
                  <Form.Control
                    type="date"
                    name="dataCompra"
                    value={form.dataCompra}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Data de Pagamento</Form.Label>
                    <Form.Control
                      type="date"
                      name="dataPagamento"
                      value={form.dataPagamento}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Data de Entrega</Form.Label>
                    <Form.Control
                      type="date"
                      name="dataEntrega"
                      value={form.dataEntrega}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Row>
            <Row>
              <Col>
                {/*                 <Form.Group>
                  <Form.Label>Adicione a foto do Produto/Servico</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Insira a url da foto do Produto/Servico"
                    name="foto"
                    value={form.qtde}
                    onChange={handleChange}
                  />
                </Form.Group> */}
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Salvar Compra
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalCreateUser;
