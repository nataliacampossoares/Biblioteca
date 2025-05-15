//import { Pencil } from "@tabler/icons-react";
import { useState } from "react";
import Menu from "../components/Menu";
import { BarraPesquisa } from "../components/BarraPesquisa";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Botao from "../components/Botao";
import Logo from "../components/Logo"
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
    <Layout>
      <div className="flex flex-col h-screen w-full overflow-hidden">
        <div className="shrink-0">
          <BarraPesquisa />
        </div>
        <div
          className="flex-1 overflow-y-auto px-4 mt-4 ml-55 flex flex-col gap-2"
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
        <div className="shrink-0 p-4 ml-60 flex justify-center">
          <Botao onClick={handleButtonClickCadastrar}>
            Cadastrar Cliente
          </Botao>
        </div>
      </div>
    </Layout>
  );
}
