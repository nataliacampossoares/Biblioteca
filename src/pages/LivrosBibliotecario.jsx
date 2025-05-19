import { useState } from 'react';
import Layout from '../components/Layout';
import { BarraPesquisa } from '../components/BarraPesquisa';
import Botao from '../components/Botao';
import { useNavigate } from 'react-router-dom';

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
      titulo: 'Mais um Livro',
      autor: 'Autor Qualquer',
      categoria: 'Ficção',
      subcategoria: 'Fantasia',
      capa: 'https://m.media-amazon.com/images/I/81LTEfXYgcL._SL1500_.jpg',
      avaliacao: 3
    },
    {
      titulo: 'Outro Livro Qualquer',
      autor: 'Outro Autor',
      categoria: 'Ficção',
      subcategoria: 'Fantasia',
      capa: 'https://m.media-amazon.com/images/I/91r5G8RxqfL.jpg',
      avaliacao: 2
    },
    {
      titulo: 'Outro Livro Qualquer',
      autor: 'Outro Autor',
      categoria: 'Ficção',
      subcategoria: 'Fantasia',
      capa: 'https://m.media-amazon.com/images/I/91r5G8RxqfL.jpg',
      avaliacao: 2
    },
    {
      titulo: 'Outro Livro Qualquer',
      autor: 'Outro Autor',
      categoria: 'Ficção',
      subcategoria: 'Fantasia',
      capa: 'https://m.media-amazon.com/images/I/91r5G8RxqfL.jpg',
      avaliacao: 2
    },
    {
      titulo: 'Outro Livro Qualquer',
      autor: 'Outro Autor',
      categoria: 'Ficção',
      subcategoria: 'Fantasia',
      capa: 'https://m.media-amazon.com/images/I/91r5G8RxqfL.jpg',
      avaliacao: 2
    },
    {
      titulo: 'Outro Livro Qualquer',
      autor: 'Outro Autor',
      categoria: 'Ficção',
      subcategoria: 'Fantasia',
      capa: 'https://m.media-amazon.com/images/I/91r5G8RxqfL.jpg',
      avaliacao: 2
    },
    {
      titulo: 'Outro Livro Qualquer',
      autor: 'Outro Autor',
      categoria: 'Ficção',
      subcategoria: 'Fantasia',
      capa: 'https://m.media-amazon.com/images/I/91r5G8RxqfL.jpg',
      avaliacao: 2
    },
    {
      titulo: 'Outro Livro Qualquer',
      autor: 'Outro Autor',
      categoria: 'Ficção',
      subcategoria: 'Fantasia',
      capa: 'https://m.media-amazon.com/images/I/91r5G8RxqfL.jpg',
      avaliacao: 2
    },
    {
      titulo: 'Outro Livro Qualquer',
      autor: 'Outro Autor',
      categoria: 'Ficção',
      subcategoria: 'Fantasia',
      capa: 'https://m.media-amazon.com/images/I/91r5G8RxqfL.jpg',
      avaliacao: 2
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
      <div className="flex flex-col h-screen w-full overflow-hidden">
        <div className="shrink-0">
          <BarraPesquisa filtro={busca} setFiltro={setBusca} />
        </div>

        <div className="flex gap-4 text-sm text-gray-500 mt-2 ml-60">
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

      
        <div className="flex-1 overflow-y-auto px-4 mt-4 ml-60 pr-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-[10px]">
            {livrosFiltrados.map((livro, index) => (
              <div
                key={index}
                className="bg-white text-center w-[110px] rounded-lg p-2 shadow-md"
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


        <div className="shrink-0 p-4 ml-60 flex justify-center">
          <Botao onClick={handleCadastrarLivro}>Cadastrar novo Livro</Botao>
        </div>
      </div>
    </Layout>
  );
}
