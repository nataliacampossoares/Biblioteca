export default function LoginBibliotecário() {
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
        <form className="bg-white p-8 rounded-lg shadow-md w-96 h-120 fixed mb-100 flex flex-col justify-between">
          <h2 className="text-4xl font-quiestral text-center text-gray-500 mb-2 m-4">
            Login
          </h2>

          <div className="flex flex-col gap-2">
            <div>
              <label className="block text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-5 border bg-gray-300 rounded focus:outline-none"
                placeholder="Digite seu email"
              />
            </div>

            <div className="mt-3" >
              <label className="block text-gray-700" htmlFor="senha">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                className=" w-full p-5 border bg-gray-300 rounded focus:outline-none"
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          <div className="flex flex-col items-center mt-5">
            <p className="text-base text-gray-600">Não tem uma conta?</p>
            <a href="/CadastrarBibliotecario" className="text-blue-600 text-base font-bold focus:no-underline active:no-underline">
              Cadastre-se
            </a>

            <button
              type="submit"
              className="flex justify-center w-40 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-4 text-xl font-bold mt-6"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
