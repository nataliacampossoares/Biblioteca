import { useState } from 'react';
import Layout from '../components/Layout';
import { BarraPesquisa } from '../components/BarraPesquisa';
import Botao from '../components/Botao';

export default function LivrosBibliotecario() {
  const [categoria, setCategoria] = useState('');
  const [subcategoria, setSubcategoria] = useState('');
  const [busca, setBusca] = useState('');

  const categorias = ['Ficção', 'Não Ficção'];
  const subcategorias = {
    'Ficção': ['Romance', 'Fantasia'],
    'Não Ficção': ['Biografia', 'História']
  };

  const livros = [
    {
      titulo: 'A Hipótese do Amor',
      autor: 'Ali Hazelwood',
      categoria: 'Ficção',
      subcategoria: 'Romance',
      capa: 'https://m.media-amazon.com/images/I/81LTEfXYgcL._SL1500_.jpg',
      avaliacao: 5
    },
    {
      titulo: 'É Assim Que Acaba',
      autor: 'Colleen Hoover',
      categoria: 'Ficção',
      subcategoria: 'Romance',
      capa: 'https://m.media-amazon.com/images/I/91r5G8RxqfL.jpg',
      avaliacao: 4
    },
    {
      titulo: 'Como eu era antes de você',
      autor: 'Jojo Moyes',
      categoria: 'Não Ficção',
      subcategoria: 'Biografia',
      capa: 'https://m.media-amazon.com/images/I/81-P6oEm8cL._AC_UF1000,1000_QL80_.jpg',
      avaliacao: 5
    },
    {
      titulo: 'Como eu era antes de você',
      autor: 'Jojo Moyes',
      categoria: 'Não Ficção',
      subcategoria: 'Biografia',
      capa: 'https://m.media-amazon.com/images/I/81-P6oEm8cL._AC_UF1000,1000_QL80_.jpg',
      avaliacao: 5
    },
    {
      titulo: 'Como eu era antes de você',
      autor: 'Jojo Moyes',
      categoria: 'Não Ficção',
      subcategoria: 'Biografia',
      capa: 'https://m.media-amazon.com/images/I/81-P6oEm8cL._AC_UF1000,1000_QL80_.jpg',
      avaliacao: 5
    },
  ];

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
      <div className="flex flex-col items-end p-6 w-full">
        <div className="w-full max-w-7xl">
          <BarraPesquisa filtro={busca} setFiltro={setBusca} />

          <div className="flex gap-4 mb-4 text-sm text-gray-500">
            <span className='mt-6 italic ml-60'>Seção</span>
            <select
              value={categoria}
              onChange={(e) => {
                setCategoria(e.target.value);
                setSubcategoria('');
              }}
              className="bg-[#f1f1f1] rounded-2xl p-2 italic m-2 text-gray-700"
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
              className="bg-[#f1f1f1] rounded-2xl p-2 italic m-2 text-gray-700"
            >
              <option value="">Subcategoria</option>
              {categoria &&
                subcategorias[categoria].map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
            </select>
          </div>

          <hr className="mb-6 border-gray-300" />

          {/* LIVROS EM GRADE COM ROLAGEM VERTICAL */}
          <div className="ml-60 max-h-[400px] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {livrosFiltrados.map((livro, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-2 text-center hover:shadow-lg transition w-36"
                >
                  <img
                    src={livro.capa}
                    alt={livro.titulo}
                    className="w-full h-40 object-cover rounded"
                  />
                  <p className="text-xs font-semibold mt-2">{livro.titulo}</p>
                  <p className="text-[10px] text-gray-500">{livro.autor}</p>
                  <p className="text-[10px] text-gray-400">
                    {livro.categoria} - {livro.subcategoria}
                  </p>
                  <p className="text-yellow-500 mt-1 text-xs">{renderEstrelas(livro.avaliacao)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="shrink-0 p-4 ml-60 flex justify-center">
            <Botao>Cadastrar novo Livro</Botao>
          </div>
        </div>
      </div>
    </Layout>
  );
}
