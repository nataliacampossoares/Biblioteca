import Botao from "../components/Botao";
import Layout from "../components/Layout";

export default function DevolucaoLivro() {
    return (
        <Layout className="flex justify-center">
          <div className="bg-[#efefef] h-100 flex flex-col justify-center mt-20 mb-6 mr-2 p-6 w-fit gap-3 rounded-xl">
            <div className="flex w-full justify-center">
              <h2 className="font-bold text-[#485977] text-2xl">Devolver Livro</h2>
            </div>
            <form className="flex flex-col gap-5 pr-10 pl-10">
              <label className="flex flex-col text-gray-700 font-semibold">
                ISBN
                <input
                  type="text"
                  className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
                  placeholder="Digite o nome ISBN do livro"
                />
              </label>
            </form>
            <Botao>Registrar</Botao>
          </div>
        </Layout>
    );
  }
  