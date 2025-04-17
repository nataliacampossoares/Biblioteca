export default function Cadastro() {
    return (
      <div className="w-screen min-h-screen bg-blue-300 m-0 p-0 relative">
        <header className="w-full flex items-start bg-blue-800 relative p-6 h-100">
          <p className="text-white text-5xl font-bold ml-10 mt-5">BibliON</p>
          <img
            src="/src/img/logo.png"
            alt="Logo"
            className="w-32 mt-2 ml-15 absolute"
          />
        </header>
  
  
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-md px-4">
          <form className="bg-white p-8 rounded-2xl shadow-md w-full flex flex-col gap-4 ">
            <h2 className="text-3xl text-center text-blue-700 mb-2">Cadastro</h2>
  
            <label className="flex flex-col text-gray-700 font-semibold">
              Nome
              <input
                type="text"
                className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
                placeholder="Digite seu nome"
              />
            </label>
  
            <label className="flex flex-col text-gray-700 font-semibold">
              E-mail
              <input
                type="email"
                className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
                placeholder="Digite seu e-mail"
              />
            </label>
  
            <label className="flex-1 flex flex-col bg-gray-300 text-gray-700 font-semibold">
                Data de Nascimento
                <input
                type="date"
                className="border border-gray-300 bg-gray-300 rounded-md"
                />
            </label>
  
            <label className="flex-1 flex flex-col bg-gray-300 text-gray-700 font-semibold">
                Telefone
                <input
                type="tel"
                className="border border-gray-300 bg-gray-300 rounded-md"
                placeholder="(44) XXXX-XXXX "
                />
            </label>
            
  
            <label className="flex flex-col text-gray-700 font-semibold">
              Senha
              <input
                type="password"
                className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
                placeholder="Digite sua senha"
              />
            </label>
  
            <label className="flex flex-col text-gray-700 font-semibold">
              Confirmar Senha
              <input
                type="password"
                className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
                placeholder="Confirme sua senha"
              />
            </label>
  
            <div className="flex flex-col items-center">
              <p className="text-base text-center text-gray-600">
                Não tem uma conta?{" "}
              </p>
              <a href="#" className="text-blue-700 font-bold hover:underline">
                Cadastre-se
              </a>
            </div>
  
            <button className="bg-[#023067] text-white px-4 py-2 rounded">
              Enviar
            </button>
          </form>
        </div>
      </div>
    );
  }
  