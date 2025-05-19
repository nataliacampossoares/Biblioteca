import { useState } from "react";
import Layout from "../components/Layout";
import Botao from "../components/Botao";
import { IconBook } from "@tabler/icons-react";

export default function CadastrarLivro() {
  const [imagem, setImagem] = useState(null);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagem(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      <div className="max-w-[700px] mx-auto bg-[#efefef] p-4 rounded-xl shadow-md mt-4">
        <h2 className="text-xl text-center text-[#485977] font-bold mb-3">
          Cadastro de Livro
        </h2>

        <form className="grid grid-cols-2 gap-4 text-sm">
   
          <div className="flex flex-col items-center gap-1">
            <div className="w-24 h-30 bg-gray-300 rounded-md flex items-center justify-center overflow-hidden">
              {imagem ? (
                <img src={imagem} alt="Capa do livro" className="object-cover w-full h-full" />
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
                className="mt-1 px-2 py-1 border border-gray-300 bg-gray-300 rounded w-full"
                placeholder="Título do livro"
              />
            </label>

            <label className="text-gray-700 font-semibold">
              Autor(es)
              <input
                type="text"
                className="mt-1 px-2 py-1 border border-gray-300 bg-gray-300 rounded w-full"
                placeholder="Autor ou autores"
              />
            </label>

            <label className="text-gray-700 font-semibold">
              Quantidade
              <input
                type="number"
                className="mt-1 px-2 py-1 border border-gray-300 bg-gray-300 rounded w-full"
                placeholder="0"
              />
            </label>
          </div>

        
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <label className="flex flex-col text-gray-700 font-semibold">
              Categoria
              <div className="mt-1">
                <label><input type="checkbox" className="mr-1" />Romance</label><br />
                <label><input type="checkbox" className="mr-1" />Fábula</label><br />
                <label><input type="checkbox" className="mr-1" />Computação</label>
              </div>
            </label>

            <label className="flex flex-col text-gray-700 font-semibold">
              Subcategoria
              <select className="mt-1 px-2 py-1 border border-gray-300 bg-gray-300 rounded">
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
                className="mt-1 px-2 py-1 border border-gray-300 bg-gray-300 rounded"
                placeholder="Nome da editora"
              />
            </label>

            <label className="flex flex-col text-gray-700 font-semibold">
              Edição
              <input
                type="text"
                className="mt-1 px-2 py-1 border border-gray-300 bg-gray-300 rounded"
                placeholder="Número da edição"
              />
            </label>

            <label className="flex flex-col text-gray-700 font-semibold col-span-2">
              Sinopse
              <textarea
                className="mt-1 px-2 py-1 border border-gray-300 bg-gray-300 rounded resize-none"
                rows={2}
                placeholder="Sinopse do livro"
              />
            </label>
          </div>
        </form>
      </div>
          <div className="col-span-2 flex justify-center mt-2">
            <Botao className="py-1 px-4 text-sm">Cadastrar novo Livro</Botao>
          </div>
    </Layout>
  );
}
