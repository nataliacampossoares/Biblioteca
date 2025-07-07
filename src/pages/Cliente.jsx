import { useNavigate, useParams } from "react-router-dom";
import CardCliente from "../components/ClienteCard";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";

export default function Cliente() {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [livrosEmprestados, setLivrosEmprestados] = useState([]);
  const [historicoEmprestimos, setHistoricoEmprestimos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function buscarCliente() {
      try {
        const resposta = await fetch(`http://localhost:3000/locatario/${id}`);
        if (!resposta.ok) throw new Error("Erro ao buscar cliente");
        const data = await resposta.json();
        setCliente(data);
      } catch (err) {
        console.error("Erro ao buscar cliente:", err);
      }
    }

    buscarCliente();
  }, [id]);

  useEffect(() => {
    async function buscarEmprestimosAtuais() {
      try {
        const resposta = await fetch(
          `http://localhost:3000/emprestimosAtuais/${id}`
        );
        if (!resposta.ok) throw new Error("Erro ao buscar empréstimos atuais");
        const data = await resposta.json();
        setLivrosEmprestados(data);
      } catch (err) {
        console.error(err);
      }
    }

    if (id) {
      buscarEmprestimosAtuais();
    }
  }, [id]);

  useEffect(() => {
    async function buscarEmprestimosPorUsuario() {
      try {
        const resposta = await fetch(`http://localhost:3000/emprestimos/${id}`);
        if (!resposta.ok)
          throw new Error("Erro ao buscar empréstimos por usuário");
        const data = await resposta.json();
        console.log("Dados do histórico AAAAAAAAAA:", data);
        setHistoricoEmprestimos(data);
      } catch (err) {
        console.error(err);
      }
    }

    if (id) {
      buscarEmprestimosPorUsuario();
    }
  }, [id]);

  if (!cliente) {
    return (
      <Layout>
        <p className="text-center mt-4">Carregando cliente...</p>
      </Layout>
    );
  }

  console.log("CLIENTEEEEE", cliente);

  return (
    <Layout>
      <div className="flex justify-center items-center">
        <CardCliente
          nome={cliente.nome}
          curso={cliente.curso}
          cargo={cliente.cargo}
          id={cliente.id}
          telefone={cliente.telefone}
          email={cliente.email}
          dataNascimento={cliente.dataNascimento}
          ra={cliente.ra}
          livrosEmprestados={livrosEmprestados}
          historicoEmprestimos={historicoEmprestimos}
        />
      </div>
    </Layout>
  );
}
