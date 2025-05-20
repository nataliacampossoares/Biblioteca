import { BarraPesquisa } from "../components/BarraPesquisa";
import Menu from "../components/Menu";
import { HistoricoCard } from "../components/HistoricoCard";
import Layout from "../components/Layout";

export default function Historico() {
  return (
    <Layout className="flex justify-center">
      <div className="bg-[#d9d9d9] flex flex-col items-center p-5 w-fit h-full rounded-xl gap-6 overflow-auto">
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="font-extrabold text-[#737373] text-3xl">Histórico</p>
          <p className="font-extrabold text-[#737373] text-xl">
            Natália Campos Soares
          </p>
          <BarraPesquisa className="bg-[#e9e5e5] w-fit" />
        </div>
        <div className="flex flex-col gap-6 w-full max-w-md">
          <HistoricoCard
            titulo="As Meninas"
            dataEmprestimo="28/03/2025"
            horaEmprestimo="08:35"
            dataDevolucao="-"
            horaDevolucao=""
            situacao="10 dias de atraso"
            multa="R$10,00 - pendente"
          />
          <HistoricoCard
            titulo="A volta ao Mundo em 80 dias"
            dataEmprestimo="05/02/2025"
            horaEmprestimo="08:35"
            dataDevolucao="13/02/2025"
            horaDevolucao="10:43"
            situacao="Devolução sem atraso"
            multa="R$0,00"
          />
        </div>
      </div>
    </Layout>
  );
}
