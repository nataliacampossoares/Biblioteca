import { NavLink } from "react-router-dom";

export default function Menu() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  const getEstilo = (props) => {
    const base = `
      flex items-center justify-center gap-4 px-3 py-3 w-full h-18 text-md font-bold
      text-white border-b border-white/30
      transition-all duration-300
      hover:bg-zinc-900
    `;

    const ativo = `bg-zinc-900`;

    return props.isActive ? base + ativo : base;
  };

  return (
    <aside className="flex flex-col items-center bg-[#849bff] w-72 h-full py-8">
      <header className="flex flex-col items-center gap-3">
        <img
          className="rounded-full size-32"
          src={
            usuario?.imagem
              ? `http://localhost:3000/imagensBibliotecario/${usuario.imagem}`
              : "/src/img/bibliotecario.jpeg"
          }
          alt="Foto do Bibliotecário"
        />
        <span className="font-bold text-white">
          {usuario?.nome || "Sem nome"}
        </span>
        <span className="text-white text-lg font-bold">Bibliotecário</span>
      </header>

      <nav className="flex flex-col gap-2 w-full mt-10">
        <NavLink
          to="/clientes"
          className={(props) => getEstilo(props) + " border-t border-white/30"}
        >
          Clientes
        </NavLink>
        <NavLink to="/livrosbibliotecario" className={getEstilo}>
          Livros
        </NavLink>
        <NavLink to="/emprestimos" className={getEstilo}>
          Empréstimos
        </NavLink>
        <NavLink to="/devolucaolivro" className={getEstilo}>
          Devolução
        </NavLink>
      </nav>
    </aside>
  );
}
