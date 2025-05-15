import { useState } from "react";
import { IconChevronRight, IconChevronDown } from "@tabler/icons-react";
import Layout from "../components/Layout";
import Botao from "../components/Botao";

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
    <Layout className="loverflow-y-auto overflow-x-hidden">
      <h2 className="text-3xl text-center text-[#485977] mt-5 font-bold">
        Cadastro Cliente
      </h2>
      <form className="flex flex-col justify-center mt-6 mb-6 mr-2 p-6 w-full gap-3 rounded-xl bg-[#efefef]">
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
              {isOpen ? (
                <IconChevronDown className="text-gray-700 ml-2" />
              ) : (
                <IconChevronRight className="text-gray-700 ml-2" />
              )}
            </div>
          </button>
          {isOpen && (
            <div className="absolute mt-2 rounded bg-white shadow-lg p-2 z-10">
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

        <label className="flex flex-col text-gray-700 font-semibold">
          Telefone
          <input
            type="tel"
            className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
            placeholder="Digite o telefone"
          />
        </label>

        <div className="flex gap-10">
          <div className="flex gap-2">
            <input type="radio" name="cargo"/>
            <p className="text-gray-700 font-semibold">Professor</p>
          </div>
          <div className="flex gap-2">
            <input type="radio" name="cargo"/>
            <p className="text-gray-700 font-semibold">Aluno</p>
          </div>
        </div>

        <Botao>
          Cadastrar
        </Botao>
      </form>
    </Layout>
  );
}
