//import { Pencil } from "@tabler/icons-react";
import { useState } from "react";
import { Menu } from "../components/Menu";
import { BarraPesquisa } from "../components/BarraPesquisa";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

export default function Clientes() {
  const [filtro, setFiltro] = useState("");

  const navigate = useNavigate();

  const handleButtonClickCadastrar = () => {
    navigate("/cadastrarcliente");
  };

  const handleButtonClickCliente = () => {
    navigate("/cliente");
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
    <div className="flex h-screen w-screen bg-[linear-gradient(to_bottom,_#485977_70%,_#5271ff_30%)]">
      <Menu />
      <div className="flex flex-col justify-between bg-white rounded-r-xl mt-6 mb-6 mr-24 p-6 w-full max-h-[calc(100vh-3rem)] overflow-hidden">
        <BarraPesquisa onSearch={setFiltro} />
        <div
          className="overflow-y-auto flex flex-col gap-5 pr-2 mt-4"
          onClick={handleButtonClickCliente}
        >
          {clientesFiltrados.map((cliente, index) => (
            <div
              key={index}
              className="bg-[#d9d9d9] rounded-2xl p-6 flex flex-col gap-2"
            >
              <p className="text-[#737373] font-bold text-xl">{cliente.nome}</p>
              <p className="text-sm text-black">{cliente.cargo}</p>
              {cliente.curso && (
                <p className="text-sm text-black">{cliente.curso}</p>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={handleButtonClickCadastrar}
          style={{ backgroundColor: "#5271ff" }}
          className="text-white px-4 py-2 rounded shadow-md mt-6 w-fit mx-auto"
        >
          Cadastrar Cliente
        </button>
      </div>
    </div>
  );
}
