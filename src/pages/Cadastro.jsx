export default function Login() {
  return (
    <div className="w-screen min-h-screen bg-bodyblue m-0 p-0 relative">
      <header className="w-full flex items-start bg-headerblue relative p-6 h-130">
        <p className="text-white text-5xl font-nunito ml-10 mt-5">BibliON</p>
        <img
          src="/src/img/logo.png"
          alt="Logo"
          className="w-32 mt-17 ml-[10px] absolute"
        />
      </header>
 
      <div className="flex flex-col items-center justify-center">
          <form className="bg-white p-6 rounded-lg shadow-md w-96 h-130 fixed mb-100 flex flex-col justify-between">
            <h2 className="text-3xl font-quiestral text-center text-gray-500 mb-2">
              Cadastro
            </h2>

            <div className="flex flex-col gap-2 text-sm">
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="nome">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  className="w-full p-3 border bg-gray-300 rounded focus:outline-none"
                  placeholder="Digite seu nome"
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
                  placeholder="Digite seu email"
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
                  placeholder="Digite sua senha"
                />
              </div>

          
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="confirmarSenha">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmarSenha"
                  className="w-full p-3 border bg-gray-300 rounded focus:outline-none"
                  placeholder="Confirme sua senha"
                />
              </div>

            </div>

            <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-32 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-base font-bold"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div> 
  );
}
