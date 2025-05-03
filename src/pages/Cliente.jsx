import { useNavigate } from "react-router-dom";
import CardCliente from "../components/ClienteCard";
import { Menu } from "../components/Menu";

export default function Cliente() {
  const navigate = useNavigate();

  const handleButtonClickHistorico = () => {
    navigate("/historico");
  };

  const clientes = [
    // {
    //   nome: "Natália Campos Soares",
    //   ra: "2441144",
    //   curso: "Técnico Informática",
    //   emprestimos: "As Meninas",
    //   situacao: "Atrasado",
    //   cargo: "Aluno",
    // },
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
    <div className="flex h-screen w-screen bg-[linear-gradient(to_bottom,_#485977_70%,_#5271ff_30%)]">
      {/* O Menu pode continuar como está */}
      <Menu />
      
      <div className="flex flex-col justify-between items-center bg-white rounded-r-xl mt-6 mb-6 mr-24 p-6 w-full max-h-[calc(100vh-3rem)] overflow-hidden">
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
      </div>
    </div>
  );
}
