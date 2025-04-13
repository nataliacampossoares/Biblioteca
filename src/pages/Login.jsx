export default function Login() {
  return (
    <div className="w-screen min-h-screen bg-blue-300 m-0 p-0 relative">
      <header className="w-full flex items-start bg-blue-800 relative p-6 h-100">
        <p className="text-white text-5xl font-bold ml-10 mt-5">BibliON</p>
        <img
          src="/src/img/testanto.png"
          alt="Logo"
          className="w-32 mt-2 ml-15 absolute"
        />
      </header>

      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10">
        <form className="bg-white p-8 rounded-2xl shadow-md w-100 h-120 flex flex-col gap-4 mt-20">
          <h2 className="text-3xl  text-center text-blue-700 mb-2">Login</h2>

          <label className="flex flex-col text-gray-700 font-semibold">
            E-mail
            <input
              type="text"
              className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
              placeholder="Digite seu e-mail"
            />
          </label>

          <label className="flex flex-col text-gray-700 font-semibold">
            Senha
            <input
              type="number"
              className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
              placeholder="Digite sua senha"
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

          <button className="bg-blue-500" >oi</button>
        </form>
      </div>

    </div>
  );
}
