import { useState } from "react";

export function HistoricoCard({
  titulo,
  dataEmprestimo,
  dataDevolucao,
  situacao,
  multa,
  idLocatario,
  idLivro,
}) {

  const [multaAtual, setMultaAtual] = useState(multa);


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

  async function quitarMulta() {
    try {
      const resposta = await fetch("http://localhost:3000/quitarMulta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_locatario: idLocatario,
          id_livro: idLivro,
        }),
      });

      const dados = await resposta.json();
      if (resposta.ok) {
        alert("Multa quitada com sucesso!");
        setMultaAtual(0)
      } else {
        alert(dados.mensagem || "Erro ao quitar multa.");
      }
    } catch (erro) {
      console.error("Erro ao conectar com o servidor:", erro);
    }
  }
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
              <p className="text-[#323131]">{formatarData(dataDevolucao)}</p>
              <p className="text-[#323131]">{formatarHora(dataDevolucao)}</p>
            </>
          ) : (
            <p className="text-red-600 font-semibold">Livro ainda em posse</p>
          )}
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-[#323131]">Situação</p>
          <p className="text-[#323131]">{situacao}</p>
        </div>
        <div className="flex gap-3 items-end">
          <div className="flex flex-col">
            <p className="font-bold text-[#323131]">Multa</p>
            <p className="text-[#323131]">R${multaAtual},00</p>
          </div>
          <button
            className="bg-red-600 text-white text-xs px-2 py-1 rounded h-fit"
            onClick={quitarMulta}
          >
            Quitar Multa
          </button>
        </div>
      </div>
    </div>
  );
}
