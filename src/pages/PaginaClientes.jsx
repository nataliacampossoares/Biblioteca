import Layout from "../components/Layout"
import { BarraPesquisa } from "../components/BarraPesquisa"


export default function PaginaClientes(){
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
      titulo: 'Livro de Teste',
      autor: 'Autor Genérico',
      categoria: 'Ficção',
      subcategoria: 'Romance',
      capa: 'https://m.media-amazon.com/images/I/81LTEfXYgcL._SL1500_.jpg',
      avaliacao: 4
    };
  
  
    const livros = Array.from({ length: 12 }, (_, i) => ({
      ...livroBase,
      titulo: `Livro ${i + 1}`
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
            
        </Layout>

    );
}