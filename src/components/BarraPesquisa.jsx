import { IconSearch } from "@tabler/icons-react";

export function BarraPesquisa({ className = "" }) {

  return (
    <div className="relative w-full">
      <IconSearch className="absolute left-3 top-1/2 mt-2.5 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Pesquisar..."
        className={`w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#849bff] ${className}`}
      />
    </div>
  );
}
