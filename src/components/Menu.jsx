import {} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

export function Menu() {
  const getEstilo = (props) => {
    let estilo = `
        flex items-center gap-4
        px-3 py-3 w-full
        !text-white h-24
        hover:bg-gradient-to-r hover:from-[#004aad] hover:to-[#cb6ce6] text-xl
         transition-all duration-300
    border-b border-white/30`;
    let ativo = "border-r-4 border-solid border-slate-800 ";

    let final = props.isActive ? estilo + ativo : estilo;

    return final;
  };

  return (
    <aside className="flex flex-col gap-5 bg-[#849bff] min-w-72 h-screen">
      <header
        className={`
            flex justify-center items-center gap-2
            text-zinc-50 
            px-1 py-5 h-16          
            text-2xl font-black
          `}
      >
        <div className="flex flex-col gap-3 pt-52">
          <img
            className="rounded-full size-32"
            src="/src/img/bibliotecario.jpeg"
            alt=""
          />
          <span className="font-bold">natinha123</span>
          <span>Bibliotecário</span>
        </div>
      </header>

      <nav className="flex flex-col justify-start items-start pt-56">
        <NavLink
          to="/clientes"
          className={`${getEstilo} border-t border-white/30`}
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
  );
}
