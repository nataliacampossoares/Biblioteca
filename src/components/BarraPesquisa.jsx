import { IconSearch } from "@tabler/icons-react";

export function BarraPesquisa({ filtro, setFiltro }) {

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <IconSearch className="absolute left-3 top-1/2 mt-2.5 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Pesquisar..."
        onChange={(e) => setFiltro(e.target.value)}
        className="w-full text-black pl-10 pr-3 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#849bff]"
      />
    </div>
  );
}
