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

  const [compra, setCompra] = useState({}); //informações do compra que veio da minha API
  const [showEdit, setShowEdit] = useState(false); //controlar a visualização form // true -> form aparece
  const [form, setForm] = useState({
    compra: "",
    nomeProdutoServico: "",
    qtde: "",
    unidade: "",
    dataCompra: "",
    faseObra: "",
    dataPagamento: true,
    valorUnitario: "",
  });

  const stack = ["React", "JS", "HTML", "CSS", "NodeJS", "MongoDB", "Express"];

  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  console.log("antes do useEffect");

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
        toast.error("Algo deu errado com o get da API.");
      }
    }
    fetchUser();

    return () => {
      console.log("vai rodar depois do useEffect");
    };
  }, [reload, compraID]);

  console.log("antes do handleChange");

  function handleChange(e) {
    if (e.target.name === "dataPagamento") {
      setForm({ ...form, dataPagamento: e.target.checked });
      return;
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  }

  console.log("antes do handleDelete");

  async function handleDelete(e) {
    try {
      await axios.delete(
        `https://ironrest.cyclic.app/demetriusjayme/${compraID}`
      );
      //agora que o usuário está deletado
      //redirecionaremos ele para a homePage
      navigate("/");
      toast.success("Funcionário deletado com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado ao deletar esse usuário.");
    }
  }

  console.log("antes do handleSubmit");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      //clonando o form para que possamos fazer as alterações necessárias
      const clone = { ...form };
      delete clone._id;

      await axios.put(
        `https://ironrest.cyclic.app/demetriusjayme/${compraID}`,
        clone
      );

      toast.success("Alterações salvas");
      setReload(!reload);
      setShowEdit(false);
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  console.log("antes do handleStack");

  async function handleStack(e) {
    //console.log(e.target.checked); -> está clicado ou não
    //console.log(e.target.name); -> qual o nome da tech
    // toda vez que o checkbox é alterado, enviamos essa alteração pra API
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
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  console.log("antes do handleTaskCompletada");

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
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  console.log("antes do handleDeleteTask");

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
      toast.error("Task não foi excluída");
    }
  }

  console.log(form);

  console.log("antes do return");

  return <div>{isLoading && <h1>{compra.contrato}</h1>}</div>;
}

export default ObrasDetalhe;
