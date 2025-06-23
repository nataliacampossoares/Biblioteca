import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Botao from "../components/Botao";

export default function CadastrarLivro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [autor, setAutor] = useState("");
  const [editora, setEditora] = useState("");
  const [edicao, setEdicao] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    if (id) {
      async function buscarLivro() {
        try {
          const resp = await fetch(`http://localhost:3001/api/livros/${id}`);
          if (!resp.ok) throw new Error("Erro ao buscar livro");
          const data = await resp.json();

          setAutor(data.autor || "");
          setEditora(data.editora || "");
          setEdicao(data.edicao || "");
          setSinopse(data.sinopse || "");
          setQuantidade(data.quantidade || "");
          setCategoria(data.categoria || "");
        } catch (err) {
          console.error("Erro ao buscar livro:", err);
        }
      }
      buscarLivro();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosLivro = {
      autor,
      editora,
      edicao,
      sinopse,
      quantidade,
      categoria,
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
        <label className="flex flex-col text-gray-700 font-semibold">
          Autor
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
            placeholder="Digite o autor"
            required
          />
        </label>

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

        <label className="flex flex-col text-gray-700 font-semibold">
          Categoria
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
            placeholder="Digite a categoria"
            required
          />
        </label>

        <Botao type="submit">{id ? "Atualizar" : "Cadastrar"}</Botao>
      </form>
    </Layout>
  );
}
