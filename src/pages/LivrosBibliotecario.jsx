import { useState } from 'react';
import  Menu  from '../components/Menu';

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
      capa: 'https://m.media-amazon.com/images/I/81LTEfXYgcL._SL1500_.jpg'
    },
    {
      titulo: 'É Assim Que Acaba',
      autor: 'Colleen Hoover',
      categoria: 'Ficção',
      subcategoria: 'Romance',
      capa: 'https://m.media-amazon.com/images/I/91bYsX41DVL.jpg'
    },
    {
      titulo: 'Steve Jobs',
      autor: 'Walter Isaacson',
      categoria: 'Não Ficção',
      subcategoria: 'Biografia',
      capa: 'https://m.media-amazon.com/images/I/71xBLRBYOiL.jpg'
    }
  ];

  const livrosFiltrados = livros.filter(livro =>
    livro.titulo.toLowerCase().includes(busca.toLowerCase()) &&
    (categoria === '' || livro.categoria === categoria) &&
    (subcategoria === '' || livro.subcategoria === subcategoria)
  );

  return (
    <div className="flex bg-[#f8f9fa] min-h-screen">
      <div className="fixed top-0 left-0 w-64 h-full bg-white shadow z-10">
       
      </div>
      <div className="ml-64 flex-1 p-8">
        <div className="bg-white rounded-full shadow-md flex items-center px-4 py-2 mb-6 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Buscar"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="flex-1 bg-transparent outline-none placeholder-gray-400 text-gray-700"
          />
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
        </div>

        <div className="flex gap-4 mb-4 text-sm text-gray-500">
          <span className='mt-6 italic' >Seção</span>
          <select
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
              setSubcategoria('');
            }}
            className="bg-[#f1f1f1] rounded-2xl italic m-2 text-gray-700"
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
            className="bg-[#f1f1f1] rounded-2xl italic m-2 text-gray-700"
          >
            <option value="">Subcategoria</option>
            {categoria &&
              subcategorias[categoria].map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
          </select>
        </div>

        <hr className="mb-6 border-gray-300 max-w-5xl mx-auto" />


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {livrosFiltrados.map((livro, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 text-center">
              <img
                src={livro.capa}
                alt={livro.titulo}
                className="w-full h-64 object-cover rounded"
              />
              <p className="text-base font-semibold mt-3">{livro.titulo}</p>
              <p className="text-sm text-gray-500">{livro.autor}</p>
              <p className="text-sm text-gray-400">{livro.categoria} - {livro.subcategoria}</p>
            </div>
          ))}
        </div>

        {/* Botão cadastrar */}
        <div className="flex justify-center mt-10">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-3 rounded-full font-semibold shadow">
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
