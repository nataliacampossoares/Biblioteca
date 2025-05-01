import { useState } from "react";
import Logo from "../components/Logo";
import { Menu } from "../components/Menu";
import { IconArrowAutofitDown, IconArrowDown, IconArrowDownBar, IconChevronDown } from "@tabler/icons-react";

export default function CadastrarCliente() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState([]);

  const cursos = [
    "Técnico em Informática",
    "Bacharelado em Ciências da Computação",
    "Engenharia Química",
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleRadioChange = (curso) => {
    setSelectedCourse(curso);   
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <div className="flex flex-row h-full bg-[linear-gradient(to_bottom,_#485977_70%,_#5271ff_30%)] w-full gap-70">
        <Menu />
        <form className="bg-white p-8 rounded-2xl shadow-md w-[500px] h-auto flex flex-col gap-4 my-auto">
          <h2 className="text-3xl text-center text-blue-700 mb-2">
            Cadastrar Cliente
          </h2>

          <label className="flex flex-col text-gray-700 font-semibold">
            Nome
            <input
              type="text"
              className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
              placeholder="Digite o nome completo"
            />
          </label>

          <label className="flex flex-col text-gray-700 font-semibold">
            Registro Acadêmico
            <input
              type="password"
              className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
              placeholder="Digite o RA"
            />
          </label>

          <div className="relative inline-block text-left">
            <button
            type="button"
              onClick={toggleDropdown}
              className="border px-4 py-2 rounded bg-white shadow-sm"
            >
              <div className="flex">
              <p className=" text-gray-700 font-semibold gap-2">Curso</p>
              <IconChevronDown  className="text-gray-700 ml-2"/> 
              </div>
             
            </button>
            {isOpen && (
              <div className="absolute mt-2 border rounded bg-white shadow-lg p-2 z-10">
                {cursos.map((curso) => (
                  <label
                    key={curso}
                    className="flex items-center space-x-2 py-1 text-black"
                  >
                    <input
                      type="radio"
                      name="curso"
                      value={curso}
                      checked={selectedCourse === curso}
                      onChange={() => handleRadioChange(curso)}
                    />
                    <span>{curso}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <label className="flex flex-col text-gray-700 font-semibold">
            E-mail
            <input
              type="email"
              className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
              placeholder="Digite o e-mail"
            />
          </label>

          <button
             style={{ backgroundColor: "#5271ff" }}
            className="text-white px-4 py-2 rounded shadow-md bottom-6 self-start"
          >
            Cadastrar
          </button>
        </form>
      </div>

      <div className="flex flex-col items-center justify-center mt-4">
        <p className="text-black font-bold">OLJFENKNJK</p>
      </div>
      <Logo />
    </div>
  );
}
