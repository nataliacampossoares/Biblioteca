import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";

export function BarraPesquisa({ onSearch }) {
  const [busca, setBusca] = useState("");

  function handleChange(e) {
    const valor = e.target.value;
    setBusca(valor);
    onSearch(valor);
  }

  return (
    <div className="relative w-full">
        <input type="text" />
      <IconSearch className="absolute left-3 top-1/2 mt-3 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Pesquisar..."
        value={busca}
        onChange={handleChange}
        className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#849bff]"
      />
    </div>
  );
}
