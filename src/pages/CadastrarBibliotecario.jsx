import { useState } from 'react';
import Logo from '../components/Logo';
import Usuario from '../img/usuario.png'; // Certifique-se de que a imagem está em src/img

export default function CadastrarBibliotecario() {
  const [imagemPreview, setImagemPreview] = useState(null);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagemPreview(imageUrl);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-bodyblue m-0 p-0 relative">
      <header className="w-full flex flex-col items-center bg-headerblue relative p-6 h-130">
        <Logo />
        <h2 className="text-white text-2xl mt-4">Cadastro</h2>
      </header>

      <div className="flex flex-col items-center justify-center ml-120">
        <form className="fixed mb-100 bg-white p-6 rounded-lg shadow-md w-[800px] flex flex-row gap-6 justify-between items-start">
          <div className="flex flex-col items-center">
            <label htmlFor="imagem" className="cursor-pointer">
              <div className="w-40 h-40 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src={imagemPreview || Usuario}
                  alt="Imagem do usuário"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 text-center text-sm text-gray-600">
                Adicionar imagem
              </p>
            </label>
            <input
              type="file"
              id="imagem"
              accept="image/*"
              className="hidden"
              onChange={handleImagemChange}
            />
          </div>

          <div className="flex flex-col gap-3 flex-1 text-sm">
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="nome">
                Nome Completo
              </label>
              <input
                type="text"
                id="nome"
                className="w-full p-3 border bg-gray-300 rounded focus:outline-none"
                placeholder="Digite o nome completo"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1" htmlFor="registro">
                Registro Profissional
              </label>
              <input
                type="text"
                id="registro"
                className="w-full p-3 border bg-gray-300 rounded focus:outline-none"
                placeholder="Número de registro"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border bg-gray-300 rounded focus:outline-none"
                placeholder="Digite o email"
              />
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-gray-700 mb-1" htmlFor="data">
                  Nascimento
                </label>
                <input
                  type="date"
                  id="data"
                  className="w-full p-2 border bg-gray-300 rounded focus:outline-none"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 mb-1" htmlFor="telefone">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  className="w-full p-2 border bg-gray-300 rounded focus:outline-none"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1" htmlFor="senha">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                className="w-full p-3 border bg-gray-300 rounded focus:outline-none"
                placeholder="Digite a senha"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 mb-1"
                htmlFor="confirmarSenha"
              >
                Confirmar Senha
              </label>
              <input
                type="password"
                id="confirmarSenha"
                className="w-full p-3 border bg-gray-300 rounded focus:outline-none"
                placeholder="Confirme a senha"
              />
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="w-32 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-base font-bold"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
