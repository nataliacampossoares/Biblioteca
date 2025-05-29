import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout'; 

export default function LivrosDetalhes() {
  const navigate = useNavigate();
  const { id } = useParams();

  const livro = {
    titulo: 'A Hipótese do Amor',
    autor: 'Ali Hazelwood',
    avaliacao: 4,
    editora: 'Arqueiro',
    edição: '2° edição',
    descricao: `Olive, uma doutoranda cética em relação ao amor, inventa um namoro falso para ajudar a amiga a ficar com o garoto de quem gosta. Em um momento de impulso, ela beija o primeiro homem que vê — o temido professor Adam Carlsen. Para sua surpresa, ele topa manter a farsa. Mas, à medida que o "experimento" avança, o que era apenas uma hipótese sobre o amor começa a se tornar real.'
`,
    capa: 'https://m.media-amazon.com/images/I/81LTEfXYgcL._SL1500_.jpg',
  };

  const renderEstrelas = (avaliacao) =>
    '⭐'.repeat(avaliacao) + '☆'.repeat(5 - avaliacao);

  return (
    <Layout>
      <div className="h-full w-full flex items-center justify-center bg-gray-50 px-4 py-10">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-8">
       
          <div className="flex justify-center md:w-1/2">
            <img
              src={livro.capa}
              alt={livro.titulo}
              className="w-64 h-[370px] object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="md:w-1/2 flex flex-col justify-center">
            <h1 className="text-2xl font-bold mb-4">{livro.titulo}</h1>

            <div className="flex justify-between mb-4">
              <div className="flex flex-col">
                <p className="text-sm text-gray-600 mb-1">
                  Autor(es): <span className="text-gray-800">{livro.autor}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Avaliação: <span className="text-yellow-500">{renderEstrelas(livro.avaliacao)}</span>
                </p>
              </div>

              <div className="flex flex-col items-end">
                <p className="text-xs mr-5 text-gray-600 mb-1">
                  Editora: <span className="text-gray-800">{livro.editora}</span>
                </p>
                <p className="text-xs mr-5 text-gray-600">
                  Edição: <span className="text-gray-800">{livro.edição}</span>
                </p>
              </div>
            </div>


            <div className="mt-2">
              <p className="text-md text-gray-600 font-semibold mb-1">Sinopse</p>
              <p className="text-sm text-gray-700 italic leading-relaxed">
                {livro.descricao}
              </p>
            </div>


          <div>Quantidade Disponível: </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
