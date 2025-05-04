import Botao from "../components/Botao";
import Layout from "../components/Layout";

export default function Emprestimos() {
  return (
    <Layout>
      <div className="bg-[#efefef] flex flex-col justify-center mt-6 mb-6 mr-2 p-6 w-full gap-3 rounded-xl">
        <div className="flex w-full justify-center">
          <h2 className="font-bold text-[#485977] text-2xl">Empréstimo</h2>
        </div>
        <form className="flex flex-col gap-5">
          <label className="flex flex-col text-gray-700 font-semibold">
            ISBN
            <input
              type="text"
              className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
              placeholder="Digite o nome ISBN do livro"
            />
          </label>
          <label className="flex flex-col text-gray-700 font-semibold">
            Registro Acadêmico (Aluno/Professor)
            <input
              type="text"
              className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
              placeholder="Digite o RA"
            />
          </label>
          <label className="flex flex-col text-gray-700 font-semibold">
            E-mail (Bibliotecário)
            <input
              type="email"
              className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
              placeholder="Digite o e-mail"
            />
          </label>
        </form>
        <Botao>Registrar</Botao>
      </div>
    </Layout>
  );
}
