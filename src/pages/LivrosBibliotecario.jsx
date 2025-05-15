import { useState } from 'react';
import Layout from '../components/Layout';
import { BarraPesquisa } from '../components/BarraPesquisa';
import Botao from '../components/Button'

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
      titulo: 'O Hobbit',
      autor: 'J.R.R. Tolkien',
      categoria: 'Ficção',
      subcategoria: 'Fantasia',
      capa: 'https://m.media-amazon.com/images/I/91b0C2YNSrL.jpg',
      avaliacao: 5
    },
    {
      titulo: 'Steve Jobs',
      autor: 'Walter Isaacson',
      categoria: 'Não Ficção',
      subcategoria: 'Biografia',
      capa: 'https://m.media-amazon.com/images/I/71xBLRBYOiL.jpg',
      avaliacao: 4
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
      <div className="flex-1 p-8">
        {/* Caso sua BarraPesquisa não aceite props, remova filtro/setFiltro */}
        <BarraPesquisa filtro={busca} setFiltro={setBusca} />

        <div className="flex gap-4 mb-4 text-sm text-gray-500">
          <span className='mt-6 italic'>Seção</span>
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

        <hr className="mb-6 border-gray-300 max-w-5xl mx-auto" />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {livrosFiltrados.map((livro, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-3 text-center hover:shadow-lg transition w-full"
            >
              <img
                src={livro.capa}
                alt={livro.titulo}
                className="w-full h-36 object-cover rounded-md"
              />
              <p className="text-sm font-semibold mt-2">{livro.titulo}</p>
              <p className="text-xs text-gray-500">{livro.autor}</p>
              <p className="text-xs text-gray-400 mb-1">
                {livro.categoria} - {livro.subcategoria}
              </p>
              <p className="text-yellow-500 text-xs">{renderEstrelas(livro.avaliacao)}</p>
            </div>
          ))}
        </div>

      
      </div>
    </Layout>
  );
}
