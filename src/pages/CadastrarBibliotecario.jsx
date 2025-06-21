import { useState } from 'react';
import Logo from '../components/Logo';
import Usuario from '../img/usuario.png'; 
import Botao from '../components/Botao';

export default function CadastrarBibliotecario() {
  const [imagemPreview, setImagemPreview] = useState(null);
  const [nome, setNome] = useState('');
  const [registro, setRegistro] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagemPreview(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (senha !== confirmarSenha) {
      setMensagem("As senhas não são iguais.");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("email", email);
      formData.append("telefone", telefone);
      formData.append("data_de_nascimento", dataNascimento);
      formData.append("senha", senha);
      formData.append("registro", registro);
      formData.append("tipo", "bibliotecario");
  
      const fileInput = document.getElementById("imagem");
      if (fileInput && fileInput.files[0]) {
        formData.append("imagem", fileInput.files[0]);
      }
  
      const resposta = await fetch("http://localhost:3000/cadastrarLocatario", {
        method: "POST",
        body: formData,
      });
  
      if (!resposta.ok) {
        throw new Error("Erro ao cadastrar.");
      }
  
      setMensagem("Cadastrado com sucesso!");
  
      setNome('');
      setEmail('');
      setDataNascimento('');
      setTelefone('');
      setSenha('');
      setConfirmarSenha('');
      setImagemPreview(null);
      
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao cadastrar.");
  }
}

  return (
    <div className="w-screen min-h-screen bg-bodyblue m-0 p-0 relative">
      <header className="w-full flex flex-col items-center bg-headerblue relative p-6 h-130">
        <Logo />
        <h2 className="text-white text-2xl mt-4">Cadastro</h2>
      </header>

      <div className="flex flex-col items-center justify-center">
        <form 
          className="fixed mb-80 bg-white p-6 rounded-lg shadow-md w-[600px] flex flex-row gap-6 justify-between items-start"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center">
            <label htmlFor="imagem" className="cursor-pointer">
              <div className="w-45 h-45 rounded-full overflow-hidden flex items-center justify-center">
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
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  required
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
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
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
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
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
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-center mt-4">
              <Botao type="submit">
                Cadastrar
              </Botao>
            </div>
            {mensagem && (
              <p className="text-center mt-2 text-sm text-red-600">{mensagem}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}