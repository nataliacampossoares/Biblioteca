import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { BarraPesquisa } from "../components/BarraPesquisa";
import Botao from "../components/Botao";
import { useNavigate } from "react-router-dom";
import { IconUserStar } from "@tabler/icons-react";

export default function LivrosBibliotecario() {
  const [categoria, setCategoria] = useState("");
  const [subcategoria, setSubcategoria] = useState("");
  const [busca, setBusca] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [mostrarCadastroCategoria, setMostrarCadastroCategoria] =
    useState(false);
  const [nomeNovaCategoria, setNomeNovaCategoria] = useState("");
  const [livros, setLivros] = useState([]);

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
    fetch("http://localhost:3000/listarLivros")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar livros");
        }
        return response.json();
      })
      .then((data  ) => {
        console.log("Livros carregados do backend:", data);
        setLivros(data);
        console.log("Estado livros será atualizado para:", data);
      })
      .catch((error) => {
        console.error("Erro ao carregar livros:", error);
      });
  }, []);

  const cadastrarNovaCategoria = async () => {
    if (!nomeNovaCategoria.trim()) return;

    try {
      const response = await fetch("http://localhost:3000/cadastrarCategoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome_categoria: nomeNovaCategoria.trim() }),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar categoria");

      const idNovaCategoria = await response.json();

      const novaCategoria = {
        id: idNovaCategoria,
        nome_categoria: nomeNovaCategoria.trim(),
      };
      setCategorias((prev) => [...prev, novaCategoria]);
      setCategoria(novaCategoria.nome_categoria);
      setNomeNovaCategoria("");
      setMostrarCadastroCategoria(false);
    } catch (error) {
      console.error("Erro ao cadastrar categoria:", error);
      alert("Erro ao cadastrar categoria");
    }
  };

  const subcategorias = {
    Ficção: ["Romance", "Fantasia"],
    "Não Ficção": ["Biografia", "História"],
  };

  {
    livros.map((livro) => console.log(livro));
  }

  return (
    <Layout>
      <div className="flex flex-col h-full w-full">
        <div className="shrink-0">
          <BarraPesquisa filtro={busca} setFiltro={setBusca} />
          <div className="flex gap-4 text-sm text-gray-500 mt-2">
            <span className="mt-6 italic">Seção</span>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="bg-[#f1f1f1] rounded-2xl p-2 italic text-gray-700 mt-4"
            >
              <option value="">Categoria</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.nome_categoria}>
                  {cat.nome_categoria}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() =>
                setMostrarCadastroCategoria(!mostrarCadastroCategoria)
              }
              className="text-red-500 border border-red-500 bg-white px-2 py-1 rounded text-sm hover:bg-red-50 mt-4"
            >
              Cadastrar nova categoria
            </button>
          </div>
          {mostrarCadastroCategoria && (
            <div className="mt-2 p-3 border rounded bg-gray-100 shadow flex flex-col gap-2 w-64">
              <input
                type="text"
                placeholder="Digite o nome da categoria"
                className="p-2 border rounded"
                value={nomeNovaCategoria}
                onChange={(e) => setNomeNovaCategoria(e.target.value)}
              />
              <button
                type="button"
                onClick={cadastrarNovaCategoria}
                className="bg-red-500 text-white rounded px-3 py-1 text-sm hover:bg-red-600"
              >
                Salvar
              </button>
            </div>
          )}

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
          <div className="flex-1 overflow-y-auto px-4 mt-4 pr-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 pb-10">
              {livros.map((livro) => (
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
        </div>
      </div>

      <div className="shrink-0 p-4 flex justify-center bg-white shadow-inner">
        <Botao onClick={handleCadastrarLivro}>Cadastrar novo Livro</Botao>
      </div>
    </Layout>
  );
}
