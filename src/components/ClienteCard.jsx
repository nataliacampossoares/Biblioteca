import { IconPencil, IconSchool, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Botao from "./Botao";

export default function CardCliente({
  id,
  nome,
  curso,
  cargo,
  livrosEmprestados = [],
  historicoEmprestimos = [],
}) {
  const navigate = useNavigate();

  const handleEditar = (id) => {
    navigate(`/editarcliente/${id}`);
  };

  const handleButtonClickLixo = async () => {
    if (window.confirm("Deseja realmente desativar esse usuário?")) {
      try {
        const resposta = await fetch(
          `http://localhost:3000/desativarLocatario/${id}`
        );
        if (!resposta.ok) throw new Error("Erro ao desativar usuário");

        alert("Usuário desativado com sucesso!");

        navigate("/clientes");
      } catch (error) {
        console.error("Erro ao desativar usuário:", error);
        alert("Erro ao desativar usuário");
      }
    }
  };

  const handleButtonClickHistorico = () => {
    console.log("aperta o botao", historicoEmprestimos)
    localStorage.setItem(
      "historicoEmprestimos",
      JSON.stringify(historicoEmprestimos)
    );
    navigate("/historico", {
      state: {
        historicoEmprestimos: historicoEmprestimos,
        cliente: { nome },
      },
    });
  };

  return (
    <div className="bg-[#d9d9d9] flex flex-col items-center p-5 w-[500px] h-[550px]  rounded-xl gap-6">
      <div className="flex flex-col items-center justify-center">
        <IconSchool className="text-[#a6a6a6] h-8 w-8" />
        <p className="text-[#555555]">{cargo}</p>
      </div>
      <div className="flex flex-col justify-center items-center flex-wrap gap-1">
        <p className="text-[#737373] font-extrabold text-3xl">{nome}</p>
        <div className="flex flex-col justify-center items-center">
          <p className="text-[#555555]">Curso: {curso}</p>
        </div>
      </div>
      <div className="flex flex-col mt-3 justify-center items-center gap-1 w-full border-t-4 border-[#b3b3b3]">
        <p className="text-[#a6a6a6] font-bold text-xl mt-2">
          Detalhes do Cliente
        </p>
        <div className="flex justify-around align-center w-full">
          <p className="text-[#5d5959] font-bold text-lg">Livro</p>
          <p className="text-[#5d5959] font-bold text-lg">Situação</p>
        </div>
        <div className="flex flex-col gap-2 w-full mt-2">
          {livrosEmprestados.length > 0 ? (
            livrosEmprestados.map((livro, index) => (
              <div
                key={index}
                className="flex justify-around px-4 py-2 bg-white rounded-md shadow-sm"
              >
                <p className="text-[#555555] font-medium">{livro.titulo}</p>
                <p
                  className={`font-bold ${
                    livro.situacao === "Atrasado"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {livro.situacao}
                </p>
              </div>
            ))
          ) : (
            <p className="text-[#a6a6a6]">Nenhum livro emprestado</p>
          )}
        </div>
      </div>
      <div className="h-full w-full flex items-end justify-end">
        <button
          style={{ backgroundColor: "#d9d9d9" }}
          onClick={() => handleEditar(id)}
        >
          <IconPencil className="text-[#555555]" />
        </button>
        <button
          style={{ backgroundColor: "#d9d9d9" }}
          onClick={handleButtonClickLixo}
        >
          <IconTrash className="text-[#555555]" />
        </button>
      </div>
      <Botao onClick={handleButtonClickHistorico}>Histórico</Botao>
    </div>
  );
}
