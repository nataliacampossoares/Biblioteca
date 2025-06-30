import { useEffect, useState } from "react";
import { BarraPesquisa } from "../components/BarraPesquisa";
import { HistoricoCard } from "../components/HistoricoCard";
import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";

export default function Historico() {
  const location = useLocation();
  const [historicoEmprestimos, setHistoricoEmprestimos] = useState([]);

  useEffect(() => {
    if (location.state?.historicoEmprestimos) {
      setHistoricoEmprestimos(location.state.historicoEmprestimos);
    } else {
      const dados = localStorage.getItem("historicoEmprestimos");
      if (dados) {
        setHistoricoEmprestimos(JSON.parse(dados));
      }
    }
  }, [location.state]);

  return (
    <Layout className="flex justify-center">
      <div className="bg-[#d9d9d9] flex flex-col items-center p-5 w-fit h-full rounded-xl gap-6 overflow-auto">
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="font-extrabold text-[#737373] text-3xl">Histórico</p>
          <p className="font-extrabold text-[#737373] text-xl">
            {/* {cliente} */}
          </p>
          <BarraPesquisa className="bg-[#e9e5e5] w-fit" />
        </div>
        <div className="flex flex-col gap-6 w-full max-w-md">
          {historicoEmprestimos.length > 0 ? (
            historicoEmprestimos.map((livro, index) => {
              console.log("Livro do histórico:", livro); 
              return (
                <HistoricoCard
                  key={index}
                  titulo={livro.titulo}
                  dataEmprestimo={livro.data_hora_emprestimo}
                  dataDevolucao={livro.data_hora_devolucao}
                  situacao={livro.situacao}
                  multa={livro.multa}
                />
              );
            })
          ) : (
            <p className="text-[#a6a6a6]">Nenhum histórico disponível.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
