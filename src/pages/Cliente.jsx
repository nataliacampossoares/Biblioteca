import { useNavigate } from "react-router-dom";
import CardCliente from "../components/ClienteCard";
import Menu from "../components/Menu";
import Layout from "../components/Layout";
import Botao from "../components/Botao";

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
      <div className="flex justify-center items-center">
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
      </div>
    </Layout>
  );
}
