import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { IconPencil, IconTrash, IconDeviceFloppy } from "@tabler/icons-react";

export default function Livro() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [modoEdicao, setModoEdicao] = useState(false);
  const [livro, setLivro] = useState({});
  const [form, setForm] = useState({
    titulo: "",
    sinopse: "",
    edicao: "",
    qtd_disponivel: "",
    isbn: "",
    autores: [],
    categorias: [],
    editora: "",
    imagem: null, 
  });

console.log("Autores", livro.autores)

  useEffect(() => {
    async function buscarLivro() {
      try {
        const resposta = await fetch(`http://localhost:3000/listarLivro/${id}`);
        if (!resposta.ok) throw new Error("Erro ao buscar Livro");
        const data = await resposta.json();
        setLivro(data);
        setForm({
          titulo: data.titulo || "",
          sinopse: data.sinopse || "",
          edicao: data.edicao || "",
          qtd_disponivel: data.qtd_disponivel || "",
          isbn: data.isbn || "",
          autores: data.autores || [],
          categorias: data.categorias || [],
          editora: data.nome_editora || "",
          imagem: null,
        });
      } catch (err) {
        console.error("Erro ao buscar livro:", err);
      }
    }

    buscarLivro();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const salvarAlteracoes = async () => {
    try {
      const formData = new FormData();
      formData.append("titulo", form.titulo);
      formData.append("sinopse", form.sinopse);
      formData.append("edicao", form.edicao);
      formData.append("qtd_disponivel", form.qtd_disponivel);
      formData.append("isbn", form.isbn);
      formData.append("editora", form.editora);
      if (form.imagem) {
        formData.append("imagem", form.imagem);
      }

      const resposta = await fetch(`http://localhost:3000/alterarLivro/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!resposta.ok) throw new Error("Erro ao atualizar livro");

      alert("Livro atualizado com sucesso!");
      setModoEdicao(false);
      window.location.reload(); 
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
      alert("Erro ao atualizar livro");
    }
  };

  const handleButtonClickLixo = async () => {
    if (window.confirm("Deseja realmente desativar esse livro?")) {
      try {
        const resposta = await fetch(`http://localhost:3000/desativarLivro/${id}`);
        if (!resposta.ok) throw new Error("Erro ao desativar livro");

        alert("Livro desativado com sucesso!");
        navigate("/LivrosBibliotecario");
      } catch (error) {
        console.error("Erro ao desativar livro:", error);
        alert("Erro ao desativar livro");
      }
    }
  };

  return (
    <Layout>
      <div className="h-full w-full flex items-center justify-center px-4 py-10">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-8">
        
          <div className="flex flex-col items-center md:w-1/2">
            <img
              src={
                livro.caminho_imagens
                  ? `http://localhost:3000${livro.caminho_imagens}`
                  : "/src/img/bibliotecario.jpeg"
              }
              alt={form.titulo}
              className="w-64 h-[370px] object-cover rounded-xl shadow-md"
            />

            {modoEdicao && (
              <div className="mt-4">
                <label htmlFor="imagem" className="block text-sm font-medium text-gray-700 mb-1">
                  Imagem:
                </label>
                <input
                  type="file"
                  id="imagem"
                  name="imagem"
                  accept="image/*"
                  onChange={(e) => setForm((prev) => ({ ...prev, imagem: e.target.files[0] }))}
                  className="block w-full text-sm text-gray-700"
                />
              </div>
            )}
          </div>

          <div className="md:w-1/2 flex flex-col justify-center">
            {modoEdicao ? (
              <input
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                className="text-2xl font-bold mb-4 text-black border p-1 rounded"
              />
            ) : (
              <h1 className="text-2xl font-bold mb-4 text-black">{livro.titulo}</h1>
            )}

            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Autor(es): <span className="text-gray-800">{livro.autores?.join(", ")}</span>
                </p>
              </div>

              <div className="flex flex-col items-end">
                <p className="text-xs mr-5 text-gray-600 mb-1">
                  Editora:{" "}
                  {modoEdicao ? (
                    <input
                      name="editora"
                      value={form.editora}
                      onChange={handleChange}
                      className="text-xs text-gray-800 border p-1 rounded w-32"
                    />
                  ) : (
                    <span className="text-gray-800">{livro.nome_editora}</span>
                  )}
                </p>
                <p className="text-xs mr-5 text-gray-600">
                  Edição:{" "}
                  {modoEdicao ? (
                    <input
                      name="edicao"
                      value={form.edicao}
                      onChange={handleChange}
                      className="text-gray-800 border p-1 rounded w-16"
                    />
                  ) : (
                    <span className="text-gray-800">{livro.edicao}</span>
                  )}
                </p>
              </div>
            </div>

            <div className="mt-2  overflow-y-auto  max-h-96">
              <p className="text-md text-gray-600 font-semibold mb-1">Sinopse</p>
              {modoEdicao ? (
                <textarea
                  name="sinopse"
                  value={form.sinopse}
                  onChange={handleChange}
                  className="text-sm text-gray-700 italic leading-relaxed border p-1 rounded w-full"
                />
              ) : (
                <p className="text-sm text-gray-700 italic leading-relaxed">{livro.sinopse}</p>
              )}
            </div>

            <div className="mt-2">
              <p className="text-md text-gray-600 font-semibold mb-1">
                Quantidade disponível para empréstimo
              </p>
              {modoEdicao ? (
                <input
                  name="qtd_disponivel"
                  value={form.qtd_disponivel}
                  onChange={handleChange}
                  className="text-sm text-gray-700 italic leading-relaxed border p-1 rounded w-16"
                />
              ) : (
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  {livro.qtd_disponivel}
                </p>
              )}
            </div>

            <div className="mt-2">
              <p className="text-md text-gray-600 font-semibold mb-1">Categoria</p>
              <p className="text-sm text-gray-700 italic leading-relaxed">
                {livro.categorias?.join(", ")}
              </p>
              <p className="text-md text-gray-600 font-semibold mb-1">ISBN</p>
              {modoEdicao ? (
                <input
                  name="isbn"
                  value={form.isbn}
                  onChange={handleChange}
                  className="text-sm text-gray-700 italic leading-relaxed border p-1 rounded w-48"
                />
              ) : (
                <p className="text-sm text-gray-700 italic leading-relaxed">{livro.isbn}</p>
              )}
            </div>

            <div className="h-full w-full flex items-end justify-end gap-2 mt-4">
              {modoEdicao ? (
                <button
                  style={{ backgroundColor: "#d9d9d9" }}
                  onClick={salvarAlteracoes}
                  title="Salvar alterações"
                >
                  <IconDeviceFloppy className="text-[#555555]" />
                </button>
              ) : (
                <button
                  style={{ backgroundColor: "#d9d9d9" }}
                  onClick={() => setModoEdicao(true)}
                  title="Editar livro"
                >
                  <IconPencil className="text-[#555555]" />
                </button>
              )}
              <button
                style={{ backgroundColor: "#d9d9d9" }}
                onClick={handleButtonClickLixo}
                title="Desativar livro"
              >
                <IconTrash className="text-[#555555]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
