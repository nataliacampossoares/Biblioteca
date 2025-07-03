import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/LayoutsemMenu";
import { BarraPesquisa } from "../components/BarraPesquisa";

export default function LivrosBibliotecario() {
  const [categoria, setCategoria] = useState("");
  const [subcategoria, setSubcategoria] = useState("");
  const [busca, setBusca] = useState("");
  const [livros, setLivros] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/listarCategorias")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar categorias");
        }
        return response.json();
      })
      .then((data) => {
        setCategorias(data);
      })
      .catch((error) => {
        console.error("Erro ao carregar categorias:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/listarLivros")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar livros");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Livros carregados do backend:", data);
        setLivros(data);
        console.log("Estado livros será atualizado para:", data);
      })
      .catch((error) => {
        console.error("Erro ao carregar livros:", error);
      });
  }, []);

  const subcategorias = {
    Ficção: ["Romance", "Fantasia"],
    "Não Ficção": ["Biografia", "História"],
  };

  return (
    <Layout>
      <div className="flex flex-col h-full w-full">
        <div className="shrink-0">
          <BarraPesquisa filtro={busca} setFiltro={setBusca} />
          <div className="flex gap-4 text-sm text-gray-500 mt-2">
            <span className="mt-6 italic">Seção</span>
            <select
              value={categoria}
              onChange={(e) => {
                setCategoria(e.target.value);
                setSubcategoria("");
              }}
              className="bg-[#f1f1f1] rounded-2xl p-2 italic text-gray-700 mt-4"
            >
              <option value="">Categoria</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.nome_categoria}>
                  {cat.nome_categoria}
                </option>
              ))}
            </select>

            <select
              value={subcategoria}
              onChange={(e) => setSubcategoria(e.target.value)}
              disabled={!categoria}
              className="bg-[#f1f1f1] rounded-2xl p-2 italic text-gray-700 mt-4"
            >
              <option value="">Subcategoria</option>
              {categoria &&
                subcategorias[categoria].map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 mt-4 pr-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 pb-10">
            {livros.map((livro) => (
              <div
                key={livro.id}
                onClick={() => navigate(`/livroCliente/${livro.id}`)}
                className="cursor-pointer bg-white text-center w-[110px] rounded-lg p-2 shadow-md hover:shadow-lg transition
             flex flex-col items-start justify-start"
              >
                <img
                  src={
                    livro.caminho_imagens
                      ? `http://localhost:3000${livro.caminho_imagens}`
                      : "/src/img/bibliotecario.jpeg"
                  }
                  alt={livro.titulo}
                  className="w-full h-36 object-cover rounded"
                />
                <div className="flex flex-col items-center justify-center">
                  <p className="text-xs font-semibold mt-1 truncate text-black">
                    {livro.titulo}
                  </p>
                  <p className="text-xs mt-1 truncate text-black">
                    {livro.nome_autor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
