//import { Pencil } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import Menu from "../components/Menu";
import { BarraPesquisa } from "../components/BarraPesquisa";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Botao from "../components/Botao";

export default function Clientes() {
  const [filtro, setFiltro] = useState("");
  const [locatarios, setLocatarios] = useState([])

  const navigate = useNavigate();

  const handleButtonClickCadastrar = () => {
    navigate("/cadastrarcliente");
  };

  const handleButtonClickCliente = () => {
    navigate("/cliente");
  };

  useEffect(() => {
    async function buscarLocatarios() {
      try {
        const resposta = await fetch("http://localhost:3000/listarLocatarios"); 
        if (!resposta.ok) {
          throw new Error("Erro ao buscar locatários");
        }
        const data = await resposta.json();
console.log("Dados recebidos:", data);
        setLocatarios(data);
      } catch (error) {
        console.error("Erro ao buscar locatários:", error);
      }
    }

    buscarLocatarios();
  }, []);

  const clientesFiltrados = locatarios.filter((cliente) =>
    cliente.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex flex-col w-full h-full">
        <div className="shrink-0">
          <BarraPesquisa filtro={filtro} setFiltro={setFiltro}/>
        </div>
        <div
          className="flex-1 overflow-y-auto px-4 mt-4 flex flex-col gap-2"
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
        <div className="shrink-0 p-4 flex justify-center">
          <Botao onClick={handleButtonClickCadastrar}>Cadastrar Cliente</Botao>
        </div>
      </div>
    </Layout>
  );
}
