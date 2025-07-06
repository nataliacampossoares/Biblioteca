import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { BarraPesquisa } from "../components/BarraPesquisa";
import Botao from "../components/Botao";
import { useNavigate } from "react-router-dom";

export default function LivrosBibliotecario() {
  const [categoria, setCategoria] = useState("");
  const [subcategoria, setSubcategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [livros, setLivros] = useState([]);
  const [filtro, setFiltro] = useState("");

  const navigate = useNavigate();

  const handleCadastrarLivro = () => {
    navigate("/cadastrarlivro");
  };

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
    if (!categoria) {
      setSubcategorias([]);
      return;
    }
    fetch(`http://localhost:3000/listarSubcategorias/${categoria}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar subcategorias");
        }
        return response.json();
      })
      .then((data) => {
        setSubcategorias(data);
      })
      .catch((error) => {
        console.error("Erro ao carregar subcategorias:", error);
      });
  }, [categoria]);

  const buscarLivrosPorSubcategoria = (subcategoriaId) => {
    fetch(`http://localhost:3000/pesquisarPorSubcategoria/${subcategoriaId}`)
      .then((response) => {
        if (!response.ok)
          throw new Error("Erro ao buscar livros por categoria");
        return response.json();
      })
      .then((data) => {
        console.log("Livros filtrados por subcategoria:", data);
        setLivros(data);
      })
      .catch((error) => {
        console.error("Erro ao filtrar livros:", error);
      });
  };

  const buscarLivrosPorCategoria = (nomeCategoria) => {
    fetch(`http://localhost:3000/pesquisarPorCategoria/${nomeCategoria}`)
      .then((response) => {
        if (!response.ok)
          throw new Error("Erro ao buscar livros por categoria");
        return response.json();
      })
      .then((data) => {
        setLivros(data);
      })
      .catch((error) => {
        console.error("Erro ao filtrar livros:", error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:3000/listarLivros")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar livros");
        }
        return response.json();
      })
      .then((data) => {
        setLivros(data);
      })
      .catch((error) => {
        console.error("Erro ao carregar livros:", error);
      });
  }, []);

  const livrosFiltrados = livros.filter((livro) =>
    livro.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex flex-col h-full w-full">
        <div className="shrink-0">
          <BarraPesquisa filtro={filtro} setFiltro={setFiltro} />
          <div className="flex gap-2">
            <div className="flex gap-4 text-sm text-gray-500 mt-2">
              <select
                value={categoria}
                onChange={(e) => {
                  const categoriaId = parseInt(e.target.value);
                  setCategoria(categoriaId);
                  setSubcategoria("");

                  const categoriaSelecionada = categorias.find(
                    (cat) => cat.id_categoria === categoriaId
                  );

                  if (!categoriaId || !categoriaSelecionada) {
                    fetch("http://localhost:3000/listarLivros")
                      .then((res) => res.json())
                      .then((data) => setLivros(data));
                  } else {
                    const nomeCategoria = categoriaSelecionada.nome_categoria;
                    buscarLivrosPorCategoria(nomeCategoria);
                  }
                }}
                className="bg-[#f1f1f1] rounded-2xl p-2 italic text-gray-700 mt-4"
              >
                <option value="">Categoria</option>
                {categorias.map((cat) => (
                  <option key={cat.id_categoria} value={cat.id_categoria}>
                    {cat.nome_categoria}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={subcategoria}
              onChange={(e) => {
                const subId = e.target.value;
                setSubcategoria(subId);
                if (subId) {
                  buscarLivrosPorSubcategoria(subId);
                }
              }}
              disabled={!categoria}
              className="bg-[#f1f1f1] rounded-2xl p-2 italic text-gray-700 mt-4"
            >
              <option value="">Subcategoria</option>

              {subcategorias.map((sub) => {
                return (
                  <option key={sub.id_categoria} value={sub.id_categoria}>
                    {sub.nome_categoria}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 mt-4 pr-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 pb-10">
            {livrosFiltrados.map((livro) => (
              <div
                key={livro.id}
                onClick={() => navigate(`/livro/${livro.id}`)}
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
        <div className="shrink-0 p-4 flex justify-center">
          <Botao onClick={handleCadastrarLivro}>Cadastrar novo Livro</Botao>
        </div>
      </div>
    </Layout>
  );
}
