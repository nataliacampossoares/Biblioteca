import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";

export default function Livro() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [livro, setLivro] = useState([]);

  useEffect(() => {
    async function buscarLivro() {
      try {
        const resposta = await fetch(`http://localhost:3000/listarLivro/${id}`);
        if (!resposta.ok) throw new Error("Erro ao buscar Livro");
        const data = await resposta.json();
        console.log(data);
        setLivro(data);
      } catch (err) {
        console.error("Erro ao buscar cliente:", err);
      }
    }

    buscarLivro();
  }, [id]);

  const handleButtonClickLixo = async () => {
    if (window.confirm("Deseja realmente desativar esse livro?")) {
      try {
        const resposta = await fetch(
          `http://localhost:3000/desativarLivro/${id}`
        );
        if (!resposta.ok) throw new Error("Erro ao desativar livro");

        alert("Livro desativado com sucesso!");

        navigate("/LivrosBibliotecario");
      } catch (error) {
        console.error("Erro ao desativar usuário:", error);
        alert("Erro ao desativar usuário");
      }
    }
  };

  console.log("LIVOROROROROOR");
  console.log(livro);

  return (
    <Layout>
      <div className="h-full w-full flex items-center justify-center px-4 py-10">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-8">
          <div className="flex justify-center md:w-1/2">
            <img
              src={
                livro.caminho_imagens
                  ? `http://localhost:3000${livro.caminho_imagens}`
                  : "/src/img/bibliotecario.jpeg"
              }
              alt={livro.titulo}
              className="w-64 h-[370px] object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="md:w-1/2 flex flex-col justify-center">
            <h1 className="text-2xl font-bold mb-4 text-black">
              {livro.titulo}
            </h1>

            <div className="flex justify-between mb-4">
              <div className="flex flex-col">
                <p className="text-sm text-gray-600 mb-1">
                  Autor(es):{" "}
                  <span className="text-gray-800">{livro.nome_autor}</span>
                </p>
              </div>

              <div className="flex flex-col items-end">
                <p className="text-xs mr-5 text-gray-600 mb-1">
                  Editora:{" "}
                  <span className="text-gray-800">{livro.nome_editora}</span>
                </p>
                <p className="text-xs mr-5 text-gray-600">
                  Edição: <span className="text-gray-800">{livro.edicao}</span>
                </p>
              </div>
            </div>

            <div className="mt-2">
              <p className="text-md text-gray-600 font-semibold mb-1">
                Sinopse
              </p>
              <p className="text-sm text-gray-700 italic leading-relaxed">
                {livro.sinopse}
              </p>
            </div>

            <div className="mt-2">
              <p className="text-md text-gray-600 font-semibold mb-1">
                Quantidade disponível para empréstimo
              </p>
              <p className="text-sm text-gray-700 italic leading-relaxed">
                {livro.qtd_disponivel}
              </p>
            </div>

            <div className="mt-2">
              <p className="text-md text-gray-600 font-semibold mb-1">
                Categoria
              </p>
              <p className="text-sm text-gray-700 italic leading-relaxed">
                {livro.nome_categoria}
              </p>
            </div>
            <div className="h-full w-full flex items-end justify-end gap-2">
              <button
                style={{ backgroundColor: "#d9d9d9" }}
                // onClick={() => handleEditar(id)}
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
        </div>
      </div>
    </Layout>
  );
}
