export function HistoricoCard({
  titulo,
  dataEmprestimo,
  dataDevolucao,
  situacao,
  multa
}) {
  const formatarData = (isoString) => {
    if (!isoString) return "-";
    const dataObj = new Date(isoString);
    return isNaN(dataObj.getTime()) ? "-" : dataObj.toLocaleDateString("pt-BR");
  };

  const formatarHora = (isoString) => {
    if (!isoString) return "-";
    const dataObj = new Date(isoString);
    return isNaN(dataObj.getTime())
      ? "-"
      : dataObj.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  return (
    <div className="bg-white rounded-xl p-6 w-full shadow-md">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <p className="font-bold text-[#323131]">Título</p>
          <p className="text-[#323131]">{titulo}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-[#323131]">Data Empréstimo</p>
          <p className="text-[#323131]">{formatarData(dataEmprestimo)}</p>
          <p className="text-[#323131]">{formatarHora(dataEmprestimo)}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col">
          <p className="font-bold text-[#323131]">Data Devolução</p>
          {dataDevolucao ? (
            <>
              <p className="text-[#323131]">
                {formatarData(dataDevolucao)}
              </p>
              <p className="text-[#323131]">
                {formatarHora(dataDevolucao)}
              </p>
            </>
          ) : (
            <p className="text-red-600 font-semibold">Livro ainda em posse</p>
          )}
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-[#323131]">Situação</p>
          <p className="text-[#323131]">{situacao}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-[#323131]">Multa</p>
          <p className="text-[#323131]">R${multa},00</p>
        </div>
      </div>
    </div>
  );
}
