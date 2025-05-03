import { BarraPesquisa } from "../components/BarraPesquisa";
import { Menu } from "../components/Menu";
import { HistoricoCard } from "../components/HistoricoCard";

export default function Historico() {
  return (
    <div className="flex h-screen w-screen bg-[linear-gradient(to_bottom,_#485977_70%,_#5271ff_30%)]">
      <Menu />
      <div className="flex flex-col justify-between items-center bg-white rounded-r-xl mt-6 mb-6 mr-24 p-6 w-full max-h-[calc(100vh-3rem)] overflow-hidden">
        <div className="bg-[#d9d9d9] flex flex-col items-center p-5 w-fit h-full rounded-xl gap-6 overflow-auto">
          <div className="flex flex-col gap-2 justify-center items-center">
            <p className="font-extrabold text-[#737373] text-3xl">Histórico</p>
            <p className="font-extrabold text-[#737373] text-xl">
              Natália Campos Soares
            </p>
            <BarraPesquisa className="bg-[#e9e5e5]"/>
          </div>
          <div className="flex flex-col gap-6 w-full max-w-md">
            <HistoricoCard
              titulo="As Meninas"
              dataEmprestimo="28/03/2025 15:54"
              dataDevolucao="-"
              situacao="10 dias de atraso"
              multa="R$10,00 - pendente"
            />
            <HistoricoCard
              titulo="A volta ao Mundo em 80 dias"
              dataEmprestimo="05/02/2025 08:35"
              dataDevolucao="13/02/2025 10:43"
              situacao="Devolução sem atraso"
              multa="R$0,00"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
