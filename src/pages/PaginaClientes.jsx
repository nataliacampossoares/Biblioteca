import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import Layout from '../components/LayoutsemMenu';
import { BarraPesquisa } from '../components/BarraPesquisa';
import Botao from '../components/Botao';

export default function LivrosBibliotecario() {
  const [categoria, setCategoria] = useState('');
  const [subcategoria, setSubcategoria] = useState('');
  const [busca, setBusca] = useState('');

  const navigate = useNavigate();

  const handleCadastrarLivro = () => {
    navigate("/cadastrarlivro");
  };

  const categorias = ['Ficção', 'Não Ficção'];
  const subcategorias = {
    'Ficção': ['Romance', 'Fantasia'],
    'Não Ficção': ['Biografia', 'História']
  };

  const livroBase = {
    titulo: 'A Hipótese do Amor',
    autor: 'Ali Hazelwood',
    categoria: 'Ficção',
    subcategoria: 'Romance',
    capa: 'https://m.media-amazon.com/images/I/81LTEfXYgcL._SL1500_.jpg',
    avaliacao: 4,
  };

  const livros = Array.from({ length: 12 }, (_, i) => ({
    ...livroBase,
    titulo: `Livro ${i + 1}`,
    id: i
  }));

  const livrosFiltrados = livros.filter(livro =>
    livro.titulo.toLowerCase().includes(busca.toLowerCase()) &&
    (categoria === '' || livro.categoria === categoria) &&
    (subcategoria === '' || livro.subcategoria === subcategoria)
  );

  const renderEstrelas = (avaliacao) => {
    return '⭐'.repeat(avaliacao) + '☆'.repeat(5 - avaliacao);
  };

  return (
    <Layout>
      <div className="flex flex-col h-full w-full">
        <div className="shrink-0">
          <BarraPesquisa filtro={busca} setFiltro={setBusca} />
          <div className="flex gap-4 text-sm text-gray-500 mt-2">
            <span className="mt-6 italic">Seção</span>
            <select
              value={categoria}
              onChange={(e) => {
                setCategoria(e.target.value);
                setSubcategoria('');
              }}
              className="bg-[#f1f1f1] rounded-2xl p-2 italic text-gray-700 mt-4"
            >
              <option value="">Categoria</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={subcategoria}
              onChange={(e) => setSubcategoria(e.target.value)}
              disabled={!categoria}
              className="bg-[#f1f1f1] rounded-2xl p-2 italic text-gray-700 mt-4"
            >
              <option value="">Subcategoria</option>
              {categoria &&
                subcategorias[categoria].map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
            </select>
          </div>
        </div>

        {/* Grade de livros */}
        <div className="flex-1 overflow-y-auto px-4 mt-4 pr-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 pb-10">
            {livrosFiltrados.map((livro, index) => (
              <div
                key={index}
                onClick={() => navigate(`/livross/${livro.id}`)}
                className="cursor-pointer bg-white text-center w-[110px] rounded-lg p-2 shadow-md hover:shadow-lg transition"
              >
                <img
                  src={livro.capa}
                  alt={livro.titulo}
                  className="w-full h-36 object-cover rounded"
                />
                <p className="text-xs font-semibold mt-1 truncate">{livro.titulo}</p>
                <p className="text-[10px] text-gray-500 truncate">{livro.autor}</p>
                <p className="text-[10px] text-gray-400 truncate">
                  {livro.categoria} - {livro.subcategoria}
                </p>
                <p className="text-yellow-500 text-xs">{renderEstrelas(livro.avaliacao)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
