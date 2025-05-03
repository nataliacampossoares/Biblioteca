import { useState } from 'react';
import Menu from '../components/Menu';

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
    { titulo: '1984', autor: 'George Orwell', categoria: 'Ficção', subcategoria: 'Romance' },
    { titulo: 'Steve Jobs', autor: 'Walter Isaacson', categoria: 'Não Ficção', subcategoria: 'Biografia' },
    { titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', categoria: 'Ficção', subcategoria: 'Fantasia' }
  ];

  const livrosFiltrados = livros.filter(livro =>
    livro.titulo.toLowerCase().includes(busca.toLowerCase()) &&
    (categoria === '' || livro.categoria === categoria) &&
    (subcategoria === '' || livro.subcategoria === subcategoria)
  );

  return (
    <div className="flex min-h-screen">
      <Menu />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Gerenciar Livros</h1>

        {/* Barra de busca */}
        <input
          type="text"
          placeholder="Buscar livro..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        {/* Filtros */}
        <div className="flex gap-4 mb-6">
          <select
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
              setSubcategoria('');
            }}
            className="border p-2 rounded"
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={subcategoria}
            onChange={(e) => setSubcategoria(e.target.value)}
            disabled={!categoria}
            className="border p-2 rounded"
          >
            <option value="">Selecione uma subcategoria</option>
            {categoria &&
              subcategorias[categoria].map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
          </select>
        </div>

        {/* Tabela de livros */}
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Título</th>
              <th className="p-2 border">Autor</th>
              <th className="p-2 border">Categoria</th>
              <th className="p-2 border">Subcategoria</th>
              <th className="p-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {livrosFiltrados.map((livro, index) => (
              <tr key={index}>
                <td className="p-2 border">{livro.titulo}</td>
                <td className="p-2 border">{livro.autor}</td>
                <td className="p-2 border">{livro.categoria}</td>
                <td className="p-2 border">{livro.subcategoria}</td>
                <td className="p-2 border space-x-2">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {livrosFiltrados.length === 0 && (
          <p className="text-gray-500 mt-4">Nenhum livro encontrado.</p>
        )}
      </div>
    </div>
  );
}
