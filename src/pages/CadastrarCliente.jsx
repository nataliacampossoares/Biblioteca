import Logo from "../components/Logo";
import { Menu } from "../components/Menu";

export default function CadastrarCliente() {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <div className="flex flex-row h-full bg-[linear-gradient(to_bottom,_#485977_70%,_#5271ff_30%)] w-full">
        <Menu />
        <form className="bg-white p-8 rounded-2xl shadow-md w-full h-full max-w-sm flex flex-col gap-4 mt-20">
          <h2 className="text-3xl text-center text-blue-700 mb-2">
            Cadastrar Cliente
          </h2>

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
              type="password" // Alterado para "password" por questões de segurança
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

          <button className="bg-blue-950 text-black px-4 py-2 rounded hover:bg-blue-600">
            Cadastrar
          </button>
        </form>
      </div>

      <div className="flex flex-col items-center justify-center mt-4">
        <p className="text-black font-bold">OLJFENKNJK</p>
      </div>
      <Logo />
    </div>
  );
}
