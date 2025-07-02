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
  const [descricao, setDescricao] = useState("");
  const [edicao, setEdicao] = useState("");
  const [qtdDisponivel, setQtdDisponivel] = useState("");
  const [autor, setAutor] = useState("");
  const [novaAutor, setNovaAutor] = useState("");
  const [editora, setEditora] = useState("");
  const [categoria, setCategoria] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("");
  const [subcategoria, setSubcategoria] = useState("");
  const [novaSubcategoria, setNovaSubcategoria] = useState("");
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/listarAutores")
      .then((resp) => resp.json())
      .then(setAutores);

    fetch("http://localhost:3000/listarCategorias")
      .then((resp) => resp.json())
      .then(setCategorias);
  }, []);

  useEffect(() => {
    if (categoria) {
      fetch(`http://localhost:3000/listarSubcategorias/${categoria}`)
        .then((resp) => resp.json())
        .then(setSubcategorias);
    } else {
      setSubcategorias([]);
    }
  }, [categoria]);

  const cadastrarAutor = async () => {
    if (!novaAutor.trim()) return;
    const resp = await fetch("http://localhost:3000/cadastrarAutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome_autor: novaAutor }),
    });
    const novo = await resp.json();
    setAutores((prev) => [...prev, novo]);
    setAutor(novo.id);
    setNovaAutor("");
  };

  const cadastrarCategoria = async () => {
    if (!novaCategoria.trim()) return;
    const resp = await fetch("http://localhost:3000/cadastrarCategoria", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome_categoria: novaCategoria }),
    });
    const novo = await resp.json();
    setCategorias((prev) => [...prev, novo]);
    setCategoria(novo.id);
    setNovaCategoria("");
  };

  const cadastrarSubcategoria = async () => {
    if (!novaSubcategoria.trim()) return;
    const resp = await fetch("http://localhost:3000/cadastrarSubcategoria", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome_subcategoria: novaSubcategoria,
        id_categoria: categoria,
      }),
    });
    const novo = await resp.json();
    setSubcategorias((prev) => [...prev, novo]);
    setSubcategoria(novo.id);
    setNovaSubcategoria("");
  };

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("edicao", edicao);
    formData.append("qtd_disponivel", qtdDisponivel);
    formData.append("id_editora", editora);
    formData.append("isbn", "0000000000");
    formData.append("autores", JSON.stringify([autor]));
    formData.append("categorias", JSON.stringify([categoria]));
    if (imagem) formData.append("imagem", imagem);

    const url = id
      ? `http://localhost:3000/alterarLivro/${id}`
      : "http://localhost:3000/cadastrarLivro";

    try {
      const resp = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!resp.ok) throw new Error("Erro ao salvar o livro");

      alert(id ? "Livro atualizado com sucesso!" : "Livro cadastrado com sucesso!");
      navigate("/livros");
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao salvar o livro");
    }
  };

  return (
    <Layout>
      <h2 className="text-3xl text-center text-[#485977] mt-5 font-bold">
        {id ? "Editar Livro" : "Cadastro de Livro"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center mt-6 mb-6 p-6 w-full gap-4 rounded-xl bg-[#efefef]"
      >
        {/* Título */}
        <label className="flex flex-col text-gray-700 font-semibold">
          Título
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="mt-1 p-4 bg-gray-300 border border-gray-300 rounded-md"
            placeholder="Digite o título"
          />
        </label>

        {/* Descrição */}
        <label className="flex flex-col text-gray-700 font-semibold">
          Descrição
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="mt-1 p-4 bg-gray-300 border border-gray-300 rounded-md"
            placeholder="Digite a descrição"
          />
        </label>

        {/* Edição e Quantidade */}
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col text-gray-700 font-semibold">
            Edição
            <input
              value={edicao}
              onChange={(e) => setEdicao(e.target.value)}
              className="mt-1 p-4 bg-gray-300 border border-gray-300 rounded-md"
              placeholder="Edição"
            />
          </label>

          <label className="flex flex-col text-gray-700 font-semibold">
            Quantidade
            <input
              type="number"
              value={qtdDisponivel}
              onChange={(e) => setQtdDisponivel(e.target.value)}
              className="mt-1 p-4 bg-gray-300 border border-gray-300 rounded-md"
              placeholder="Quantidade"
            />
          </label>
        </div>

        {/* Autor */}
        <div className="flex flex-col gap-2 text-gray-700 font-semibold">
          <label>Autor</label>
          <select
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            className="p-4 bg-gray-300 border border-gray-300 rounded-md"
          >
            <option value="">Selecione um autor</option>
            {autores.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nome}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <input
              type="text"
              value={novaAutor}
              onChange={(e) => setNovaAutor(e.target.value)}
              placeholder="Cadastrar novo autor"
              className="p-2 bg-white border border-gray-300 rounded-md flex-1"
            />
            <button
              type="button"
              onClick={cadastrarAutor}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Cadastrar
            </button>
          </div>
        </div>

        {/* Categoria */}
        <div className="flex flex-col gap-2 text-gray-700 font-semibold">
          <label>Categoria</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="p-4 bg-gray-300 border border-gray-300 rounded-md"
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <input
              type="text"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              placeholder="Cadastrar nova categoria"
              className="p-2 bg-white border border-gray-300 rounded-md flex-1"
            />
            <button
              type="button"
              onClick={cadastrarCategoria}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Cadastrar
            </button>
          </div>
        </div>

        {/* Subcategoria */}
        {categoria && (
          <div className="flex flex-col gap-2 text-gray-700 font-semibold">
            <label>Subcategoria</label>
            <select
              value={subcategoria}
              onChange={(e) => setSubcategoria(e.target.value)}
              className="p-4 bg-gray-300 border border-gray-300 rounded-md"
            >
              <option value="">Selecione uma subcategoria</option>
              {subcategorias.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nome}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <input
                type="text"
                value={novaSubcategoria}
                onChange={(e) => setNovaSubcategoria(e.target.value)}
                placeholder="Cadastrar nova subcategoria"
                className="p-2 bg-white border border-gray-300 rounded-md flex-1"
              />
              <button
                type="button"
                onClick={cadastrarSubcategoria}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Cadastrar
              </button>
            </div>
          </div>
        )}

        {/* Imagem */}
        <div className="flex flex-col gap-2 text-gray-700 font-semibold">
          <label>Imagem do livro</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagemChange}
            className="bg-white border border-gray-300 rounded-md p-2"
          />
          {preview && (
            <div className="w-40 h-40 border border-gray-400 rounded overflow-hidden">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <Botao type="submit">{id ? "Atualizar" : "Cadastrar"}</Botao>
      </form>
    </Layout>
  );
}
