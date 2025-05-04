import { useNavigate } from "react-router-dom";
import CardCliente from "../components/ClienteCard";
import  Menu  from "../components/Menu";
import Layout from "../components/Layout";

export default function Cliente() {
  const navigate = useNavigate();

  const handleButtonClickHistorico = () => {
    navigate("/historico");
  };

  const clientes = [
    {
      nome: "Pedro Campos Soares",
      ra: "2441144",
      curso: "Técnico Informática",
      emprestimos: "As Meninas",
      situacao: "Em posse",
      cargo: "Aluno",
    },
  ];

  return (
    <Layout>
    {clientes.map((cliente, index) => (
      <CardCliente
        key={index}
        nome={cliente.nome}
        ra={cliente.ra}
        curso={cliente.curso}
        emprestimos={cliente.emprestimos}
        situacao={cliente.situacao}
        cargo={cliente.cargo}
      />
    ))}

    <button
      style={{ backgroundColor: "#5271ff" }}
      className="text-white px-4 py-2 rounded shadow-md mt-6 w-fit mx-auto"
      onClick={handleButtonClickHistorico}
    >
      Histórico
    </button>
  </Layout>
  );
}
