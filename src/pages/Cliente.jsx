import { useNavigate, useParams } from "react-router-dom";
import CardCliente from "../components/ClienteCard";
import Menu from "../components/Menu";
import Layout from "../components/Layout";
import Botao from "../components/Botao";
import { useEffect, useState } from "react";

export default function Cliente() {
  const { id } = useParams(); 
  const [cliente, setCliente] = useState(null);
  const [livrosEmprestados, setLivrosEmprestados] = useState([]);
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
        const resposta = await fetch(`http://localhost:3000/emprestimosAtuais/${id}`);
        if (!resposta.ok) throw new Error("Erro ao buscar empréstimos atuais");
        const data = await resposta.json();
        setLivrosEmprestados(data.map(item => item.titulo));
      } catch (err) {
        console.error(err);
      }
    }

    if (id) {
      buscarEmprestimosAtuais();
    }
  }, [id]);

  if (!cliente) {
    return <Layout><p className="text-center mt-4">Carregando cliente...</p></Layout>;
  }

  const handleButtonClickHistorico = () => {
    navigate("/historico");
  };
  


  return (
    <Layout>
       <div className="flex justify-center items-center">
        <CardCliente
          nome={cliente.nome}
          curso={cliente.curso}
          cargo={cliente.cargo}
          id={cliente.id}
          livrosEmprestados={livrosEmprestados}
        />
      </div>
    </Layout>
  );
}
