import { IconPencil, IconSchool, IconTrash } from "@tabler/icons-react";
import { Menu } from "../components/Menu";
import { useNavigate } from "react-router-dom";

export default function Cliente() {
  const navigate = useNavigate();

  const handleButtonClickHistorico = () => {
    navigate("/historico");
  };

  function handleButtonClickLixo() {
    alert("Desativar usuário");
  }

  function handleButtonClickEdicao() {
    alert("Editar usuário");
  }

  return (
    <div className="flex h-screen w-screen bg-[linear-gradient(to_bottom,_#485977_70%,_#5271ff_30%)]">
      <Menu />
      <div className="flex flex-col justify-between items-center bg-white rounded-r-xl mt-6 mb-6 mr-24 p-6 w-full max-h-[calc(100vh-3rem)] overflow-hidden">
        <div className="bg-[#d9d9d9] flex flex-col items-center p-5 w-fit h-full rounded-xl gap-6">
          <div className="flex flex-col items-center justify-center">
            <IconSchool className="text-[#a6a6a6] h-8 w-8" />
            <p className="text-[#555555]">Aluno</p>
          </div>
          <div className="flex flex-col justify-center items-center flex-wrap gap-1">
            <p className="text-[#737373] font-extrabold text-4xl">
              Natália Campos Soares
            </p>
            <div className="flex flex-col justify-center items-center">
              <p className="text-[#555555]">RA: 2441144</p>
              <p className="text-[#555555]">Curso: Técnico Informática</p>
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
              <p className="text-[#5d5959] font-bold">As Meninas</p>
              <p className="text-red-600 font-bold">Atrasado</p>
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
        </div>
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
