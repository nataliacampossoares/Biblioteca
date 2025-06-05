import { useState } from "react";
import Layout from "../components/Layout";
import Botao from "../components/Botao";
import { IconBook } from "@tabler/icons-react";

export default function CadastrarLivro() {
  const [imagem, setImagem] = useState(null);
  const [autorExiste, setAutorExiste] = useState(true);
  const [mostrarCadastroAutor, setMostrarCadastroAutor] = useState(false);
  const [nomeAutor, setNomeAutor] = useState(" ");
  const [quantidade, setQuantidade] = useState(0); // ⬅️ novo estado

  const [editoraExiste, setEditoraExiste] = useState(true);
  const [mostrarCadastroEditora, setMostrarCadastroEditora] = useState(false);
  const [nomeEditora, setNomeEditora] = useState("");

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagem(reader.result);
      reader.readAsDataURL(file);
    }
  };


  //testando
  const verificarAutor = (nome) => {
    if (nome.trim().toLowerCase() !== "machado de assis") {
      setAutorExiste(false);
      setMostrarCadastroAutor(true);
    } else {
      setAutorExiste(true);
      setMostrarCadastroAutor(false);
    }
  };

  const verificarEditora = (nome) => {
    if (nome.trim().toLowerCase() !== "companheira das letras") {
      setEditoraExiste(false);
      setMostrarCadastroEditora(true);
    } else {
      setEditoraExiste(true);
      setMostrarCadastroEditora(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-[700px] mx-auto bg-[#efefef] p-4 rounded-xl shadow-md">
        <h2 className="text-xl text-center text-[#485977] font-bold mb-3">
          Cadastro de Livro
        </h2>

        <form className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col items-center gap-1">
            <div className="w-30 h-40 bg-gray-300 rounded-md flex items-center justify-center overflow-hidden">
              {imagem ? (
                <img
                  src={imagem}
                  alt="Capa do livro"
                  className="object-cover w-full h-full"
                />
              ) : (
                <IconBook size={36} className="text-gray-600" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImagemChange}
              className="text-xs"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-semibold">
              Título
              <input
                type="text"
                className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded w-full"
                placeholder="Título do livro"
              />
            </label>

            <div>
              <label className="block text-gray-700 mb-1 font-semibold" htmlFor="autor">
                Autor
              </label>
              <input
                type="text"
                id="autor"
                value={nomeAutor}
                onChange={(e) => setNomeAutor(e.target.value)}
                onBlur={(e) => verificarAutor(e.target.value)}
                className="w-full p-2 border bg-gray-300 rounded focus:outline-none"
                placeholder="Digite o nome do Autor"
              />
              {!autorExiste && (
                <p className="text-red-600 font-semibold text-xs mt-1">
                  Autor não encontrado. Por favor, cadastre.
                </p>
              )}
            </div>

            <label className="text-gray-700 font-semibold">
              Quantidade
              <input
                type="number"
                min="0"
                value={quantidade}
                onChange={(e) =>
                  setQuantidade(Math.max(0, parseInt(e.target.value) || 0))
                }
                className="mt-1 px-2 py-1 border border-gray-300 bg-gray-300 rounded w-full"
                placeholder="0"
              />
            </label>
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-4">
            <label className="flex flex-col text-gray-700 font-semibold">
              Categoria
              <select className="mt-1 p-3 border border-gray-300 bg-gray-300 rounded">
                <option value="">Selecione</option>
                <option value="literatura">Romance</option>
                <option value="infantil">Fábula</option>
                <option value="programacao">Programação</option>
              </select>
            </label>

            <label className="flex flex-col text-gray-700 font-semibold">
              Subcategoria
              <select className="mt-1 p-3 border border-gray-300 bg-gray-300 rounded">
                <option value="">Selecione</option>
                <option value="literatura">Literatura</option>
                <option value="infantil">Infantil</option>
                <option value="programacao">Programação</option>
              </select>
            </label>

            <label className="flex flex-col text-gray-700 font-semibold">
              Editora
              <input
                type="text"
                className="mt-1 p-2 border border-gray-300 bg-gray-300 rounded"
                placeholder="Nome da editora"
                value={nomeEditora}
                onChange={(e) => setNomeEditora(e.target.value)}
                onBlur={(e) => verificarEditora(e.target.value)}
              />
              {!editoraExiste && (
                <p className="text-red-600 text-xs mt-1">
                  Editora não encontrada. Por favor, cadastre
                </p>
              )}
            </label>

            <label className="flex flex-col text-gray-700 font-semibold">
              Edição
              <input
                type="text"
                className="mt-1 p-2 border border-gray-300 bg-gray-300 rounded"
                placeholder="Número da edição"
              />
            </label>

            <label className="flex flex-col text-gray-700 font-semibold col-span-2">
              Sinopse
              <textarea
                className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded resize-none"
                rows={2}
                placeholder="Sinopse do livro"
              />
            </label>
          </div>
        </form>

        <div className="col-span-2 flex justify-center mt-2">
          <Botao className="py-1 px-4 text-sm">Cadastrar</Botao>
        </div>
      </div>

      {mostrarCadastroAutor && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-xl mb-4">Cadastrar Autor</h2>
            <input
              type="text"
              className="w-full p-2 mb-3 border rounded"
              placeholder="Nome do autor"
              value={nomeAutor}
              onChange={(e) => setNomeAutor(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setMostrarCadastroAutor(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  // API autor
                  setMostrarCadastroAutor(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarCadastroEditora && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-xl mb-4">Cadastrar Editora</h2>
            <input
              type="text"
              className="w-full p-2 mb-3 border rounded"
              placeholder="Nome da editora"
              value={nomeEditora}
              onChange={(e) => setNomeEditora(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setMostrarCadastroEditora(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  // API editora
                  setMostrarCadastroEditora(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
