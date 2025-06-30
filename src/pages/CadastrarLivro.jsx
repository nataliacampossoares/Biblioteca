import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Botao from "../components/Botao";

export default function CadastrarLivro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [autores, setAutores] = useState([]);
  const [editoras, setEditoras] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [edicao, setEdicao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [autor, setAutor] = useState("");
  const [editora, setEditora] = useState("");
  const [categoria, setCategoria] = useState("");
  const [subcategoria, setSubcategoria] = useState("");

  const [novoAutor, setNovoAutor] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("");
  const [novaSubcategoria, setNovaSubcategoria] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/listarAutores")
      .then((resp) => resp.json())
      .then((data) => setAutores(data));

    fetch("http://localhost:3001/listarEditoras")
      .then((resp) => resp.json())
      .then((data) => setEditoras(data));

    fetch("http://localhost:3001/listarCategorias")
      .then((resp) => resp.json())
      .then((data) => setCategorias(data));
  }, []);

  useEffect(() => {
    if (categoria) {
      fetch(`http://localhost:3001/listarSubcategorias/${categoria}`)
        .then((resp) => resp.json())
        .then((data) => setSubcategorias(data));
    } else {
      setSubcategorias([]);
    }
  }, [categoria]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/livro/${id}`)
        .then((resp) => resp.json())
        .then((data) => {
          setTitulo(data.titulo || "");
          setSinopse(data.sinopse || "");
          setEdicao(data.edicao || "");
          setQuantidade(data.quantidade || "");
          setAutor(data.id_autor || "");
          setEditora(data.id_editora || "");
          setCategoria(data.id_categoria || "");
          setSubcategoria(data.id_subcategoria || "");
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const livro = {
      titulo,
      sinopse,
      edicao,
      quantidade,
      id_autor: autor,
      id_editora: editora,
      id_categoria: categoria,
      id_subcategoria: subcategoria,
    };

    const url = id
      ? `http://localhost:3001/alterarLivro/${id}`
      : "http://localhost:3001/cadastrarLivro";

    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(livro),
      });

      if (!resp.ok) throw new Error("Erro ao salvar o livro");

      alert(id ? "Livro atualizado com sucesso!" : "Livro cadastrado com sucesso!");
      navigate("/livros");
    } catch (err) {
      alert("Erro ao salvar o livro");
      console.error(err);
    }
  };

  const InputSelect = ({ label, value, setValue, options, placeholder }) => (
    <label className="flex flex-col text-gray-700 font-semibold w-1/2">
      {label}
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mt-1 p-2 bg-white border border-gray-300 rounded-md text-sm"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.nome || opt.nome_categoria || opt.nome_subcategoria}
          </option>
        ))}
      </select>
    </label>
  );

  const BotaoCadastro = ({ label, valor, setValor }) => (
    <div className="w-1/2 flex flex-col">
      <button
        type="button"
        className="text-red-500 border border-red-500 bg-white px-2 py-1 rounded text-sm hover:bg-red-50"
        onClick={() => {
          const nome = prompt(`Digite o nome do(a) ${label.toLowerCase()}`);
          if (nome) setValor(nome);
        }}
      >
        Cadastrar novo {label.toLowerCase()}
      </button>
      {valor && <span className="text-sm mt-1 text-gray-600">{label}: {valor}</span>}
    </div>
  );

  return (
    <Layout>
      <h2 className="text-3xl text-center text-[#485977] mt-5 font-bold">
        {id ? "Editar Livro" : "Cadastrar Livro"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col p-6 gap-4 bg-[#efefef] rounded-xl">
        <label className="flex flex-col text-gray-700 font-semibold">
          Título
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="mt-1 p-4 bg-gray-300 border border-gray-300 rounded-md"
            placeholder="Digite o título do livro"
          />
        </label>

        <label className="flex flex-col text-gray-700 font-semibold">
          Sinopse
          <textarea
            value={sinopse}
            onChange={(e) => setSinopse(e.target.value)}
            className="mt-1 p-4 bg-gray-300 border border-gray-300 rounded-md"
            placeholder="Digite a sinopse"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col text-gray-700 font-semibold">
            Edição
            <input
              value={edicao}
              onChange={(e) => setEdicao(e.target.value)}
              className="mt-1 p-4 bg-gray-300 border border-gray-300 rounded-md"
              placeholder="Digite a edição"
            />
          </label>

          <label className="flex flex-col text-gray-700 font-semibold">
            Quantidade
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              className="mt-1 p-4 bg-gray-300 border border-gray-300 rounded-md"
              placeholder="Digite a quantidade"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputSelect label="Autor" value={autor} setValue={setAutor} options={autores} placeholder="Selecione um autor" />
          <BotaoCadastro label="Autor" valor={novoAutor} setValor={setNovoAutor} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputSelect label="Editora" value={editora} setValue={setEditora} options={editoras} placeholder="Selecione uma editora" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputSelect label="Categoria" value={categoria} setValue={setCategoria} options={categorias} placeholder="Selecione uma categoria" />
          <BotaoCadastro label="Categoria" valor={novaCategoria} setValor={setNovaCategoria} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputSelect label="Subcategoria" value={subcategoria} setValue={setSubcategoria} options={subcategorias} placeholder="Selecione uma subcategoria" />
          <BotaoCadastro label="Subcategoria" valor={novaSubcategoria} setValor={setNovaSubcategoria} />
        </div>

        <Botao type="submit">Salvar</Botao>
      </form>
    </Layout>
  );
}
