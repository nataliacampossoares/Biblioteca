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

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/listarAutores").then(res => res.json()).then(data => setAutores(data));
    fetch("http://localhost:3000/listarCategorias").then(res => res.json()).then(data => setCategorias(data));
    fetch("http://localhost:3000/listarEditoras").then(res => res.json()).then(data => setEditoras(data));
  }, []);

  useEffect(() => {
    if (categoriaSelecionada) {
      fetch(`http://localhost:3000/listarSubcategorias/${categoriaSelecionada}`)
        .then(res => res.json())
        .then(data => setSubcategorias(data));
    } else {
      setSubcategorias([]);
    }
  }, [categoriaSelecionada]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("qtd_disponivel", qtdDisponivel);
    formData.append("edicao", edicao);
    formData.append("descricao", descricao);
    formData.append("isbn", isbn);
    formData.append("id_editora", idEditora);
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
          navigate("/livros");
        } else {
          throw new Error("Erro ao cadastrar livro");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao cadastrar livro");
      });
  }

  async function cadastrarNovoAutor() {
    const nome = prompt("Digite o nome do novo autor:");
    if (!nome) return;
    await fetch("http://localhost:3000/cadastrarAutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome_autor: nome })
    });
    const atualizados = await fetch("http://localhost:3000/listarAutores").then(res => res.json());
    setAutores(atualizados);

    const novo = atualizados.find(a => a.nome === nome);
    if (novo) setAutoresSelecionados((prev) => [...prev, novo.id]);
  }

  async function cadastrarNovaCategoria() {
    const nome = prompt("Digite o nome da nova categoria:");
    if (!nome) return;
    const res = await fetch("http://localhost:3000/cadastrarCategoria", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome_categoria: nome })
    });
    const novaCategoria = await res.json();
    const atualizadas = await fetch("http://localhost:3000/listarCategorias").then(res => res.json());
    setCategorias(atualizadas);
    setCategoriaSelecionada(novaCategoria.id_categoria.toString());
  }

  async function cadastrarNovaEditora() {
    const nome = prompt("Digite o nome da nova editora:");
    if (!nome) return;
    await fetch("http://localhost:3000/cadastrarEditora", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome_editora: nome })
    });
    const atualizadas = await fetch("http://localhost:3000/listarEditoras").then(res => res.json());
    setEditoras(atualizadas);
    const nova = atualizadas.find(e => e.nome === nome);
    if (nova) setIdEditora(nova.id.toString());
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center gap-2">
          {imagem ? (
            <img src={URL.createObjectURL(imagem)} alt="Prévia" className="w-40 h-40 object-cover rounded border" />
          ) : (
            <div className="w-40 h-40 flex items-center justify-center border border-dashed rounded text-gray-400">
              Imagem
            </div>
          )}
          <input type="file" accept="image/*" onChange={(e) => setImagem(e.target.files[0])} />
        </div>

        <div className="grid gap-2">
          <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required className="input" />

          <div className="flex justify-between items-center">
            <label>Autor(es)</label>
            <button type="button" onClick={cadastrarNovoAutor} className="text-blue-500 underline text-sm">Cadastrar autor</button>
          </div>
          <div className="grid grid-cols-2 gap-1 max-h-32 overflow-y-auto border rounded p-2">
            {autores.map((autor) => (
              <label key={autor.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  value={autor.id}
                  checked={autoresSelecionados.includes(autor.id)}
                  onChange={(e) => {
                    const id = parseInt(e.target.value);
                    setAutoresSelecionados((prev) =>
                      e.target.checked ? [...prev, id] : prev.filter((a) => a !== id)
                    );
                  }}
                />
                {autor.nome}
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <label>Categoria</label>
            <button type="button" onClick={cadastrarNovaCategoria} className="text-blue-500 underline text-sm">Cadastrar</button>
          </div>
          <select value={categoriaSelecionada} onChange={(e) => setCategoriaSelecionada(e.target.value)} className="w-full border rounded p-1">
            <option value="">Selecione uma categoria</option>
            {categorias.map((cat) => (
              <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nome_categoria}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Subcategoria</label>
          <select value={subcategoriaSelecionada} onChange={(e) => setSubcategoriaSelecionada(e.target.value)} className="w-full border rounded p-1">
            <option value="">Selecione uma subcategoria</option>
            {subcategorias.map((sub) => (
              <option key={sub.id_categoria} value={sub.id_categoria}>{sub.nome_categoria}</option>
            ))}
          </select>
        </div>

        <input type="number" placeholder="Quantidade" value={qtdDisponivel} onChange={(e) => setQtdDisponivel(e.target.value)} required className="input" />

        <input type="text" placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} required className="input" />

        <div>
          <div className="flex justify-between items-center">
            <label>Editora</label>
            <button type="button" onClick={cadastrarNovaEditora} className="text-blue-500 underline text-sm">Cadastrar</button>
          </div>
          <select value={idEditora} onChange={(e) => setIdEditora(e.target.value)} required className="w-full border rounded p-1">
            <option value="">Selecione a Editora</option>
            {editoras.map((editora) => (
              <option key={editora.id} value={editora.id}>{editora.nome}</option>
            ))}
          </select>
        </div>

        <input type="text" placeholder="Edição" value={edicao} onChange={(e) => setEdicao(e.target.value)} required className="input" />

        <div className="col-span-2">
          <textarea placeholder="Sinopse" value={descricao} onChange={(e) => setDescricao(e.target.value)} required className="w-full h-24 border rounded p-2"></textarea>
        </div>

        <div className="col-span-2 flex justify-center">
          <Botao tipo="submit">Cadastrar</Botao>
        </div>
      </form>
    </Layout>
  );
}