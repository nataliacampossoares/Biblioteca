import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Botao from "../components/Botao";

export default function CadastrarLivro() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dados do livro
  const [editora, setEditora] = useState("");
  const [edicao, setEdicao] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [quantidade, setQuantidade] = useState("");

  // Dados de seleção
  const [autores, setAutores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  const [autorSelecionado, setAutorSelecionado] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState("");

  // Carregar autores e categorias ao abrir a página
  useEffect(() => {
    fetch("http://localhost:3001/api/autor")
      .then((resp) => resp.json())
      .then(setAutores);

    fetch("http://localhost:3001/api/categoria")
      .then((resp) => resp.json())
      .then(setCategorias);
  }, []);

  // Quando escolher uma categoria, carregar subcategorias
  useEffect(() => {
    if (categoriaSelecionada) {
      fetch(`http://localhost:3001/api/subcategoria/${categoriaSelecionada}`)
        .then((resp) => resp.json())
        .then(setSubcategorias);
    } else {
      setSubcategorias([]);
    }
  }, [categoriaSelecionada]);

  // Buscar dados do livro se for edição
  useEffect(() => {
    if (id) {
      async function buscarLivro() {
        const resp = await fetch(`http://localhost:3001/api/livros/${id}`);
        const data = await resp.json();

        setAutorSelecionado(data.id_autor);
        setCategoriaSelecionada(data.id_categoria);
        setSubcategoriaSelecionada(data.id_subcategoria);
        setEditora(data.editora);
        setEdicao(data.edicao);
        setSinopse(data.sinopse);
        setQuantidade(data.quantidade);
      }
      buscarLivro();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosLivro = {
      id_autor: autorSelecionado,
      id_categoria: categoriaSelecionada,
      id_subcategoria: subcategoriaSelecionada,
      editora,
      edicao,
      sinopse,
      quantidade,
    };

    try {
      let url = "http://localhost:3001/api/livros";
      let method = "POST";

      if (id) {
        url = `http://localhost:3001/api/livros/${id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosLivro),
      });

      if (!response.ok) throw new Error("Erro ao salvar livro");

      alert(
        id ? "Livro atualizado com sucesso!" : "Cadastro realizado com sucesso!"
      );
      navigate("/livros");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar livro");
    }
  };

  return (
    <Layout>
      <h2 className="text-3xl text-center text-[#485977] mt-5 font-bold">
        {id ? "Editar Livro" : "Cadastrar Livro"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center mt-6 mb-6 mr-2 p-6 w-full gap-3 rounded-xl bg-[#efefef]"
      >
        {/* Seção Autor */}
        <label className="flex flex-col text-gray-700 font-semibold">
          Autor
          <select
            value={autorSelecionado}
            onChange={(e) => setAutorSelecionado(e.target.value)}
            required
            className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
          >
            <option value="">Selecione o autor</option>
            {autores.map((autor) => (
              <option key={autor._id} value={autor._id}>
                {autor.nome}
              </option>
            ))}
          </select>
        </label>

        {/* Editora */}
        <label className="flex flex-col text-gray-700 font-semibold">
          Editora
          <input
            type="text"
            value={editora}
            onChange={(e) => setEditora(e.target.value)}
            className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
            placeholder="Digite a editora"
            required
          />
        </label>

        {/* Edição */}
        <label className="flex flex-col text-gray-700 font-semibold">
          Edição
          <input
            type="text"
            value={edicao}
            onChange={(e) => setEdicao(e.target.value)}
            className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
            placeholder="Digite a edição"
            required
          />
        </label>

        {/* Sinopse */}
        <label className="flex flex-col text-gray-700 font-semibold">
          Sinopse
          <textarea
            value={sinopse}
            onChange={(e) => setSinopse(e.target.value)}
            className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
            placeholder="Digite a sinopse"
            rows={4}
            required
          />
        </label>

        {/* Quantidade */}
        <label className="flex flex-col text-gray-700 font-semibold">
          Quantidade Disponível
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
            placeholder="Digite a quantidade disponível"
            required
          />
        </label>

        {/* Categoria */}
        <label className="flex flex-col text-gray-700 font-semibold">
          Categoria
          <select
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
            required
            className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
          >
            <option value="">Selecione a categoria</option>
            {categorias.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.nome}
              </option>
            ))}
          </select>
        </label>

        {/* Subcategoria */}
        <label className="flex flex-col text-gray-700 font-semibold">
          Subcategoria
          <select
            value={subcategoriaSelecionada}
            onChange={(e) => setSubcategoriaSelecionada(e.target.value)}
            required
            disabled={!categoriaSelecionada}
            className={`mt-1 p-4 border border-gray-300 rounded-md ${
              !categoriaSelecionada ? "bg-gray-200 cursor-not-allowed" : "bg-gray-300"
            }`}
          >
            <option value="">
              {categoriaSelecionada
                ? "Selecione a subcategoria"
                : "Selecione uma categoria primeiro"}
            </option>
            {subcategorias.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.nome}
              </option>
            ))}
          </select>
        </label>

        <Botao type="submit">{id ? "Atualizar" : "Cadastrar"}</Botao>
      </form>
    </Layout>
  );
}

