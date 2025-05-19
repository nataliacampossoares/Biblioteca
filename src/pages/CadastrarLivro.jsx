import { useState } from 'react';
import Layout from '../components/Layout';
import Botao from '../components/Botao';
import { BookOpen } from 'lucide-react';

export default function CadastrarLivro() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [subcategoria, setSubcategoria] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [editora, setEditora] = useState('');
  const [edicao, setEdicao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log({
      titulo,
      autor,
      categoria,
      subcategoria,
      quantidade,
      editora,
      edicao
    });
  };

  return (
    <Layout>
      <div className="flex flex-col items-center p-8 w-full">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Cadastrar Novo Livro</h1>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300"
          />
          <input
            type="text"
            placeholder="Autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300"
          />
          <input
            type="text"
            placeholder="Categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300"
          />
          <input
            type="text"
            placeholder="Subcategoria"
            value={subcategoria}
            onChange={(e) => setSubcategoria(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300"
          />
          <input
            type="number"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300"
          />
          <input
            type="text"
            placeholder="Editora"
            value={editora}
            onChange={(e) => setEditora(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300"
          />
          <input
            type="text"
            placeholder="Edição"
            value={edicao}
            onChange={(e) => setEdicao(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300"
          />

          <div className="flex justify-center mt-6">
            <Botao type="submit">Salvar Livro</Botao>
          </div>
        </form>
      </div>
    </Layout>
  );
}
