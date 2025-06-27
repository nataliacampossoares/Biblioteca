import { useState } from "react";
import Botao from "../components/Botao";
import Layout from "../components/Layout";

export default function Emprestimos() {

  const [isbn, setIsbn] = useState("");
  const [ra, setRa] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const buscarLivroPorISBN = async (isbn) => {
    const res = await fetch(`http://localhost:3000/buscarLivroPorISBN/${isbn}`);
    if (!res.ok) throw new Error("Livro não encontrado");
    const livro = await res.json();
    return livro.id; 
  };

  const buscarLocatario = async (identificador) => {
    const res = await fetch(`http://localhost:3000/buscarLocatario/${identificador}`);
    if (!res.ok) throw new Error("Locatário não encontrado");
    const locatario = await res.json();
    return locatario.id; 
  };

  const registrarEmprestimo = async () => {
    setMensagem("");
    try {
      if (!isbn) throw new Error("Informe o ISBN do livro");
      if (!ra && !email) throw new Error("Informe RA ou e-mail");

      const idLivro = await buscarLivroPorISBN(isbn);
      const idLocatario = await buscarLocatario(ra || email);

      const res = await fetch("http://localhost:3000/cadastrarEmprestimo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_locatario: idLocatario, id_livro: idLivro }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Erro ao registrar empréstimo");
      }

      setMensagem("✅ Empréstimo registrado com sucesso!");
      setIsbn("");
      setRa("");
      setEmail("");
    } catch (error) {
      setMensagem(`❌ ${error.message}`);
    }
  };


  return (
    <Layout className="flex justify-center">
      <div className="bg-[#efefef] flex flex-col justify-center mt-6 mb-6 mr-2 p-6 w-fit gap-3 rounded-xl">
        <div className="flex w-full justify-center">
          <h2 className="font-bold text-[#485977] text-2xl">Empréstimo</h2>
        </div>
        <form className="flex flex-col gap-5 pr-10 pl-10" onSubmit={(e) => {
            e.preventDefault();
            registrarEmprestimo();
          }}>
          <label className="flex flex-col text-gray-700 font-semibold">
            ISBN
            <input
              type="text"
              className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
              placeholder="Digite o nome ISBN do livro"
              value={isbn}  
              onChange={(e) => setIsbn(e.target.value)}   
            />
          </label>
          <label className="flex flex-col text-gray-700 font-semibold">
            Registro Acadêmico (Aluno/Professor)
            <input
              type="text"
              className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
              placeholder="Digite o RA"
              value={ra}   
              onChange={(e) => setRa(e.target.value)}  
            />
          </label>
          <label className="flex flex-col text-gray-700 font-semibold">
            E-mail (Bibliotecário)
            <input
              type="email"
              className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
              placeholder="Digite o e-mail"
              value={email}   
              onChange={(e) => setEmail(e.target.value)}  
            />
          </label>
        <Botao>Registrar</Botao>
        </form>
        {mensagem && (
          <div className="mt-4 text-center text-gray-700">
            {mensagem}
          </div>
        )}
      </div>
    </Layout>
  );
}
