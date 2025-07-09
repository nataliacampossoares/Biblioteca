import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/LayoutsemMenu";
import { useEffect, useState } from "react";

export default function LivrosDetalhes() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [livro, setLivro] = useState([]);

  useEffect(() => {
    async function buscarLivro() {
      try {
        const resposta = await fetch(`http://localhost:3000/listarLivro/${id}`);
        if (!resposta.ok) throw new Error("Erro ao buscar Livro");
        const data = await resposta.json();
        console.log(data);
        setLivro(data);
      } catch (err) {
        console.error("Erro ao buscar cliente:", err);
      }
    }

    buscarLivro();
  }, [id]);

  console.log("Livro:", livro);

  return (
    <Layout>
      <div className="h-full w-full flex items-center justify-center px-4 py-10">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-8">
          <div className="flex justify-center md:w-1/2">
            <img
              src={
                livro.caminho_imagens
                  ? `http://localhost:3000${livro.caminho_imagens}`
                  : "/src/img/bibliotecario.jpeg"
              }
              alt={livro.titulo}
              className="w-64 h-[370px] object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="md:w-1/2 flex flex-col justify-center">
            <h1 className="text-2xl font-bold mb-4 text-black ">
              {livro.titulo}
            </h1>

            <div className="flex justify-between mb-4">
              <div className="flex flex-col">
                <p className="text-sm text-gray-600 mb-1">
                  Autor(es): {console.log("autores", livro.nome_autor)}
                  <span className="text-gray-800">{livro.autores}</span>
                </p>
              </div>

              <div className="flex flex-col items-end">
                <p className="text-xs mr-5 text-gray-600 mb-1">
                  Editora:{" "}
                  <span className="text-gray-800">{livro.nome_editora}</span>
                </p>
                <p className="text-xs mr-5 text-gray-600">
                  Edição: <span className="text-gray-800">{livro.edicao}</span>
                </p>
              </div>
            </div>

            <div className="mt-2">
              <p className="text-md text-gray-600 font-semibold mb-1">
                Sinopse
              </p>
              <p className="text-sm text-gray-700 italic leading-relaxed">
                {livro.sinopse}
              </p>
            </div>

            <div className="mt-2">
              <p className="text-md text-gray-600 font-semibold mb-1">
                Quantidade disponível para empréstimo
              </p>
              <p className="text-sm text-gray-700 italic leading-relaxed">
                {livro.qtd_disponivel}
              </p>
            </div>

            <div className="mt-2">
              <p className="text-md text-gray-600 font-semibold mb-1">Categorias: </p>
              <p className="text-sm text-gray-700 italic leading-relaxed">
                {livro.categorias?.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// import { useEffect, useState } from "react";
// import Layout from "../components/Layout";
// import { BarraPesquisa } from "../components/BarraPesquisa";
// import Botao from "../components/Botao";
// import { useNavigate } from "react-router-dom";
// import { IconUserStar } from "@tabler/icons-react";

// export default function LivrosBibliotecario() {
//   const [categoria, setCategoria] = useState("");
//   const [subcategoria, setSubcategoria] = useState("");
//   const [busca, setBusca] = useState("");
//   const [categorias, setCategorias] = useState([]);
//   const [mostrarCadastroCategoria, setMostrarCadastroCategoria] =
//     useState(false);
//   const [nomeNovaCategoria, setNomeNovaCategoria] = useState("");
//   const [livros, setLivros] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:3000/listarCategorias")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Erro ao buscar categorias");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setCategorias(data);
//       })
//       .catch((error) => {
//         console.error("Erro ao carregar categorias:", error);
//       });
//   }, []);

//   useEffect(() => {
//     fetch("http://localhost:3000/listarLivros")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Erro ao buscar livros");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Livros carregados do backend:", data);
//         setLivros(data);
//         console.log("Estado livros será atualizado para:", data);
//       })
//       .catch((error) => {
//         console.error("Erro ao carregar livros:", error);
//       });
//   }, []);

//   const subcategorias = {
//     Ficção: ["Romance", "Fantasia"],
//     "Não Ficção": ["Biografia", "História"],
//   };

//   {
//     livros.map((livro) => console.log(livro));
//   }

//   return (
//     <Layout>
//       <p className="text-black">OOOOOIIII</p>
//       <div className="flex flex-col h-full w-full">
//         <div className="shrink-0">
//           <BarraPesquisa filtro={busca} setFiltro={setBusca} />
//           <div className="flex gap-4 text-sm text-gray-500 mt-2">
//             <span className="mt-6 italic">Seção</span>
//             <select
//               value={categoria}
//               onChange={(e) => setCategoria(e.target.value)}
//               className="bg-[#f1f1f1] rounded-2xl p-2 italic text-gray-700 mt-4"
//             >
//               <option value="">Categoria</option>
//               {categorias.map((cat) => (
//                 <option key={cat.id} value={cat.nome_categoria}>
//                   {cat.nome_categoria}
//                 </option>
//               ))}
//             </select>

//           </div>

//           <select
//             value={subcategoria}
//             onChange={(e) => setSubcategoria(e.target.value)}
//             disabled={!categoria}
//             className="bg-[#f1f1f1] rounded-2xl p-2 italic text-gray-700 mt-4"
//           >
//             <option value="">Subcategoria</option>
//             {categoria &&
//               subcategorias[categoria].map((sub) => (
//                 <option key={sub} value={sub}>
//                   {sub}
//                 </option>
//               ))}
//           </select>
//           <div className="flex-1 overflow-y-auto px-4 mt-4 pr-4">
//             <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 pb-10">
//               {livros.map((livro) => (
//                 <div
//                   key={livro.id}
//                   onClick={() => navigate(`/livro/${livro.id}`)}
//                   className="cursor-pointer bg-white text-center w-[110px] rounded-lg p-2 shadow-md hover:shadow-lg transition
//              flex flex-col items-start justify-start"
//                 >
//                   <img
//                     src={
//                       livro.caminho_imagens
//                         ? `http://localhost:3000${livro.caminho_imagens}`
//                         : "/src/img/bibliotecario.jpeg"
//                     }
//                     alt={livro.titulo}
//                     className="w-full h-36 object-cover rounded"
//                   />
//                   <div className="flex flex-col items-center justify-center">
//                     <p className="text-xs font-semibold mt-1 truncate text-black">
//                       {livro.titulo}
//                     </p>
//                     <p className="text-xs mt-1 truncate text-black">
//                       {livro.nome_autor}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="shrink-0 p-4 flex justify-center bg-white shadow-inner">
//         <Botao onClick={handleCadastrarLivro}>Cadastrar novo Livro</Botao>
//       </div>
//     </Layout>
//   );
// }
