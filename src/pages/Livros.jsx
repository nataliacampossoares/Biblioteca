import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout'; // <-- importa o Layout

export default function LivrosDetalhes() {
  const navigate = useNavigate();
  const { id } = useParams();

  const livro = {
    titulo: 'A Hipótese do Amor',
    autor: 'Ali Hazelwood',
    categoria: 'Ficção',
    subcategoria: 'Romance',
    descricao: 'Uma comédia romântica sobre uma cientista cética e um professor mal-humorado que fingem um relacionamento.',
    capa: 'https://m.media-amazon.com/images/I/81LTEfXYgcL._SL1500_.jpg',
    avaliacao: 4
  };

  const renderEstrelas = (avaliacao) =>
    '⭐'.repeat(avaliacao) + '☆'.repeat(5 - avaliacao);

  return (
    <Layout>
      <div className="h-full w-full flex items-center justify-center bg-gray-50 px-4 py-10">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-8">
          
          {/* Imagem do livro */}
          <div className="flex justify-center md:w-1/2">
            <img
              src={livro.capa}
              alt={livro.titulo}
              className="w-64 h-[370px] object-cover rounded-xl shadow-md"
            />
          </div>

          {/* Detalhes do livro */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <h1 className="text-2xl font-bold mb-2">{livro.titulo}</h1>
            <p className="text-md text-gray-600 mb-1">Autor: <span className="text-gray-800">{livro.autor}</span></p>
            <p className="text-md text-gray-600 mb-1">Categoria: <span className="text-gray-800">{livro.categoria}</span></p>
            <p className="text-md text-gray-600 mb-1">Subcategoria: <span className="text-gray-800">{livro.subcategoria}</span></p>
            <p className="text-md text-gray-600 mb-3">Avaliação: <span className="text-yellow-500">{renderEstrelas(livro.avaliacao)}</span></p>
            <p className="text-sm text-gray-700 italic">{livro.descricao}</p>

            <button
              onClick={() => navigate('/livros')}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-full w-fit hover:bg-blue-700 transition"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
