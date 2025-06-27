import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Botao from "../components/Botao";

export default function CadastrarLivro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [autores, setAutores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [idAutor, setIdAutor] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [idSubcategoria, setIdSubcategoria] = useState("");
  const [editora, setEditora] = useState("");
  const [edicao, setEdicao] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [isbn, setIsbn] = useState("");
  const [quantidade, setQuantidade] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/autores")
      .then((res) => res.json())
      .then(setAutores);

    fetch("http://localhost:3001/api/categorias")
      .then((res) => res.json())
      .then(setCategorias);
  }, []);

  useEffect(() => {
    if (idCategoria) {
      fetch(`http://localhost:3001/api/subcategorias/${idCategoria}`)
        .then((res) => res.json())
        .then(setSubcategorias);
    }
  }, [idCategoria]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosLivro = {
      titulo,
      id_autor: idAutor,
      id_categoria: idCategoria,
      id_subcategoria: idSubcategoria,
      edicao,
      sinopse,
      isbn,
      qtd_disponivel: quantidade,
      id_editora: editora,
    };

    const url = id
      ? `http://localhost:3001/api/livros/${id}`
      : "http://localhost:3001/api/livros";

    const metodo = id ? "PUT" : "POST";

    const resposta = await fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosLivro),
    });

    if (resposta.ok) {
      alert("Livro salvo com sucesso!");
      navigate("/livros");
    } else {
      alert("Erro ao salvar livro");
    }
  };

  return (
    <Layout>
      <h2 className="text-3xl text-center mt-5 font-bold">
        {id ? "Editar Livro" : "Cadastrar Livro"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-6 mt-6 bg-[#efefef] rounded-xl"
      >
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="p-4 rounded bg-gray-300"
          required
        />

        <select
          value={idAutor}
          onChange={(e) => setIdAutor(e.target.value)}
          className="p-4 rounded bg-gray-300"
          required
        >
          <option value="">Selecione o autor</option>
          {autores.map((a) => (
            <option key={a.id} value={a.id}>
              {a.nome_autor}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Editora"
          value={editora}
          onChange={(e) => setEditora(e.target.value)}
          className="p-4 rounded bg-gray-300"
          required
        />

        <input
          type="text"
          placeholder="Edição"
          value={edicao}
          onChange={(e) => setEdicao(e.target.value)}
          className="p-4 rounded bg-gray-300"
        />

        <textarea
          placeholder="Sinopse"
          value={sinopse}
          onChange={(e) => setSinopse(e.target.value)}
          className="p-4 rounded bg-gray-300"
          rows={4}
        />

        <input
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          className="p-4 rounded bg-gray-300"
        />

        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          className="p-4 rounded bg-gray-300"
        />

        <select
          value={idCategoria}
          onChange={(e) => setIdCategoria(e.target.value)}
          className="p-4 rounded bg-gray-300"
          required
        >
          <option value="">Selecione a categoria</option>
          {categorias.map((c) => (
            <option key={c.id_categoria} value={c.id_categoria}>
              {c.nome_categoria}
            </option>
          ))}
        </select>

        <select
          value={idSubcategoria}
          onChange={(e) => setIdSubcategoria(e.target.value)}
          className="p-4 rounded bg-gray-300"
          required
        >
          <option value="">Selecione a subcategoria</option>
          {subcategorias.map((s) => (
            <option key={s.id_subcategoria} value={s.id_subcategoria}>
              {s.nome_subcategoria}
            </option>
          ))}
        </select>

        <Botao type="submit">{id ? "Atualizar" : "Cadastrar"}</Botao>
      </form>
    </Layout>
  );
}
