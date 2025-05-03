export function HistoricoCard({ titulo, dataEmprestimo, dataDevolucao, situacao, multa, horaDevolucao, horaEmprestimo }) {
    return (
      <div className="bg-white rounded-xl p-6 w-full shadow-md">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <p className="font-bold text-[#323131]">Título</p>
            <p className="text-[#323131]">{titulo}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-[#323131]">Data Empréstimo</p>
            <p className="text-[#323131]">{dataEmprestimo}</p>
            <p className="text-[#323131]">{horaEmprestimo}</p>
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col">
            <p className="font-bold text-[#323131]">Data Devolução</p>
            <p className="text-[#323131]">{dataDevolucao}</p>
            <p className="text-[#323131]">{horaDevolucao}</p>

          </div>
          <div className="flex flex-col">
            <p className="font-bold text-[#323131]">Situação</p>
            <p className="text-[#323131]">{situacao}</p>
          </div>
        </div>
  
        <div className="mt-4">
          <p className="font-bold text-[#323131]">Multa</p>
          <p className="text-[#323131]">{multa}</p>
        </div>
      </div>
    );
  }
  