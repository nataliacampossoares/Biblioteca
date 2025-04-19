//import { Pencil } from "@tabler/icons-react";
import { useState } from "react";
import { Menu } from "../components/Menu";
import { BarraPesquisa } from "../components/BarraPesquisa";
import { useNavigate } from "react-router-dom";

export default function Clientes() {
  const [filtro, setFiltro] = useState("");

  const navigate = useNavigate();

  const handleButtonClickCadastrar = () => {
    navigate('/cadastrarcliente'); 
  };

  const handleButtonClickCliente = () => {
    navigate('/cliente'); 
  };

  const listaClientes = [
    {
      nome: "Natália Campos Soares",
      cargo: "Aluno",
      curso: "Técnico em Informática",
    },
    {
      nome: "Fernando Manso",
      cargo: "Professor",
      curso: "Técnico Informática",
    },
    {
      nome: "Amanda Soares",
      cargo: "Professor",
      curso: "Técnico Informática",
    },
    {
      nome: "Lara Deitos",
      cargo: "Professor",
      curso: "Técnico Informática",
    },
    {
      nome: "Fernando Manso",
      cargo: "Professor",
      curso: "Técnico Informática",
    },
    {
      nome: "Fernando Manso",
      cargo: "Professor",
      curso: "Técnico Informática",
    },
    { nome: "Sara Guaiume", cargo: "Bibliotecário", curso: "" },
  ];

  const clientesFiltrados = listaClientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[linear-gradient(to_bottom,_#485977_70%,_#5271ff_30%)] w-screen">
      <Menu />

      <div className="flex flex-col p-6 gap-5 h-screen w-2xl bg-white rounded-r-xl">
        <BarraPesquisa onSearch={setFiltro} />
        <div className="overflow-y-auto flex flex-col gap-5" onClick={handleButtonClickCliente}>
          {clientesFiltrados.map((cliente, index) => (
            <div
              key={index}
              className="bg-[#d9d9d9] rounded-2xl p-6 flex flex-col gap-2"
            >
              <p className="text-[#737373] font-bold text-xl">{cliente.nome}</p>
              <p className="text-sm">{cliente.cargo}</p>
              {cliente.curso && <p className="text-sm">{cliente.curso}</p>}
            </div>
          ))}
        </div>
        <button
        onClick={handleButtonClickCadastrar}
          style={{ backgroundColor: "#5271ff" }}
          className="text-white px-4 py-2 rounded shadow-md bottom-6 self-start"
        >
          Cadastrar Cliente
        </button>
      </div>
    </div>
  );
}
