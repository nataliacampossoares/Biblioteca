import { IconPencil, IconSchool, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Botao from "./Botao";


export default function CardCliente({
  nome,
  ra,
  curso,
  emprestimos,
  situacao,
  cargo,
}){
  const navigate = useNavigate();

  const handleButtonClickEdicao = () => {
    navigate("/cadastrarcliente");
  };

  const handleButtonClickLixo = () => {
    alert("Desativar usuário");
  };

    const handleButtonClickHistorico = () => {
      navigate("/historico");
    };
  

  return (
    <div className="bg-[#d9d9d9] flex flex-col items-center p-5 w-fit h-full rounded-xl gap-6">
      <div className="flex flex-col items-center justify-center">
        <IconSchool className="text-[#a6a6a6] h-8 w-8" />
        <p className="text-[#555555]">{cargo}</p>
      </div>
      <div className="flex flex-col justify-center items-center flex-wrap gap-1">
        <p className="text-[#737373] font-extrabold text-3xl">{nome}</p>
        <div className="flex flex-col justify-center items-center">
          <p className="text-[#555555]">RA: {ra}</p>
          <p className="text-[#555555]">Curso: {curso}</p>
        </div>
      </div>
      <div className="flex flex-col mt-3 justify-center items-center gap-1 w-full border-t-4 border-[#b3b3b3]">
        <p className="text-[#a6a6a6] font-bold text-xl mt-2">
          Detalhes do Cliente
        </p>
        <div className="flex justify-around align-center w-full">
          <p className="text-[#5d5959] font-bold text-lg">Empréstimos</p>
          <p className="text-[#5d5959] font-bold text-lg">Situação</p>
        </div>
        <div className="flex w-full justify-around bg-white rounded-xl h-fit p-2">
          <p className="text-[#5d5959] font-bold">{emprestimos}</p>
          <p
            className={`font-bold ${
              situacao === "Atrasado" ? "text-red-600" : "text-green-600"
            }`}
          >
            {situacao}
          </p>
        </div>
      </div>
      <div className="h-full w-full flex items-end justify-end">
        <button
          style={{ backgroundColor: "#d9d9d9" }}
          onClick={handleButtonClickEdicao}
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
