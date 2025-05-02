import { NavLink } from "react-router-dom";

export function Menu() {
  const getEstilo = (props) => {
    const base = `
      flex items-center justify-center gap-4 px-3 py-3 w-full h-24 text-md font-bold
      text-white border-b border-white/30
      transition-all duration-300
      hover:bg-zinc-900
    `;
  
    const ativo = `
      bg-zinc-900 
    `;
  
    return props.isActive ? base + ativo : base;
  };

  return (
    <div className="ml-50">
      <aside className=" mt-6 flex flex-col items-center justify-center bg-[#849bff] min-w-72 h-auto rounded-xl py-8">
        <header className="flex flex-col items-center gap-3">
          <img
            className="rounded-full size-32"
            src="/src/img/bibliotecario.jpeg"
            alt="Foto do Bibliotecário"
          />
          <span className="font-bold text-white">natinha123</span>
          <span className="text-white text-lg font-bold">Bibliotecário</span>
        </header>

        <nav className="flex flex-col gap-2 w-full mt-10">
          <NavLink
            to="/clientes"
            className={(props) =>
              getEstilo(props) + " border-t border-white/30"
            }
          >
            Clientes
          </NavLink>
          <NavLink to="/livros" className={getEstilo}>
            Livros
          </NavLink>
          <NavLink to="/emprestimos" className={getEstilo}>
            Empréstimos
          </NavLink>
        </nav>
      </aside>
    </div>
  );
}
