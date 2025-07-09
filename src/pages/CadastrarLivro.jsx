import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Botao from "../components/Botao";
import { useNavigate } from "react-router-dom";

export default function CadastrarLivro() {
  const [autores, setAutores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [editoras, setEditoras] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [qtdDisponivel, setQtdDisponivel] = useState("");
  const [edicao, setEdicao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isbn, setIsbn] = useState("");
  const [imagem, setImagem] = useState(null);
  const [idEditora, setIdEditora] = useState("");
  const [autoresSelecionados, setAutoresSelecionados] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState("");

  const [novoAutor, setNovoAutor] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("");
  const [novaSubcategoria, setNovaSubcategoria] = useState("");
  const [novaEditora, setNovaEditora] = useState("");

  const [mostrarCadastroAutor, setMostrarCadastroAutor] = useState(false);
  const [mostrarCadastroCategoria, setMostrarCadastroCategoria] = useState(false);
  const [mostrarCadastroSubcategoria, setMostrarCadastroSubcategoria] = useState(false);
  const [mostrarCadastroEditora, setMostrarCadastroEditora] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/listarAutores")
      .then((res) => res.json())
      .then(setAutores);
    fetch("http://localhost:3000/listarCategorias")
      .then((res) => res.json())
      .then(setCategorias);
    fetch("http://localhost:3000/listarEditoras")
      .then((res) => res.json())
      .then(setEditoras);
  }, []);

  useEffect(() => {
    if (categoriaSelecionada) {
      fetch(`http://localhost:3000/listarSubcategorias/${categoriaSelecionada}`)
        .then((res) => res.json())
        .then(setSubcategorias);
    } else {
      setSubcategorias([]);
    }
  }, [categoriaSelecionada]);

  // const cadastrar = async (tipo, valor) => {
  //   if (!valor.trim() || !isNaN(valor.trim())) {
  //     alert("O nome deve ser um texto válido.");
  //     return;
  //   }

  //   let rota = "";
  //   let body = {};

  //   if (tipo === "autor") {
  //     rota = "cadastrarAutor";
  //     body = { nome_autor: valor };
  //   } else if (tipo === "categoria") {
  //     rota = "cadastrarCategoria";
  //     body = { nome_categoria: valor, id_pai: null };
  //   } else if (tipo === "subcategoria") {
  //     rota = "cadastrarSubcategoria";
  //     body = { nome_categoria: valor, id_pai: categoriaSelecionada };
  //   } else if (tipo === "editora") {
  //     rota = "cadastrarEditora";
  //     body = { nome_editora: valor };
  //   }

  //   await fetch(`http://localhost:3000/${rota}`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(body),
  //   });

  //   // Atualiza os dados após cadastro
  //   if (tipo === "autor") {
  //     const novos = await fetch("http://localhost:3000/listarAutores").then((res) => res.json());
  //     setAutores(novos);
  //     const novo = novos.find((a) => a.nome_autor === valor);
  //     if (novo) setAutoresSelecionados([novo.id]);
  //     setNovoAutor("");
  //     setMostrarCadastroAutor(false);
  //   } else if (tipo === "categoria") {
  //     const novos = await fetch("http://localhost:3000/listarCategorias").then((res) => res.json());
  //     setCategorias(novos);
  //     const nova = novos.find((c) => c.nome_categoria === valor);
  //     if (nova) setCategoriaSelecionada(nova.id_categoria);
  //     setNovaCategoria("");
  //     setMostrarCadastroCategoria(false);
  //   } else if (tipo === "subcategoria") {
  //     const novos = await fetch(`http://localhost:3000/listarSubcategorias/${categoriaSelecionada}`).then((res) => res.json());
  //     setSubcategorias(novos);
  //     const nova = novos.find((s) => s.nome_categoria === valor);
  //     if (nova) setSubcategoriaSelecionada(nova.id_categoria);
  //     setNovaSubcategoria("");
  //     setMostrarCadastroSubcategoria(false);
  //   } else if (tipo === "editora") {
  //     const novos = await fetch("http://localhost:3000/listarEditoras").then((res) => res.json());
  //     setEditoras(novos);
  //     const nova = novos.find((e) => e.nome_editora === valor);
  //     if (nova) setIdEditora(nova.id);
  //     setNovaEditora("");
  //     setMostrarCadastroEditora(false);
  //   }
  // };

  function handleSubmit(e) {
    e.preventDefault();

    if (isbn.length > 13) {
      alert("O ISBN deve conter no máximo 13 caracteres.");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("qtd_disponivel", qtdDisponivel);
    formData.append("edicao", edicao);
    formData.append("descricao", descricao);
    formData.append("isbn", isbn);

    formData.append("autor", autoresSelecionados[0] || "");

    formData.append("autor", JSON.stringify(autoresSelecionados));

    const nomeEditoraSelecionada = editoras.find((e) => e.id == idEditora)?.nome_editora;
    formData.append("nome_editora", nomeEditoraSelecionada || "");

    if (imagem) formData.append("imagem", imagem);
    formData.append("autores", JSON.stringify(autoresSelecionados));
    formData.append("categorias", JSON.stringify([categoriaSelecionada, subcategoriaSelecionada]));

    fetch("http://localhost:3000/cadastrarLivro", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          alert("Livro cadastrado com sucesso!");
          navigate("/livrosbibliotecario");
        } else {
          throw new Error("Erro ao cadastrar livro");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao cadastrar livro");
      });
  }

  const cadastrar = async (tipo, valor) => {
    if (!valor.trim()) return;


    let rota = "";
    let body = {};

    if (tipo === "autor") {
      rota = "cadastrarAutor";
      body = { nome_autor: valor };
    } else if (tipo === "categoria") {
      rota = "cadastrarCategoria";
      body = { nome_categoria: valor, id_pai: null };
    } else if (tipo === "subcategoria") {
      rota = "cadastrarSubcategoria";
      body = { nome_categoria: valor, id_categoria: categoriaSelecionada };
    } else if (tipo === "editora") {
      rota = "cadastrarEditora";
      body = { nome_editora: valor };
    }

    await fetch(`http://localhost:3000/${rota}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

   
    if (tipo === "autor") {
      const novos = await fetch("http://localhost:3000/listarAutores").then((res) => res.json());
      setAutores(novos);
      const novo = novos.find((a) => a.nome_autor === valor);
      if (novo) setAutoresSelecionados([novo.nome_autor]);
      setNovoAutor("");
      setMostrarCadastroAutor(false);
    } else if (tipo === "categoria") {
      const novos = await fetch("http://localhost:3000/listarCategorias").then((res) => res.json());
      setCategorias(novos);
      const nova = novos.find((c) => c.nome_categoria === valor);
      if (nova) setCategoriaSelecionada(nova.id_categoria);
      setNovaCategoria("");
      setMostrarCadastroCategoria(false);
    } else if (tipo === "subcategoria") {
      const novos = await fetch(`http://localhost:3000/listarSubcategorias/${categoriaSelecionada}`).then((res) => res.json());
      setSubcategorias(novos);
      const nova = novos.find((s) => s.nome_categoria.trim().toLowerCase() === valor.trim().toLowerCase());
      if (nova) setSubcategoriaSelecionada(nova.id_categoria);
      setNovaSubcategoria("");
      setMostrarCadastroSubcategoria(false);
    } else if (tipo === "editora") {
      const novos = await fetch("http://localhost:3000/listarEditoras").then((res) => res.json());
      setEditoras(novos);
      const nova = novos.find((e) => e.nome_editora === valor);
      if (nova) setIdEditora(nova.id);
      setNovaEditora("");
      setMostrarCadastroEditora(false);
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="flex flex-col p-6 gap-4 bg-gray-100 rounded-xl shadow max-w-4xl mx-auto mt-6 overflow-y-auto h-full">
        <h2 className="text-2xl font-bold text-center text-[#485977]">Cadastro de Livro</h2>

        {/* Imagem */}
        <div className="flex justify-center">
          {imagem ? (
            <img src={URL.createObjectURL(imagem)} alt="Prévia" className="w-40 h-40 object-cover rounded border" />
          ) : (
            <div className="w-40 h-40 flex items-center justify-center border border-dashed rounded text-gray-400 text-4xl">+</div>
          )}
        </div>
        <input type="file" accept="image/*" onChange={(e) => setImagem(e.target.files[0])} className="self-center text-black" />

        {/* Campos */}
        {/* <label className="flex flex-col">Título<input value={titulo} onChange={(e) => setTitulo(e.target.value)} className="p-3 rounded bg-gray-200" required /></label>
        <label className="flex flex-col">ISBN<input maxLength={13} value={isbn} onChange={(e) => setIsbn(e.target.value)} className="p-3 rounded bg-gray-200" required /></label>
        <label className="flex flex-col">Quantidade Disponível<input type="number" value={qtdDisponivel} onChange={(e) => setQtdDisponivel(e.target.value)} className="p-3 rounded bg-gray-200" required /></label>
        <label className="flex flex-col">Edição<input value={edicao} onChange={(e) => setEdicao(e.target.value)} className="p-3 rounded bg-gray-200" required /></label>
        <label className="flex flex-col">Sinopse<textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} className="p-3 rounded bg-gray-200" required /></label> */}

        {/* Autor */}
        {/* <label className="flex flex-col">Autor</label> */}

 
        <label className="flex flex-col text-black">
          Título
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} className="p-3 rounded bg-gray-200 text-black" required />
        </label>

  
        <label className="flex flex-col text-black">
          ISBN
          <input
            maxLength={13}
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="p-3 rounded bg-gray-200 text-black"
            required
          />
        </label>


        <label className="flex flex-col text-black">
          Quantidade Disponível
          <input type="number" value={qtdDisponivel} onChange={(e) => setQtdDisponivel(e.target.value)} className="p-3 text-black rounded bg-gray-200" required />
        </label>


        <label className="flex flex-col text-black">
          Edição
          <input value={edicao} onChange={(e) => setEdicao(e.target.value)} className="p-3 rounded bg-gray-200 text-black" required />
        </label>

   
        <label className="flex flex-col text-black">
          Sinopse
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} className="p-3 rounded bg-gray-200 text-black" required />
        </label>

   
        <label className="flex flex-col text-black">
          Autor
          <div className="flex items-center gap-2">
            <select
              value={autoresSelecionados[0] || ""}
              onChange={(e) => setAutoresSelecionados([e.target.value])}
              className="p-3 rounded bg-white flex-1 text-black"
            >
              <option value="">Selecione autor</option>
              {autores.filter((a) => a.nome_autor && isNaN(a.nome_autor)).map((autor) => (
                <option key={autor.id} value={autor.id}>{autor.nome_autor}</option>
              ))}
            </select>
            <button type="button" className="border border-red-500 text-red-500 rounded px-2 py-1 text-sm" onClick={() => setMostrarCadastroAutor(!mostrarCadastroAutor)}>Cadastrar novo autor</button>
          </div>
          {mostrarCadastroAutor && (
            <div className="bg-gray-200 p-3 rounded mt-2">
              <input value={novoAutor} onChange={(e) => setNovoAutor(e.target.value)} className="p-2 w-full rounded mb-2" placeholder="Nome do novo autor" />
              <button type="button" className="bg-red-500 text-white px-4 py-1 rounded" onClick={() => cadastrar("autor", novoAutor)}>Salvar</button>
            </div>
          )}
        </label>

        {/* Categoria */}
        <label className="flex flex-col text-black">Categoria
          <div className="flex items-center gap-2">
            <select value={categoriaSelecionada} onChange={(e) => setCategoriaSelecionada(e.target.value)} className="p-3 rounded bg-white text-gray-800 flex-1">
              <option value="">Selecione categoria</option>
              {categorias.filter((c) => c.nome_categoria && isNaN(c.nome_categoria)).map((c) => (
                <option key={c.id_categoria} value={c.id_categoria}>{c.nome_categoria}</option>
              ))}
            </select>
            <button type="button" className="border border-red-500 text-red-500 rounded px-2 py-1 text-sm" onClick={() => setMostrarCadastroCategoria(!mostrarCadastroCategoria)}>Cadastrar nova categoria</button>
          </div>
          {mostrarCadastroCategoria && (
            <div className="bg-gray-200 p-3 rounded mt-2">
              <input value={novaCategoria} onChange={(e) => setNovaCategoria(e.target.value)} className="p-2 w-full rounded mb-2" placeholder="Nome da nova categoria" />
              <button type="button" className="bg-red-500 text-white px-4 py-1 rounded" onClick={() => cadastrar("categoria", novaCategoria)}>Salvar</button>
            </div>
          )}
        </label>

        {/* Subcategoria */}
        <label className="flex flex-col text-black">Subcategoria
          <div className="flex items-center gap-2">
            <select value={subcategoriaSelecionada} onChange={(e) => setSubcategoriaSelecionada(e.target.value)} className="p-3 rounded bg-white text-gray-800 flex-1">
              <option value="">Selecione subcategoria</option>
              {subcategorias.filter((s) => s.nome_categoria && isNaN(s.nome_categoria)).map((s) => (
                <option key={s.id_categoria} value={s.id_categoria}>{s.nome_categoria}</option>
              ))}
            </select>
            <button type="button" className="border border-red-500 text-red-500 rounded px-2 py-1 text-sm" onClick={() => setMostrarCadastroSubcategoria(!mostrarCadastroSubcategoria)}>Cadastrar nova subcategoria</button>
          </div>
          {mostrarCadastroSubcategoria && (
            <div className="bg-gray-200 p-3 rounded mt-2">
              <input value={novaSubcategoria} onChange={(e) => setNovaSubcategoria(e.target.value)} className="p-2 w-full rounded mb-2" placeholder="Nome da nova subcategoria" />
              <button type="button" className="bg-red-500 text-white px-4 py-1 rounded" onClick={() => cadastrar("subcategoria", novaSubcategoria)}>Salvar</button>
            </div>
          )}
        </label>

        {/* Editora */}
        <label className="flex flex-col text-black">Editora
          <div className="flex items-center gap-2">
            <select value={idEditora} onChange={(e) => setIdEditora(e.target.value)} className="p-3 rounded bg-white text-gray-800 flex-1">
              <option value="">Selecione editora</option>
              {editoras.filter((e) => e.nome_editora && isNaN(e.nome_editora)).map((e) => (
                <option key={e.id} value={e.id}>{e.nome_editora}</option>
              ))}
            </select>
            <button type="button" className="border border-red-500 text-red-500 rounded px-2 py-1 text-sm" onClick={() => setMostrarCadastroEditora(!mostrarCadastroEditora)}>Cadastrar nova editora</button>
          </div>
          {mostrarCadastroEditora && (
            <div className="bg-gray-200 p-3 rounded mt-2">
              <input value={novaEditora} onChange={(e) => setNovaEditora(e.target.value)} className="p-2 w-full rounded mb-2" placeholder="Nome da nova editora" />
              <button type="button" className="bg-red-500 text-white px-4 py-1 rounded" onClick={() => cadastrar("editora", novaEditora)}>Salvar</button>
            </div>
          )}
        </label>

        <div className="flex justify-center mt-4">
          <Botao tipo="submit">Salvar</Botao>
        </div>
      </form>
    </Layout>
  );
}
